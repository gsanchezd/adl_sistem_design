import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from '../../atoms';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';

const ProgressSection = ({
  title = 'Mi Progreso',
  subtitle,
  currentLabel = 'Curso actual',
  progress = 0,
  maxProgress = 100,
  progressLabel,
  showPercentage = true,
  size = 'md',
  className,
  titleClassName,
  progressBarClassName,
  ...props
}) => {
  // Calcular el texto del progreso
  const getProgressText = () => {
    if (progressLabel) {
      return progressLabel;
    }
    
    if (progress && maxProgress) {
      const completed = Math.round((progress / 100) * maxProgress);
      return `${completed} de ${maxProgress} secciones completadas`;
    }
    
    return `${Math.round(progress)}% completado`;
  };

  const containerClasses = cn(
    'space-y-3',
    className
  );

  const titleClasses = cn(
    'text-xs font-semibold text-muted-foreground uppercase tracking-widest',
    titleClassName
  );

  return (
    <div className={containerClasses} {...props}>
      {/* Título de la sección */}
      <div className={titleClasses}>
        {title}
      </div>
      
      {/* Subtítulo opcional */}
      {subtitle && (
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
      
      {/* Barra de progreso */}
      <div className="space-y-2">
        <ProgressBar
          value={progress}
          max={maxProgress}
          label={currentLabel}
          showPercentage={showPercentage}
          size={size}
          className={progressBarClassName}
        />
        
        {/* Texto descriptivo del progreso */}
        <p className="text-xs text-muted-foreground">
          {getProgressText()}
        </p>
      </div>
    </div>
  );
};

ProgressSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  currentLabel: PropTypes.string,
  progress: PropTypes.number.isRequired,
  maxProgress: PropTypes.number,
  progressLabel: PropTypes.string,
  showPercentage: PropTypes.bool,
  size: sizePropType,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  progressBarClassName: PropTypes.string,
};

export default ProgressSection;