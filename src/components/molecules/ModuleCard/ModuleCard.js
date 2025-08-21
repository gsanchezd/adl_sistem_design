import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge, Icon } from '../../atoms';
import { cn } from '../../../utils/cn';
import { modulePropType, statusPropType } from '../../../utils/propTypes';

const ModuleCard = ({
  title,
  description,
  status = 'pending',
  progress,
  type = 'self-learning',
  icon,
  number,
  active = false,
  disabled = false,
  actionLabel,
  onAction,
  onClick,
  className,
  module,
  types = [],
  links = {},
  ...props
}) => {
  // Usar props del módulo o props individuales
  const displayTitle = title || module?.title || 'Módulo sin título';
  const displayDescription = description || module?.description;
  const displayStatus = status || module?.status || 'pending';
  const displayProgress = progress || module?.progress;
  const displayType = type || module?.type || 'self-learning';
  const displayIcon = icon || module?.icon;
  const displayNumber = number || module?.number;

  // Iconos por defecto según el tipo
  const getDefaultIcon = () => {
    if (displayIcon) return displayIcon;
    
    switch (displayStatus) {
      case 'completed':
        return 'check';
      case 'in-progress':
        return 'clock';
      case 'blocked':
        return 'close';
      default:
        return displayType === 'tutoring' ? 'book' : 'document';
    }
  };

  // Estilos según el estado
  const getCardStyles = () => {
    if (active) {
      return 'border-2 border-primary/50 bg-primary/5';
    }
    if (disabled) {
      return 'opacity-60 cursor-not-allowed';
    }
    if (displayStatus === 'completed') {
      return 'border-primary/20 bg-primary/5';
    }
    return 'border-border hover:border-primary/30';
  };

  // Label del botón de acción
  const getActionLabel = () => {
    if (actionLabel) return actionLabel;
    
    switch (displayStatus) {
      case 'completed':
        return 'Entrar';
      case 'in-progress':
        return 'Continuar';
      case 'blocked':
        return 'Bloqueado';
      case 'optional':
        return 'Ver recursos';
      default:
        return 'Comenzar';
    }
  };

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) {
      onClick(e, { title: displayTitle, status: displayStatus });
    }
  };

  const handleAction = (e) => {
    e.stopPropagation();
    if (disabled || displayStatus === 'blocked') return;
    
    if (onAction) {
      onAction(e, { title: displayTitle, status: displayStatus });
    }
  };

  const containerClasses = cn(
    'relative rounded-lg p-4 transition-all duration-200',
    getCardStyles(),
    className
  );

  const iconClasses = cn(
    'h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0',
    displayStatus === 'completed' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
  );

  return (
    <div
      className={containerClasses}
      {...props}
    >
      {/* Badge de estado activo */}
      {active && (
        <div className="absolute top-2 right-2">
          <Badge status="active" size="sm">
            ACTIVA
          </Badge>
        </div>
      )}

      <div className="flex items-start space-x-4">
        {/* Icono */}
        <div className={iconClasses}>
          <Icon name={getDefaultIcon()} size="md" />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          {/* Título con número */}
          <div className="flex items-center space-x-2 mb-1">
            {displayNumber && (
              <span className="text-sm text-muted-foreground font-medium">
                {displayNumber} -
              </span>
            )}
            <h4 className="font-medium text-foreground truncate">
              {displayTitle}
            </h4>
          </div>

          {/* Descripción */}
          {displayDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {displayDescription}
            </p>
          )}

          {/* Enlaces de acceso */}
          <div className="space-y-1 text-sm mb-3">
            {types.map((type) => {
              let linkText = type;
              let iconName = 'document';
              
              if (type === 'programa-academico') {
                linkText = 'Programa Académico';
                iconName = 'book';
              } else if (type === 'clase') {
                linkText = 'Clase';
                iconName = 'monitor';
              } else if (type === 'tutoria') {
                linkText = 'Tutoría';
                iconName = 'users';
              }
              
              return (
                <div key={type} className="flex items-center">
                  <Icon name={iconName} size="xs" className="mr-2 text-muted-foreground" />
                  {links[type] && displayStatus !== 'blocked' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = links[type];
                      }}
                      className="text-primary hover:text-primary/80 underline transition-colors cursor-pointer"
                    >
                      {linkText}
                    </button>
                  ) : (
                    <span className={displayStatus === 'blocked' ? 'text-muted-foreground' : 'text-foreground'}>
                      {linkText}
                    </span>
                  )}
                </div>
              );
            })}
            
            {/* Fallback para módulos sin types */}
            {types.length === 0 && (
              <div className="flex items-center">
                <Icon name="refresh" size="xs" className="mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Autoaprendizaje</span>
              </div>
            )}
          </div>

          {/* Progreso */}
          {displayProgress !== undefined && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progreso</span>
                <span>{displayProgress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer con estado y acción */}
          <div className="flex items-center justify-between">
            {/* Badge de estado - solo mostrar algunos */}
            {(displayStatus === 'in-progress' || displayStatus === 'pending') && (
              <Badge status={displayStatus} size="sm">
                {displayStatus === 'in-progress' && 'En progreso'}
                {displayStatus === 'pending' && 'Pendiente'}
              </Badge>
            )}
            {displayStatus === 'completed' && (
              <Badge status={displayStatus} size="sm">
                Completado
              </Badge>
            )}
            {displayStatus === 'blocked' && <div />}

            {displayStatus === 'blocked' && (
              <span className="text-xs text-muted-foreground ml-auto">
                Bloqueado
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ModuleCard.propTypes = {
  module: modulePropType,
  title: PropTypes.string,
  description: PropTypes.string,
  status: statusPropType,
  progress: PropTypes.number,
  type: PropTypes.oneOf(['self-learning', 'tutoring']),
  icon: PropTypes.string,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string),
  links: PropTypes.objectOf(PropTypes.string),
};

export default ModuleCard;