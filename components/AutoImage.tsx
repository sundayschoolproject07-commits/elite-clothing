
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BRAND_PLACEHOLDER } from '../constants';

interface AutoImageProps {
  productId?: string;
  productName?: string;
  category?: string;
  color?: string;
  description?: string;
  src?: string;
  alt?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageCache: Record<string, string> = {};

/**
 * Global state for handling API rate limits and sequential processing.
 */
let globalQuotaExhausted = false;
let quotaResetTimeout: number | null = null;

// Request Queue Logic
const generationQueue: (() => Promise<void>)[] = [];
let isProcessingQueue = false;

const processQueue = async () => {
  if (isProcessingQueue || generationQueue.length === 0) return;
  isProcessingQueue = true;
  
  while (generationQueue.length > 0 && !globalQuotaExhausted) {
    const task = generationQueue.shift();
    if (task) {
      await task();
      // Small cooldown to prevent rapid-fire requests
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }
  
  isProcessingQueue = false;
};

const AutoImage: React.FC<AutoImageProps> = ({
  productId,
  productName,
  category,
  color,
  description,
  src,
  alt = "",
  className = "",
  onLoad,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src || BRAND_PLACEHOLDER);
  const [isGenerating, setIsGenerating] = useState(false);

  const cacheKey = `${productId}-${color || 'default'}`;

  useEffect(() => {
    if (src && src !== BRAND_PLACEHOLDER) {
      setCurrentSrc(src);
      return;
    }

    if (ImageCache[cacheKey]) {
      setCurrentSrc(ImageCache[cacheKey]);
      return;
    }

    try {
      const saved = localStorage.getItem(`zonej_img_${cacheKey}`);
      if (saved) {
        ImageCache[cacheKey] = saved;
        setCurrentSrc(saved);
        return;
      }
    } catch (e) {
      console.warn("LocalStorage access failed", e);
    }

    if (productName && !isGenerating && !globalQuotaExhausted) {
      // Add to queue instead of firing immediately
      generationQueue.push(generateProductImage);
      processQueue();
    } else if (globalQuotaExhausted) {
      setCurrentSrc(BRAND_PLACEHOLDER);
    }
  }, [src, cacheKey, productName]);

  const generateProductImage = async () => {
    if (globalQuotaExhausted) return;
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        High-end luxury fashion e-commerce product photography for "Zone J - The Billionaire Atelier".
        Subject: A ${color || ''} ${productName}.
        Category: ${category || 'Luxury Fashion'}.
        Visual Style: Professional studio lighting, cinematic editorial look, photorealistic, ultra-detailed fabric texture.
        Background: Minimalist, clean neutral stone or soft beige studio background.
        Composition: ${category === 'Suits' ? 'A fit model wearing the suit in a sharp executive pose' : 'Elegant flat lay or mannequin studio shot'}.
        Details: ${description || ''}.
        No text, no watermarks, no logos, no broken elements. 4k resolution.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: {
            aspectRatio: "3:4"
          }
        }
      });

      let generatedUrl = '';
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (generatedUrl) {
        ImageCache[cacheKey] = generatedUrl;
        try {
          localStorage.setItem(`zonej_img_${cacheKey}`, generatedUrl);
        } catch (storageError) {
          console.warn("LocalStorage quota exceeded, image stored in memory only", storageError);
        }
        setCurrentSrc(generatedUrl);
      } else {
        setCurrentSrc(BRAND_PLACEHOLDER);
      }
    } catch (err: any) {
      console.error("Image generation failed:", err);
      
      if (err?.message?.includes("RESOURCE_EXHAUSTED") || err?.status === 429) {
        globalQuotaExhausted = true;
        if (!quotaResetTimeout) {
          quotaResetTimeout = window.setTimeout(() => {
            globalQuotaExhausted = false;
            quotaResetTimeout = null;
            processQueue(); // Retry queue if anything is left
          }, 60000);
        }
      }
      setCurrentSrc(BRAND_PLACEHOLDER);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageError = () => {
    if (currentSrc !== BRAND_PLACEHOLDER && productName && !globalQuotaExhausted) {
      generationQueue.push(generateProductImage);
      processQueue();
    } else {
      setCurrentSrc(BRAND_PLACEHOLDER);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleImageError}
      onLoad={onLoad}
      className={`${className} transition-opacity duration-700 ${isGenerating ? 'opacity-40' : 'opacity-100'}`}
      {...props}
    />
  );
};

export default AutoImage;
