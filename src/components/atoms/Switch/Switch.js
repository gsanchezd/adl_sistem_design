import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';

const Switch = forwardRef(({
  size = 'md',
  checked = false,
  disabled = false,
  error = false,
  label,
  description,
  onChange,
  className,
  ...props
}, ref) => {
  const sizes = {
    sm: {
      track: 'h-5 w-9',
      thumb: 'h-4 w-4',
      translate: 'translate-x-4',
      text: 'text-sm'
    },
    md: {
      track: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5',
      text: 'text-sm'
    },
    lg: {
      track: 'h-7 w-14',
      thumb: 'h-6 w-6',
      translate: 'translate-x-7',
      text: 'text-base'
    }
  };

  const trackClasses = cn(
    'relative inline-flex items-center rounded-full',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'transition-colors duration-200 cursor-pointer',
    sizes[size].track,
    checked 
      ? 'bg-primary' 
      : 'bg-muted/80 dark:bg-muted/60 border border-border dark:border-muted-foreground/30',
    error && 'focus:ring-destructive',
    disabled && 'cursor-not-allowed opacity-50',
    className
  );

  const thumbClasses = cn(
    'inline-block rounded-full bg-background shadow-lg',
    'transition-transform duration-200 ease-in-out',
    'border border-border',
    sizes[size].thumb,
    checked ? sizes[size].translate : 'translate-x-0.5'
  );

  const containerClasses = cn(
    'flex items-start gap-3',
    disabled && 'cursor-not-allowed opacity-50'
  );

  const handleChange = (e) => {
    if (!disabled && onChange) {
      // Si es un evento de click en el track, crear un evento sintético
      if (e.type === 'click') {
        const syntheticEvent = {
          target: {
            checked: !checked
          }
        };
        onChange(syntheticEvent);
      } else {
        onChange(e);
      }
    }
  };

  const renderSwitch = () => (
    <div className="relative">
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <div 
        className={trackClasses}
        onClick={!disabled ? handleChange : undefined}
      >
        <span className={thumbClasses} />
      </div>
    </div>
  );

  if (label || description) {
    return (
      <label className={containerClasses}>
        <div className="flex-1">
          {label && (
            <div className={cn(
              'font-medium text-foreground leading-tight',
              sizes[size].text
            )}>
              {label}
            </div>
          )}
          {description && (
            <div className={cn(
              'text-muted-foreground mt-1',
              sizes[size].text === 'text-sm' ? 'text-xs' : 'text-sm'
            )}>
              {description}
            </div>
          )}
        </div>
        {renderSwitch()}
      </label>
    );
  }

  return renderSwitch();
});

Switch.displayName = 'Switch';

Switch.propTypes = {
  size: sizePropType,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Switch;