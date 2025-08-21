import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';

const Input = forwardRef(({
  type = 'text',
  size = 'md',
  placeholder,
  disabled = false,
  error = false,
  leftIcon,
  rightIcon,
  className,
  onChange,
  value,
  ...props
}, ref) => {
  const baseClasses = 'flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  
  const sizes = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-10 px-3 py-2',
    lg: 'h-12 px-4 py-3 text-base',
  };
  
  const errorClasses = error 
    ? 'border-destructive focus:ring-destructive' 
    : 'border-border focus:ring-ring';
  
  const inputClasses = cn(
    baseClasses,
    sizes[size],
    errorClasses,
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    className
  );

  const containerClasses = 'relative w-full';
  
  const iconClasses = 'absolute top-1/2 transform -translate-y-1/2 text-muted-foreground flex items-center justify-center pointer-events-none';
  const leftIconClasses = cn(iconClasses, 'left-3');
  const rightIconClasses = cn(iconClasses, 'right-3');

  return (
    <div className={containerClasses}>
      {leftIcon && (
        <div className={leftIconClasses}>
          {leftIcon}
        </div>
      )}
      
      <input
        ref={ref}
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...props}
      />
      
      {rightIcon && (
        <div className={rightIconClasses}>
          {rightIcon}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  size: sizePropType,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;