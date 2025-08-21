import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { Icon, Button, Avatar } from '../../atoms';

const TutorChat = ({
  isOpen = false,
  onClose,
  className,
  ...props
}) => {
  const [message, setMessage] = useState('');
  const [messages] = useState([
    {
      id: 1,
      sender: 'tutor',
      content: '¡Hola! Soy tu tutor virtual. ¿En qué puedo ayudarte hoy?',
      time: '10:30'
    },
    {
      id: 2,
      sender: 'user',
      content: 'Tengo dudas sobre el módulo 2',
      time: '10:32'
    },
    {
      id: 3,
      sender: 'tutor',
      content: 'Perfecto. El módulo 2 trata sobre metodologías de mejora continua. ¿Hay algún concepto específico que te gustaría repasar?',
      time: '10:33'
    },
    {
      id: 4,
      sender: 'user',
      content: '¿Podrías explicarme el ciclo PDCA?',
      time: '10:35'
    },
    {
      id: 5,
      sender: 'tutor',
      content: '¡Claro! PDCA significa: Planificar, Hacer, Verificar y Actuar. Es un ciclo continuo para la mejora de procesos. ¿Te gustaría que te envíe un diagrama?',
      time: '10:36'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aquí se enviaría el mensaje al backend
      console.log('Enviando mensaje:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 w-80 h-96 bg-card border border-border rounded-xl shadow-2xl flex flex-col z-50',
        className
      )}
      {...props}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <Avatar
            name="Tutor Virtual"
            size="sm"
            className="w-8 h-8 bg-primary/20 text-primary"
          />
          <div>
            <h3 className="text-sm font-semibold">Tutor Virtual</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-muted-foreground">En línea</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground p-1"
        >
          <Icon name="close" size="sm" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex items-start space-x-2',
              msg.sender === 'user' && 'justify-end'
            )}
          >
            {msg.sender === 'tutor' && (
              <Avatar
                name="Tutor"
                size="xs"
                className="w-6 h-6 bg-primary/20 text-primary flex-shrink-0"
              />
            )}
            
            <div
              className={cn(
                'rounded-lg p-3 max-w-[200px]',
                msg.sender === 'tutor'
                  ? 'bg-muted/50'
                  : 'bg-primary text-primary-foreground'
              )}
            >
              <p className="text-xs">{msg.content}</p>
              <span
                className={cn(
                  'text-xs',
                  msg.sender === 'tutor'
                    ? 'text-muted-foreground'
                    : 'text-primary-foreground/70'
                )}
              >
                {msg.time}
              </span>
            </div>

            {msg.sender === 'user' && (
              <Avatar
                name="Usuario"
                size="xs"
                className="w-6 h-6 bg-secondary flex-shrink-0"
              />
            )}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-border">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Escribe tu pregunta..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 bg-muted/50 border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 min-w-[36px]"
          >
            <Icon name="send" size="sm" />
          </Button>
        </div>
      </div>
    </div>
  );
};

TutorChat.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default TutorChat;