'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { Icon, Button } from '../../atoms';

const Alert = ({
  variant = 'default',
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const variants = {
    default: {
      container: 'bg-muted border-border text-foreground',
      icon: 'question',
      iconColor: 'text-muted-foreground'
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100',
      icon: 'question',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100',
      icon: 'check',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100',
      icon: 'clock',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100',
      icon: 'close',
      iconColor: 'text-red-600 dark:text-red-400'
    }
  };

  const variantStyles = variants[variant] || variants.default;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4',
        variantStyles.container,
        className
      )}
      role="alert"
      {...props}
    >
      <div className="flex items-start gap-3">
        {/* Icono */}
        <div className="flex-shrink-0 mt-0.5">
          <Icon 
            name={variantStyles.icon} 
            size="sm" 
            className={variantStyles.iconColor}
          />
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-semibold mb-1">
              {title}
            </h4>
          )}
          
          <div className="text-sm">
            {children}
          </div>
        </div>

        {/* Botón de cerrar */}
        {dismissible && (
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className={cn(
                'h-6 w-6 p-0 hover:bg-black/5 dark:hover:bg-white/10',
                variantStyles.iconColor
              )}
            >
              <Icon name="close" size="sm" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  className: PropTypes.string,
};

export default Alert;