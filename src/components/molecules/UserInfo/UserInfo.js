import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge, Icon } from '../../atoms';
import { cn } from '../../../utils/cn';
import { userPropType, sizePropType } from '../../../utils/propTypes';

const UserInfo = ({
  user,
  name,
  email,
  role,
  avatar,
  size = 'md',
  layout = 'horizontal',
  showRole = true,
  showEmail = true,
  showStatus = false,
  status,
  clickable = false,
  onClick,
  className,
  ...props
}) => {
  // Usar props del usuario o props individuales
  const displayName = name || user?.name || 'Usuario';
  const displayEmail = email || user?.email;
  const displayRole = role || user?.role;
  const displayAvatar = avatar || user?.avatar;
  const displayStatus = status || user?.status;

  const containerClasses = cn(
    'flex items-center',
    layout === 'vertical' ? 'flex-col text-center space-y-2' : 'space-x-3',
    clickable && 'cursor-pointer hover:bg-accent rounded-lg p-2 transition-colors',
    className
  );

  const avatarSizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  };

  const textSizes = {
    sm: {
      name: 'text-sm',
      email: 'text-xs',
      role: 'text-xs',
    },
    md: {
      name: 'text-sm',
      email: 'text-xs',
      role: 'text-xs',
    },
    lg: {
      name: 'text-base',
      email: 'text-sm',
      role: 'text-sm',
    },
    xl: {
      name: 'text-lg',
      email: 'text-base',
      role: 'text-base',
    },
  };

  const handleClick = (e) => {
    if (clickable && onClick) {
      onClick(e, { name: displayName, email: displayEmail, role: displayRole });
    }
  };

  return (
    <div
      className={containerClasses}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      } : undefined}
      {...props}
    >
      {/* Avatar */}
      <div className="relative">
        <Avatar
          src={displayAvatar}
          name={displayName}
          size={avatarSizes[size]}
        />
        
        {/* Indicador de estado */}
        {showStatus && displayStatus && (
          <div className="absolute -bottom-0 -right-0">
            <div
              className={cn(
                'h-3 w-3 rounded-full border-2 border-background',
                displayStatus === 'online' && 'bg-green-400',
                displayStatus === 'offline' && 'bg-muted',
                displayStatus === 'busy' && 'bg-red-400',
                displayStatus === 'away' && 'bg-yellow-400'
              )}
            />
          </div>
        )}
      </div>

      {/* Información del usuario */}
      <div className={cn(
        'flex-1 min-w-0',
        layout === 'vertical' ? 'text-center' : 'text-left'
      )}>
        {/* Nombre */}
        <p className={cn(
          'font-semibold text-foreground truncate',
          textSizes[size].name
        )}>
          {displayName}
        </p>

        {/* Email */}
        {showEmail && displayEmail && (
          <p className={cn(
            'text-muted-foreground truncate',
            textSizes[size].email
          )}>
            {displayEmail}
          </p>
        )}

        {/* Rol */}
        {showRole && displayRole && (
          <div className={cn(
            'mt-1',
            layout === 'vertical' ? 'flex justify-center' : 'flex items-center'
          )}>
            <Badge
              variant="outline"
              size="sm"
              className={cn(
                'text-xs',
                displayRole === 'admin' && 'border-destructive text-destructive',
                displayRole === 'teacher' && 'border-primary text-primary',
                displayRole === 'student' && 'border-muted-foreground text-muted-foreground'
              )}
            >
              {displayRole === 'admin' && <Icon name="settings" size="xs" className="mr-1" />}
              {displayRole === 'teacher' && <Icon name="book" size="xs" className="mr-1" />}
              {displayRole === 'student' && <Icon name="user" size="xs" className="mr-1" />}
              
              {displayRole === 'admin' && 'Administrador'}
              {displayRole === 'teacher' && 'Instructor'}
              {displayRole === 'student' && 'Estudiante'}
              {!['admin', 'teacher', 'student'].includes(displayRole) && displayRole}
            </Badge>
          </div>
        )}
      </div>

      {/* Indicador de acción clickable */}
      {clickable && (
        <div className="flex-shrink-0">
          <Icon 
            name="chevronRight" 
            size="sm" 
            className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
          />
        </div>
      )}
    </div>
  );
};

UserInfo.propTypes = {
  user: userPropType,
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  avatar: PropTypes.string,
  size: sizePropType,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  showRole: PropTypes.bool,
  showEmail: PropTypes.bool,
  showStatus: PropTypes.bool,
  status: PropTypes.oneOf(['online', 'offline', 'busy', 'away']),
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default UserInfo;