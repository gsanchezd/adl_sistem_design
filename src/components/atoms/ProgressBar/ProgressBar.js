import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';

const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  showPercentage = false,
  label,
  className,
  trackClassName,
  fillClassName,
  animated = false,
  ...props
}) => {
  // Normalizar el valor entre 0 y 100
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const baseTrackClasses = 'w-full bg-secondary rounded-full overflow-hidden';
  const baseFillClasses = 'h-full bg-primary transition-all duration-500 ease-out rounded-full';
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };
  
  const trackClasses = cn(
    baseTrackClasses,
    sizes[size],
    trackClassName
  );
  
  const fillClasses = cn(
    baseFillClasses,
    animated && 'animate-pulse',
    fillClassName
  );
  
  const containerClasses = cn('w-full', className);

  return (
    <div className={containerClasses} {...props}>
      {/* Label superior opcional */}
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-foreground">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-bold text-primary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      {/* Barra de progreso */}
      <div className={trackClasses}>
        <div
          className={fillClasses}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `Progreso: ${Math.round(percentage)}%`}
        />
      </div>
      
      {/* Texto inferior opcional para contexto adicional */}
      {!showPercentage && !label && (
        <div className="sr-only">
          Progreso: {Math.round(percentage)}% completado
        </div>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  size: sizePropType,
  showPercentage: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  trackClassName: PropTypes.string,
  fillClassName: PropTypes.string,
  animated: PropTypes.bool,
};

export default ProgressBar;