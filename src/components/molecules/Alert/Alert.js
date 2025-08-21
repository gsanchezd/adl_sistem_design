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
      container: 'border-2 text-foreground bg-[#0891b2]/10 border-[#0891b2]',
      icon: 'question',
      iconColor: 'text-[#0891b2]'
    },
    success: {
      container: 'border-2 text-foreground bg-[#22c55e]/10 border-[#22c55e]',
      icon: 'check',
      iconColor: 'text-[#22c55e]'
    },
    warning: {
      container: 'border-2 text-foreground bg-[#f97316]/10 border-[#f97316]',
      icon: 'clock',
      iconColor: 'text-[#f97316]'
    },
    error: {
      container: 'border-2 text-foreground bg-[#dc2626]/10 border-[#dc2626]',
      icon: 'close',
      iconColor: 'text-[#dc2626]'
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
        'relative rounded-lg p-4',
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