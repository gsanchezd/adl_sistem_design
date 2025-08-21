import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon } from '../../atoms';
import { cn } from '../../../utils/cn';

const ChatMessage = ({
  message,
  timestamp,
  sender = 'user',
  senderName,
  senderAvatar,
  isOwn = false,
  showAvatar = true,
  showTimestamp = true,
  status = 'sent', // sent, delivered, read, sending, error
  className,
  onRetry,
  ...props
}) => {
  const isBot = sender === 'bot' || sender === 'tutor';
  const isUser = sender === 'user' || isOwn;

  // Clases del contenedor principal
  const containerClasses = cn(
    'flex items-start space-x-2',
    isUser ? 'justify-end' : 'justify-start',
    className
  );

  // Clases de la burbuja de mensaje
  const bubbleClasses = cn(
    'rounded-lg p-3 max-w-[200px] break-words',
    isUser
      ? 'bg-primary text-primary-foreground'
      : 'bg-muted text-foreground',
    status === 'error' && 'border border-destructive'
  );

  // Clases del timestamp
  const timestampClasses = cn(
    'text-xs mt-1',
    isUser
      ? 'text-primary-foreground/70'
      : 'text-muted-foreground'
  );

  // Icono de estado para mensajes del usuario
  const getStatusIcon = () => {
    if (!isUser || !status || status === 'sent') return null;
    
    switch (status) {
      case 'sending':
        return <Icon name="clock" size="xs" className="opacity-50 animate-pulse" />;
      case 'error':
        return <Icon name="close" size="xs" className="text-destructive cursor-pointer" onClick={onRetry} />;
      case 'delivered':
        return <Icon name="check" size="xs" className="opacity-70" />;
      case 'read':
        return <Icon name="checkCircle" size="xs" className="opacity-70" />;
      default:
        return null;
    }
  };

  // Avatar del remitente
  const getAvatar = () => {
    if (!showAvatar) return null;
    
    if (isBot) {
      return (
        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Icon name="user" size="xs" className="text-primary" />
        </div>
      );
    }
    
    if (isUser && senderAvatar) {
      return (
        <Avatar
          src={senderAvatar}
          name={senderName}
          size="xs"
          className="flex-shrink-0"
        />
      );
    }
    
    if (isUser) {
      return (
        <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium">
            {senderName ? senderName.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={containerClasses} {...props}>
      {/* Avatar izquierdo (para bot/otros usuarios) */}
      {!isUser && getAvatar()}
      
      {/* Contenido del mensaje */}
      <div className={cn('flex flex-col', isUser ? 'items-end' : 'items-start')}>
        {/* Nombre del remitente (solo para bots o cuando no es propio) */}
        {!isUser && senderName && (
          <span className="text-xs text-muted-foreground mb-1">
            {senderName}
          </span>
        )}
        
        {/* Burbuja del mensaje */}
        <div className={bubbleClasses}>
          <p className="text-xs whitespace-pre-wrap">
            {message}
          </p>
        </div>
        
        {/* Timestamp y estado */}
        {(showTimestamp || status) && (
          <div className={cn(
            'flex items-center space-x-1',
            isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
          )}>
            {showTimestamp && (
              <span className={timestampClasses}>
                {timestamp}
              </span>
            )}
            {getStatusIcon()}
          </div>
        )}
        
        {/* Mensaje de error */}
        {status === 'error' && onRetry && (
          <button
            onClick={onRetry}
            className="text-xs text-destructive hover:text-destructive/80 mt-1"
          >
            Tocar para reintentar
          </button>
        )}
      </div>
      
      {/* Avatar derecho (para usuario propio) */}
      {isUser && getAvatar()}
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  sender: PropTypes.oneOf(['user', 'bot', 'tutor', 'other']),
  senderName: PropTypes.string,
  senderAvatar: PropTypes.string,
  isOwn: PropTypes.bool,
  showAvatar: PropTypes.bool,
  showTimestamp: PropTypes.bool,
  status: PropTypes.oneOf(['sending', 'sent', 'delivered', 'read', 'error']),
  className: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ChatMessage;