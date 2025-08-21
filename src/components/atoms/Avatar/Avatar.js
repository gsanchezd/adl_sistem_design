import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';

const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  className,
  fallbackClassName,
  ...props
}) => {
  // Generar iniciales del nombre
  const getInitials = (name) => {
    if (!name) return '?';
    
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  };

  const baseClasses = 'relative flex shrink-0 overflow-hidden rounded-lg';
  
  const sizes = {
    xs: 'h-6 w-6',      // 24px
    sm: 'h-8 w-8',      // 32px
    md: 'h-10 w-10',    // 40px - tamaño por defecto
    lg: 'h-12 w-12',    // 48px
    xl: 'h-16 w-16',    // 64px
  };
  
  const fallbackSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };
  
  const avatarClasses = cn(
    baseClasses,
    sizes[size],
    className
  );
  
  const fallbackClasses = cn(
    'flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground font-medium',
    fallbackSizes[size],
    fallbackClassName
  );

  return (
    <div className={avatarClasses} {...props}>
      {src ? (
        <Image
          className="aspect-square h-full w-full object-cover"
          src={src}
          alt={alt || name || 'Avatar'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // Si falla la carga de imagen, ocultar el img para mostrar el fallback
            e.target.style.display = 'none';
          }}
        />
      ) : null}
      
      {/* Fallback con iniciales - siempre presente como respaldo */}
      <div 
        className={cn(
          fallbackClasses,
          src && 'absolute inset-0' // Solo visible si no hay imagen o falla
        )}
      >
        {getInitials(name)}
      </div>
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: sizePropType,
  className: PropTypes.string,
  fallbackClassName: PropTypes.string,
};

export default Avatar;