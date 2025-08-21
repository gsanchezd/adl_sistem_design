import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Badge } from '../../atoms';
import { cn } from '../../../utils/cn';
import { childrenPropType } from '../../../utils/propTypes';

const DropdownItem = ({
  children,
  leftIcon,
  rightIcon,
  badge,
  badgeVariant,
  href,
  onClick,
  disabled = false,
  active = false,
  danger = false,
  className,
  ...props
}) => {
  const baseClasses = 'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left';
  
  const stateClasses = cn(
    disabled
      ? 'opacity-50 cursor-not-allowed'
      : active
      ? 'bg-primary text-primary-foreground'
      : danger
      ? 'text-destructive hover:text-destructive hover:bg-destructive/10'
      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
  );

  const itemClasses = cn(baseClasses, stateClasses, className);

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  const content = (
    <>
      {/* Icono izquierdo */}
      {leftIcon && (
        <div className="flex-shrink-0">
          {typeof leftIcon === 'string' ? (
            <Icon 
              name={leftIcon} 
              size="sm" 
              className={cn(
                active 
                  ? 'text-primary-foreground' 
                  : danger 
                  ? 'text-destructive' 
                  : 'text-muted-foreground'
              )} 
            />
          ) : (
            leftIcon
          )}
        </div>
      )}
      
      {/* Contenido principal */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
      
      {/* Badge */}
      {badge && (
        <div className="flex-shrink-0">
          <Badge
            variant={badgeVariant || (active ? 'secondary' : 'outline')}
            size="sm"
            className="ml-auto"
          >
            {badge}
          </Badge>
        </div>
      )}
      
      {/* Icono derecho */}
      {rightIcon && (
        <div className="flex-shrink-0">
          {typeof rightIcon === 'string' ? (
            <Icon 
              name={rightIcon} 
              size="sm" 
              className={cn(
                active 
                  ? 'text-primary-foreground' 
                  : danger 
                  ? 'text-destructive' 
                  : 'text-muted-foreground'
              )} 
            />
          ) : (
            rightIcon
          )}
        </div>
      )}
    </>
  );

  // Si es un enlace
  if (href && !disabled) {
    return (
      <a
        href={href}
        className={itemClasses}
        onClick={handleClick}
        {...props}
      >
        {content}
      </a>
    );
  }

  // Si es un botón
  return (
    <button
      type="button"
      className={itemClasses}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

DropdownItem.propTypes = {
  children: childrenPropType.isRequired,
  leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  badgeVariant: PropTypes.oneOf(['default', 'secondary', 'destructive', 'outline']),
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  danger: PropTypes.bool,
  className: PropTypes.string,
};

export default DropdownItem;