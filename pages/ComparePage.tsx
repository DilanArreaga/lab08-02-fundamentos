import type React from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { Trash2, ArrowLeft, Trophy, Scale } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { selectedProperties, removeProperty } = useCompare();

  // ESTADO VACÍO
  if (selectedProperties.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center flex flex-col items-center">
        <div className="bg-muted p-6 rounded-full mb-6">
          <Scale className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">No hay propiedades para comparar</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Explora nuestro catálogo y selecciona hasta 3 propiedades para verlas lado a lado y tomar la mejor decisión.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>
      </div>
    );
  }

  // CÁLCULOS PARA DESTACAR LO MEJOR
  const lowestPrice = Math.min(...selectedProperties.map((p) => p.price));
  const highestArea = Math.max(...selectedProperties.map((p) => p.area));
  const lowestPricePerSqm = Math.min(...selectedProperties.map((p) => p.price / p.area));

  // Función auxiliar para renderizar celdas ganadoras
  const renderCell = (value: React.ReactNode, isBest: boolean) => (
    <td className={`p-4 border-b text-center ${isBest ? 'bg-green-50/50 dark:bg-green-900/10 font-semibold text-green-700 dark:text-green-400' : ''}`}>
      <div className="flex items-center justify-center gap-2">
        {value}
        {isBest && <Trophy className="h-4 w-4 text-yellow-500" />}
      </div>
    </td>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Comparación de Propiedades</h1>
        <Link to="/" className="text-primary hover:underline flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card text-card-foreground shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="p-4 text-left font-semibold text-muted-foreground w-1/4">Criterios</th>
              {selectedProperties.map((property) => (
                <th key={property.id} className="p-4 text-center border-l w-1/4">
                  <div className="flex flex-col items-center gap-3">
                    <span className="font-bold text-lg line-clamp-1">{property.title}</span>
                    <button
                      onClick={() => removeProperty(property.id)}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors flex items-center gap-1 text-xs"
                    >
                      <Trash2 className="h-3 w-3" />
                      Eliminar
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* FILA: Precio (Más bajo es mejor) */}
            <tr className="hover:bg-muted/20 transition-colors">
              <td className="p-4 border-b font-medium text-muted-foreground">Precio</td>
              {selectedProperties.map((p) => renderCell(`$${p.price.toLocaleString()}`, p.price === lowestPrice))}
            </tr>

            {/* FILA: Habitaciones */}
            <tr className="hover:bg-muted/20 transition-colors">
              <td className="p-4 border-b font-medium text-muted-foreground">Dormitorios</td>
              {selectedProperties.map((p) => (
                <td key={p.id} className="p-4 border-b text-center">{p.bedrooms}</td>
              ))}
            </tr>

            {/* FILA: Baños */}
            <tr className="hover:bg-muted/20 transition-colors">
              <td className="p-4 border-b font-medium text-muted-foreground">Baños</td>
              {selectedProperties.map((p) => (
                <td key={p.id} className="p-4 border-b text-center">{p.bathrooms}</td>
              ))}
            </tr>

            {/* FILA: Superficie (Más alto es mejor) */}
            <tr className="hover:bg-muted/20 transition-colors">
              <td className="p-4 border-b font-medium text-muted-foreground">Superficie</td>
              {selectedProperties.map((p) => renderCell(`${p.area} m²`, p.area === highestArea))}
            </tr>

            {/* FILA: Precio por m² (Más bajo es mejor) */}
            <tr className="hover:bg-muted/20 transition-colors">
              <td className="p-4 border-b font-medium text-muted-foreground">Precio por m²</td>
              {selectedProperties.map((p) => {
                const pricePerSqm = p.price / p.area;
                return renderCell(`$${pricePerSqm.toLocaleString(undefined, { maximumFractionDigits: 2 })}/m²`, pricePerSqm === lowestPricePerSqm);
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};