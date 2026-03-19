import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ImageModal({ images, currentIndex, onClose, onNext, onPrev }: ImageModalProps) {
  // Manejo de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 text-white hover:text-gray-300 z-[110]"
        onClick={onClose}
      >
        <X className="h-8 w-8" />
      </button>

      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img 
          src={images[currentIndex]} 
          alt={`Imagen ${currentIndex + 1}`} 
          className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-4 text-white font-medium">
          {currentIndex + 1} de {images.length}
        </div>
      </div>

      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </div>
  );
}