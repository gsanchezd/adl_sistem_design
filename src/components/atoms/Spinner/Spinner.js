import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';

const Spinner = ({
  size = 'md',
  className,
  ...props
}) => {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  };

  const spinnerClasses = cn(
    'animate-spin rounded-full border-2 border-muted border-t-primary',
    sizes[size],
    className
  );

  return (
    <div
      className={spinnerClasses}
      role="status"
      aria-label="Cargando"
      {...props}
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

Spinner.propTypes = {
  size: sizePropType,
  className: PropTypes.string,
};

export default Spinner;