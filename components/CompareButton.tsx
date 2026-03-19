import type React from 'react';
import { useCompare } from '../context/CompareContext';
import type { Property } from '../context/CompareContext';
import { Scale, Check } from 'lucide-react';

interface CompareButtonProps {
  property: Property;
}

export const CompareButton: React.FC<CompareButtonProps> = ({ property }) => {
  const { selectedProperties, toggleProperty } = useCompare();

  const isSelected = selectedProperties.some((p) => p.id === property.id);
  const isMaxReached = selectedProperties.length >= 3 && !isSelected;

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Por si el botón está dentro de un Link
        toggleProperty(property);
      }}
      disabled={isMaxReached}
      className={`
        inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
        ${
          isSelected
            ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
            : isMaxReached
            ? 'bg-muted text-muted-foreground cursor-not-allowed'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }
      `}
      title={isMaxReached ? 'Límite de 3 propiedades alcanzado' : 'Comparar propiedad'}
    >
      {isSelected ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          <span>Seleccionada</span>
        </>
      ) : (
        <>
          <Scale className="h-4 w-4" />
          <span>Comparar</span>
        </>
      )}
    </button>
  );
};