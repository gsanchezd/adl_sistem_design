import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from '../../atoms';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';

const SearchInput = ({
  placeholder = 'Buscar contenido...',
  value,
  onChange,
  onSearch,
  onClear,
  size = 'md',
  disabled = false,
  className,
  showClearButton = true,
  autoFocus = false,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const inputRef = useRef(null);
  
  const currentValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(e);
    }
  };

  const handleSearch = () => {
    if (onSearch && currentValue.trim()) {
      onSearch(currentValue.trim());
    }
  };

  const handleClear = () => {
    const newValue = '';
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onClear) {
      onClear();
    }
    
    // Crear evento sintético para onChange
    if (onChange) {
      const syntheticEvent = {
        target: { value: newValue },
        currentTarget: { value: newValue },
      };
      onChange(syntheticEvent);
    }
    
    // Enfocar el input después de limpiar
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentValue.trim()) {
      e.preventDefault();
      handleSearch();
    }
    
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  const searchIcon = (
    <Icon 
      name="search" 
      className="cursor-pointer hover:text-foreground transition-colors"
      onClick={handleSearch}
    />
  );

  const clearIcon = showClearButton && currentValue && (
    <Icon 
      name="close" 
      className="cursor-pointer hover:text-foreground transition-colors"
      onClick={handleClear}
    />
  );

  return (
    <Input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      value={currentValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      size={size}
      disabled={disabled}
      leftIcon={searchIcon}
      rightIcon={clearIcon}
      className={cn('transition-all duration-200', className)}
      autoFocus={autoFocus}
      {...props}
    />
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  size: sizePropType,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showClearButton: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default SearchInput;