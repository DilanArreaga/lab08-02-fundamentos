import React, { useState } from 'react';
import { ImageModal } from './ImagenModal';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      {/* Imagen Principal Grande (Clickable) */}
      <div 
        className="relative rounded-xl overflow-hidden cursor-pointer group"
        onClick={() => openModal(0)}
      >
        <img
          src={images[0]}
          className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
          alt="Vista principal"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm">Ver todas las fotos</span>
        </div>
      </div>

      {/* Grid de Miniaturas */}
      <div className="grid grid-cols-4 gap-3">
        {images.slice(1, 5).map((img, index) => (
          <div 
            key={index} 
            className="relative h-24 cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openModal(index + 1)}
          >
            <img src={img} className="w-full h-full object-cover hover:opacity-80 transition-opacity" alt="" />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold">
                +{images.length - 5}
              </div>
            )}
          </div>
        ))}
      </div>

      {isOpen && (
        <ImageModal 
          images={images}
          currentIndex={currentIndex}
          onClose={() => setIsOpen(false)}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
}