import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';

const Radio = forwardRef(({
  size = 'md',
  checked = false,
  disabled = false,
  error = false,
  label,
  description,
  name,
  value,
  onChange,
  className,
  ...props
}, ref) => {
  const sizes = {
    sm: {
      radio: 'h-4 w-4',
      dot: 'h-2 w-2',
      text: 'text-sm'
    },
    md: {
      radio: 'h-5 w-5',
      dot: 'h-2.5 w-2.5',
      text: 'text-sm'
    },
    lg: {
      radio: 'h-6 w-6',
      dot: 'h-3 w-3',
      text: 'text-base'
    }
  };

  const radioClasses = cn(
    'rounded-full border border-border bg-background',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'transition-colors cursor-pointer',
    'flex items-center justify-center',
    sizes[size].radio,
    checked && 'border-primary',
    error && 'border-destructive focus:ring-destructive',
    disabled && 'cursor-not-allowed opacity-50',
    className
  );

  const dotClasses = cn(
    'rounded-full bg-primary transition-all duration-200',
    sizes[size].dot,
    checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
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

  const renderRadio = () => (
    <div className="relative">
      <input
        ref={ref}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <div className={radioClasses}>
        <div className={dotClasses} />
      </div>
    </div>
  );

  if (label || description) {
    return (
      <label className={containerClasses}>
        {renderRadio()}
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

  return renderRadio();
});

Radio.displayName = 'Radio';

Radio.propTypes = {
  size: sizePropType,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Radio;