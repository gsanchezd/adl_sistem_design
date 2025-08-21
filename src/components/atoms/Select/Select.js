import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';
import Icon from '../Icon/Icon';

const Select = forwardRef(({
  size = 'md',
  placeholder,
  disabled = false,
  error = false,
  options = [],
  value,
  onChange,
  className,
  children,
  ...props
}, ref) => {
  const baseClasses = 'flex w-full rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer';
  
  const sizes = {
    sm: 'h-8 px-2 text-xs pr-8',
    md: 'h-10 px-3 py-2 pr-10',
    lg: 'h-12 px-4 py-3 text-base pr-12',
  };
  
  const errorClasses = error 
    ? 'border-destructive focus:ring-destructive' 
    : 'border-border focus:ring-ring';
  
  const selectClasses = cn(
    baseClasses,
    sizes[size],
    errorClasses,
    className
  );

  const containerClasses = 'relative w-full';
  
  const iconClasses = cn(
    'absolute top-1/2 transform -translate-y-1/2 right-3 pointer-events-none text-muted-foreground',
    size === 'sm' && 'right-2',
    size === 'lg' && 'right-4'
  );

  return (
    <div className={containerClasses}>
      <select
        ref={ref}
        className={selectClasses}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        
        {/* Renderizar children si se proporcionan */}
        {children}
        
        {/* Renderizar opciones desde el array options si se proporciona */}
        {options.map((option) => {
          if (typeof option === 'string') {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          }
          
          return (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          );
        })}
      </select>
      
      <div className={iconClasses}>
        <Icon name="chevronDown" size={size === 'sm' ? 'sm' : 'md'} />
      </div>
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  size: sizePropType,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
      }),
    ])
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Select;