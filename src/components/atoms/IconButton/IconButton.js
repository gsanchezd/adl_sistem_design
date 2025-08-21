import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';
import Icon from '../Icon/Icon';

const IconButton = ({
  name,
  size = 'md',
  variant = 'default',
  className,
  onClick,
  disabled = false,
  ...props
}) => {
  const sizes = {
    xs: {
      container: 'h-6 w-6',
      icon: 'xs'
    },
    sm: {
      container: 'h-8 w-8',
      icon: 'sm'
    },
    md: {
      container: 'h-10 w-10',
      icon: 'md'
    },
    lg: {
      container: 'h-12 w-12',
      icon: 'lg'
    },
    xl: {
      container: 'h-16 w-16',
      icon: 'xl'
    },
  };

  const variants = {
    default: 'bg-muted text-muted-foreground hover:bg-muted/80',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    success: 'bg-[#22c55e] text-white hover:bg-[#16a34a]',
    warning: 'bg-[#f97316] text-white hover:bg-[#ea580c]',
    info: 'bg-[#0891b2] text-white hover:bg-[#0e7490]',
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-full',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    sizes[size].container,
    variants[variant],
    className
  );

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <Icon 
        name={name} 
        size={sizes[size].icon}
        className="flex-shrink-0"
      />
    </button>
  );
};

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  size: sizePropType,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'secondary', 
    'destructive',
    'outline',
    'ghost',
    'success',
    'warning',
    'info'
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default IconButton;