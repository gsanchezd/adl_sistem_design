'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { ChatMessage, UserInfo } from '../../molecules';
import { Button, Icon, Input } from '../../atoms';

const ChatWidget = ({
  messages = [],
  currentUser,
  onSendMessage,
  onRetryMessage,
  isLoading = false,
  isMinimized = false,
  onToggleMinimize,
  onClose,
  className,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    
    const newMessage = {
      message: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      sender: 'user',
      senderName: currentUser?.name || 'Usuario',
      isOwn: true,
    };

    onSendMessage?.(newMessage);
    setInputValue('');
    
    // Simular typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div 
        className={cn(
          'fixed bottom-4 right-4 z-50',
          'w-14 h-14 bg-primary rounded-full',
          'flex items-center justify-center',
          'shadow-lg cursor-pointer',
          'hover:scale-105 transition-transform',
          className
        )}
        onClick={onToggleMinimize}
        {...props}
      >
        <Icon name="chat" size="md" className="text-primary-foreground" />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'fixed bottom-4 right-4 z-50',
        'w-80 h-96 bg-card border border-border rounded-xl',
        'shadow-xl flex flex-col',
        'animate-in',
        className
      )}
      {...props}
    >
      {/* Header del chat */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserInfo
            user={{
              name: 'Tutor Virtual',
              avatar: null,
            }}
            size="sm"
            layout="horizontal"
            showStatus={true}
            status="online"
            clickable={false}
          />
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMinimize}
            className="p-1"
          >
            <Icon name="chevronDown" size="sm" />
          </Button>
          
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1"
            >
              <Icon name="close" size="sm" />
            </Button>
          )}
        </div>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Icon name="chat" size="lg" className="text-muted-foreground mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">
              ¡Hola! Soy tu tutor virtual.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ¿En qué puedo ayudarte hoy?
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              {...message}
              onRetry={() => onRetryMessage?.(message, index)}
            />
          ))
        )}
        
        {/* Indicador de typing */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span>Tutor Virtual está escribiendo...</span>
          </div>
        )}
      </div>

      {/* Input para enviar mensajes */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Escribe tu mensaje..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            size="sm"
            disabled={isLoading}
            className="flex-1"
          />
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-3"
          >
            {isLoading ? (
              <Icon name="clock" size="sm" />
            ) : (
              <Icon name="send" size="sm" />
            )}
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Presiona Enter para enviar</span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            En línea
          </span>
        </div>
      </div>
    </div>
  );
};

ChatWidget.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    senderName: PropTypes.string.isRequired,
    isOwn: PropTypes.bool,
    status: PropTypes.oneOf(['sending', 'sent', 'failed']),
  })),
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onSendMessage: PropTypes.func,
  onRetryMessage: PropTypes.func,
  isLoading: PropTypes.bool,
  isMinimized: PropTypes.bool,
  onToggleMinimize: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default ChatWidget;