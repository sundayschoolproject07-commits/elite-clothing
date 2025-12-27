
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Search, ExternalLink, Sparkles, Loader2, Globe } from 'lucide-react';

interface VisualSourcingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisualSourcingModal: React.FC<VisualSourcingModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductImages = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResults([]);
    setDescription('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Find high-resolution product images and luxury design references for: ${query}. 
                  Provide a brief stylistic analysis of these pieces in the context of billionaire fashion.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || '';
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      setDescription(text);
      setResults(chunks);
    } catch (error) {
      console.error("AI Image Sourcing Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-brand-onyx/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl rounded-sm">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <div className="flex items-center space-x-2 text-brand-crimson mb-1">
              <Sparkles size={16} />
              <span className="text-[10px] uppercase font-bold tracking-[0.3em]">AI Visual Studio</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Visual Discovery & Sourcing</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-8 bg-white border-b border-slate-100">
          <div className="flex space-x-4">
            <div className="relative flex-grow">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchProductImages()}
                placeholder="Describe a garment or style... (e.g. Italian silk tuxedo in midnight navy)"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 outline-none focus:border-brand-onyx text-sm font-medium transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
            <button 
              onClick={fetchProductImages}
              disabled={isLoading}
              className="bg-brand-onyx text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-crimson transition-all disabled:opacity-50 flex items-center space-x-2"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <span>Source Assets</span>}
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-grow overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 space-y-4">
              <Loader2 size={48} className="animate-spin" />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Scanning Global Fashion Archives...</p>
            </div>
          ) : results.length > 0 ? (
            <>
              {description && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Atelier Analysis</h3>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {description}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Found Visual Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((chunk, idx) => (
                    chunk.web && (
                      <a 
                        key={idx} 
                        href={chunk.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-5 border border-slate-200 hover:border-brand-onyx hover:bg-slate-50 transition-all group flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-slate-400">
                            <Globe size={14} />
                            <span className="text-[9px] uppercase font-bold tracking-widest truncate">{new URL(chunk.web.uri).hostname}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-onyx transition-colors line-clamp-1">{chunk.web.title || "Luxury Sourcing Link"}</h4>
                        </div>
                        <div className="mt-4 flex items-center text-[10px] font-bold uppercase text-brand-crimson tracking-widest">
                          <span>Open Archive</span>
                          <ExternalLink size={12} className="ml-2" />
                        </div>
                      </a>
                    )
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-300">
              <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                <Search size={40} strokeWidth={1} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest">Search for billionaire inspiration to fetch live sources.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 text-center">
          <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Powered by Zone J Intelligence & Google Search Grounding</p>
        </div>
      </div>
    </div>
  );
};

export default VisualSourcingModal;
