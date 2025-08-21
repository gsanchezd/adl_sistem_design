import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { childrenPropType, sizePropType, statusPropType } from '../../../utils/propTypes';

const Badge = ({
  children,
  variant = 'default',
  status,
  size = 'md',
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  
  // Variantes básicas de color
  const variants = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground border-border',
  };
  
  // Estados específicos de módulos (basados en los ejemplos)
  const statusVariants = {
    completed: 'border-transparent bg-primary/10 text-primary hover:bg-primary/20',
    'in-progress': 'border-transparent bg-primary/20 text-primary hover:bg-primary/30',
    pending: 'border-transparent bg-muted text-muted-foreground',
    blocked: 'border-transparent bg-muted text-muted-foreground',
    optional: 'border-transparent bg-muted text-muted-foreground',
    active: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };
  
  // Usar status si está disponible, sino usar variant
  const selectedVariant = status ? statusVariants[status] : variants[variant];
  
  const badgeClasses = cn(
    baseClasses,
    selectedVariant,
    sizes[size],
    className
  );

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: childrenPropType.isRequired,
  variant: PropTypes.oneOf(['default', 'secondary', 'destructive', 'outline']),
  status: statusPropType,
  size: sizePropType,
  className: PropTypes.string,
};

export default Badge;