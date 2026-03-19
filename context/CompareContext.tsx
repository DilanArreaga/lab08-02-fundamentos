import React, { createContext, useState, useContext } from 'react';
import { ReactNode } from 'react';
import { toast } from 'sonner';

// Estructura de la propiedad (se ajusta a tu tabla)
export interface Property {
  [x: string]: ReactNode;
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

interface CompareContextType {
  selectedProperties: Property[];
  toggleProperty: (property: Property) => void;
  removeProperty: (id: string) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

  const toggleProperty = (property: Property) => {
    setSelectedProperties((prev) => {
      const isSelected = prev.some((p) => p.id === property.id);
      
      // Si ya está seleccionada, la quitamos
      if (isSelected) {
        toast.info(`${property.title} removida de la comparación`);
        return prev.filter((p) => p.id !== property.id);
      }
      
      // Límite de 3
      if (prev.length >= 3) {
        toast.error('Límite alcanzado', {
          description: 'Solo puedes comparar hasta 3 propiedades a la vez.'
        });
        return prev;
      }
      
      // Agregamos la propiedad
      toast.success(`${property.title} agregada a comparar`);
      return [...prev, property];
    });
  };

  const removeProperty = (id: string) => {
    setSelectedProperties((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <CompareContext.Provider value={{ selectedProperties, toggleProperty, removeProperty }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare debe usarse dentro de un CompareProvider');
  }
  return context;
};