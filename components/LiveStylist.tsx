
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Mic, MicOff, X, MessageSquare, Sparkles } from 'lucide-react';

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const LiveStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const toggleStylist = () => {
    if (isActive) {
      stopSession();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
          },
          systemInstruction: 'You are a world-class luxury fashion consultant for Zone J. You speak with a sophisticated, calm, and authoritative tone. You advise clients on bespoke tailoring, premium fabrics (like 120s wool, mulberry silk), and how to achieve the "Billionaire" look through custom fits. Keep responses concise and ultra-premium.',
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Stylist Connection Error:', e);
            stopSession();
          },
          onclose: () => {
            setIsActive(false);
            setIsConnecting(false);
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start concierge session:', err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    audioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && !isActive && (
        <div className="mb-6 bg-white p-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-brand-gold/20 max-w-xs animate-in fade-in slide-in-from-bottom-8 duration-500">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 flex items-center">
            <Sparkles size={12} className="mr-2" /> Concierge
          </p>
          <h4 className="font-serif text-2xl text-brand-dark mb-4 leading-tight tracking-tighter">Your Private Stylist</h4>
          <p className="text-sm text-brand-slate mb-8 leading-relaxed font-light">Experience the ultimate atelier consultation. Real-time, voice-guided luxury fit analysis.</p>
          <button 
            onClick={startSession}
            disabled={isConnecting}
            className="w-full bg-brand-onyx text-white py-5 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-brand-crimson transition-all duration-700 flex items-center justify-center space-x-3 shadow-xl"
          >
            {isConnecting ? 'Connecting...' : 'Initiate Session'}
          </button>
        </div>
      )}

      {isActive && (
        <div className="mb-6 bg-brand-onyx p-8 rounded-full shadow-[0_0_50px_rgba(201,160,80,0.3)] border border-brand-gold/30 animate-pulse flex items-center space-x-6 pr-10">
          <div className="w-14 h-14 rounded-full bg-brand-crimson flex items-center justify-center text-white shadow-inner">
            <Mic size={24} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.4em] text-brand-gold font-bold">In Dialogue</span>
            <span className="text-white/80 text-xs font-serif">Your stylist is listening...</span>
          </div>
          <button onClick={stopSession} className="text-white/20 hover:text-white transition-colors ml-6">
            <X size={20} />
          </button>
        </div>
      )}

      <button 
        onClick={toggleStylist}
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-3xl transition-all duration-700 ${
          isActive ? 'bg-brand-crimson rotate-90 scale-110 shadow-[0_0_30px_rgba(112,1,27,0.5)]' : 'bg-brand-onyx hover:scale-110 hover:bg-brand-crimson'
        }`}
      >
        {isActive ? <MicOff size={28} className="text-white" /> : <MessageSquare size={28} className="text-white" />}
      </button>
    </div>
  );
};

export default LiveStylist;
