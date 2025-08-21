import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';

const ColorPalette = ({
  showNames = true,
  showValues = true,
  copyable = true,
  size = 'md',
  className,
  ...props
}) => {
  const [copiedColor, setCopiedColor] = useState(null);

  const colorGroups = {
    'Colores Principales': {
      'Primary': { css: 'hsl(var(--primary))', value: 'hsl(84, 55%, 40%)' },
      'Primary Foreground': { css: 'hsl(var(--primary-foreground))', value: 'hsl(0, 0%, 98%)' },
      'Secondary': { css: 'hsl(var(--secondary))', value: 'hsl(0, 0%, 96.1%)' },
      'Secondary Foreground': { css: 'hsl(var(--secondary-foreground))', value: 'hsl(0, 0%, 9%)' },
    },
    'Colores de Fondo': {
      'Background': { css: 'hsl(var(--background))', value: 'hsl(0, 0%, 100%)' },
      'Foreground': { css: 'hsl(var(--foreground))', value: 'hsl(0, 0%, 3.9%)' },
      'Card': { css: 'hsl(var(--card))', value: 'hsl(0, 0%, 100%)' },
      'Card Foreground': { css: 'hsl(var(--card-foreground))', value: 'hsl(0, 0%, 3.9%)' },
    },
    'Colores de Estado': {
      'Muted': { css: 'hsl(var(--muted))', value: 'hsl(0, 0%, 96.1%)' },
      'Muted Foreground': { css: 'hsl(var(--muted-foreground))', value: 'hsl(0, 0%, 45.1%)' },
      'Accent': { css: 'hsl(var(--accent))', value: 'hsl(0, 0%, 96.1%)' },
      'Accent Foreground': { css: 'hsl(var(--accent-foreground))', value: 'hsl(0, 0%, 9%)' },
      'Destructive': { css: 'hsl(var(--destructive))', value: 'hsl(0, 84.2%, 60.2%)' },
      'Destructive Foreground': { css: 'hsl(var(--destructive-foreground))', value: 'hsl(0, 0%, 98%)' },
    },
    'Colores de Interfaz': {
      'Border': { css: 'hsl(var(--border))', value: 'hsl(0, 0%, 89.8%)' },
      'Input': { css: 'hsl(var(--input))', value: 'hsl(0, 0%, 89.8%)' },
      'Ring': { css: 'hsl(var(--ring))', value: 'hsl(84, 55%, 40%)' },
    },
    'Colores Semánticos': {
      'Success': { css: '#22c55e', value: '#22c55e' },     // Verde más vibrante, complementa el primary
      'Warning': { css: '#f97316', value: '#f97316' },     // Naranja cálido (complementario del verde)
      'Error': { css: '#dc2626', value: '#dc2626' },       // Rojo más profundo y elegante
      'Info': { css: '#0891b2', value: '#0891b2' },        // Cyan/teal que combina con verde
    },
    'Colores Extendidos': {
      'Purple': { css: '#9333ea', value: '#9333ea' },      // Púrpura para badges especiales
      'Indigo': { css: '#4f46e5', value: '#4f46e5' },      // Índigo para enlaces y acciones secundarias
      'Pink': { css: '#ec4899', value: '#ec4899' },        // Rosa para elementos de comunidad
      'Amber': { css: '#f59e0b', value: '#f59e0b' },       // Ámbar para highlights
    }
  };

  const sizes = {
    sm: {
      swatch: 'h-8 w-8',
      text: 'text-xs',
      spacing: 'gap-2'
    },
    md: {
      swatch: 'h-12 w-12',
      text: 'text-sm',
      spacing: 'gap-3'
    },
    lg: {
      swatch: 'h-16 w-16',
      text: 'text-base',
      spacing: 'gap-4'
    }
  };

  const copyToClipboard = async (colorValue, colorName) => {
    if (!copyable) return;
    
    try {
      await navigator.clipboard.writeText(colorValue);
      setCopiedColor(colorName);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const ColorSwatch = ({ name, colorData, groupName }) => {
    const value = typeof colorData === 'string' ? colorData : colorData.value;
    const displayValue = typeof colorData === 'string' ? colorData : colorData.value;
    const cssValue = typeof colorData === 'string' ? colorData : colorData.css;
    const isVariableColor = cssValue.startsWith('hsl(var(--');
    const isCopied = copiedColor === `${groupName}-${name}`;
    
    return (
      <div 
        className={cn(
          'flex flex-col items-center',
          sizes[size].spacing,
          copyable && 'cursor-pointer hover:opacity-80 transition-opacity'
        )}
        onClick={() => copyToClipboard(displayValue, `${groupName}-${name}`)}
        title={copyable ? `Click to copy ${displayValue}` : undefined}
      >
        <div 
          className={cn(
            'rounded-lg border border-border shadow-sm relative overflow-hidden',
            sizes[size].swatch,
            copyable && 'hover:scale-105 transition-transform'
          )}
          style={{ backgroundColor: cssValue }}
        >
          {isCopied && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <span className="text-white text-xs font-medium">✓</span>
            </div>
          )}
          
          {/* Pattern for transparent/variable colors */}
          {isVariableColor && (
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-conic-gradient(
                  #000 0% 25%, 
                  transparent 0% 50%
                ) 50% / 8px 8px`
              }}
            />
          )}
        </div>
        
        {showNames && (
          <div className="text-center space-y-1">
            <p className={cn('font-medium text-foreground', sizes[size].text)}>
              {name}
            </p>
            {showValues && (
              <p className={cn('text-muted-foreground font-mono', sizes[size].text)}>
                {displayValue.length > 20 ? `${displayValue.substring(0, 20)}...` : displayValue}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('w-full space-y-8', className)} {...props}>
      {Object.entries(colorGroups).map(([groupName, colors]) => (
        <div key={groupName} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            {groupName}
          </h3>
          
          <div className={cn(
            'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
            sizes[size].spacing
          )}>
            {Object.entries(colors).map(([colorName, colorData]) => (
              <ColorSwatch
                key={colorName}
                name={colorName}
                colorData={colorData}
                groupName={groupName}
              />
            ))}
          </div>
        </div>
      ))}
      
      {copyable && (
        <div className="text-center text-sm text-muted-foreground">
          💡 Haz click en cualquier color para copiarlo al portapapeles
        </div>
      )}
    </div>
  );
};

ColorPalette.propTypes = {
  showNames: PropTypes.bool,
  showValues: PropTypes.bool,
  copyable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default ColorPalette;