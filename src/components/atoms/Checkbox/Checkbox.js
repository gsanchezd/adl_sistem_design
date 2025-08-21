import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';
import Icon from '../Icon/Icon';

const Checkbox = forwardRef(({
  size = 'md',
  checked = false,
  indeterminate = false,
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
      checkbox: 'h-4 w-4',
      text: 'text-sm',
      icon: 'xs'
    },
    md: {
      checkbox: 'h-5 w-5',
      text: 'text-sm',
      icon: 'sm'
    },
    lg: {
      checkbox: 'h-6 w-6',
      text: 'text-base',
      icon: 'md'
    }
  };

  const checkboxClasses = cn(
    'rounded border border-border bg-background',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'transition-colors cursor-pointer',
    'flex items-center justify-center',
    sizes[size].checkbox,
    checked && 'bg-primary border-primary text-primary-foreground',
    indeterminate && 'bg-primary border-primary text-primary-foreground',
    error && 'border-destructive focus:ring-destructive',
    disabled && 'cursor-not-allowed opacity-50',
    className
  );

  const containerClasses = cn(
    'flex items-start gap-3',
    disabled && 'cursor-not-allowed opacity-50'
  );

  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e);
    }
  };

  const renderCheckbox = () => (
    <div className="relative">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <div className={checkboxClasses}>
        {indeterminate ? (
          <div className="h-0.5 w-2.5 bg-current rounded-full" />
        ) : checked ? (
          <Icon 
            name="check" 
            size={sizes[size].icon} 
            className="text-current"
          />
        ) : null}
      </div>
    </div>
  );

  if (label || description) {
    return (
      <label className={containerClasses}>
        {renderCheckbox()}
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
      </label>
    );
  }

  return renderCheckbox();
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  size: sizePropType,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Checkbox;