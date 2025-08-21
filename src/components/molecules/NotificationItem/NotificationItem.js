import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../atoms';
import { cn } from '../../../utils/cn';
import { notificationPropType } from '../../../utils/propTypes';

const NotificationItem = ({
  title,
  message,
  timestamp,
  read = false,
  type = 'info',
  onClick,
  onMarkAsRead,
  className,
  showReadIndicator = true,
  ...props
}) => {
  const typeIcons = {
    info: 'message',
    success: 'check',
    warning: 'clock',
    error: 'close',
  };

  const typeColors = {
    info: 'text-primary',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-destructive',
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    
    // Auto-marcar como leída al hacer click
    if (!read && onMarkAsRead) {
      onMarkAsRead();
    }
  };

  const containerClasses = cn(
    'flex space-x-3 p-4 border-b border-border hover:bg-accent/50 transition-colors cursor-pointer',
    !read && 'bg-primary/5',
    className
  );

  return (
    <div
      className={containerClasses}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      }}
      {...props}
    >
      {/* Indicador de lectura */}
      {showReadIndicator && (
        <div className="flex-shrink-0 mt-2">
          <div
            className={cn(
              'h-2 w-2 rounded-full',
              read ? 'bg-muted' : 'bg-primary'
            )}
          />
        </div>
      )}
      
      {/* Icono de tipo (opcional) */}
      {type && (
        <div className="flex-shrink-0 mt-1">
          <Icon 
            name={typeIcons[type]} 
            size="sm"
            className={cn('opacity-70', typeColors[type])}
          />
        </div>
      )}
      
      {/* Contenido principal */}
      <div className="flex-1 min-w-0">
        {/* Título */}
        <p className={cn(
          'text-sm font-medium truncate',
          read ? 'text-muted-foreground' : 'text-foreground'
        )}>
          {title}
        </p>
        
        {/* Mensaje */}
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
          {message}
        </p>
        
        {/* Timestamp */}
        <p className="text-xs text-muted-foreground mt-1">
          {timestamp}
        </p>
      </div>
      
      {/* Acciones adicionales */}
      {!read && onMarkAsRead && (
        <div className="flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead();
            }}
            className="p-1 rounded hover:bg-accent transition-colors"
            title="Marcar como leída"
            aria-label="Marcar como leída"
          >
            <Icon name="check" size="sm" className="text-muted-foreground hover:text-primary" />
          </button>
        </div>
      )}
    </div>
  );
};

NotificationItem.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  read: PropTypes.bool,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  onClick: PropTypes.func,
  onMarkAsRead: PropTypes.func,
  className: PropTypes.string,
  showReadIndicator: PropTypes.bool,
  
  // Soporte para el objeto completo de notificación
  notification: notificationPropType,
};

export default NotificationItem;