import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { cn } from '../../../utils/cn';
import { Button, Icon, Avatar, Logo } from '../../atoms';
import { UserInfo } from '../../molecules';

const AppHeader = ({
  title,
  showMenuButton = false,
  menuOpen = false,
  onMenuToggle,
  showThemeToggle = true,
  theme = 'light',
  onThemeToggle,
  user = {
    name: 'Gonzalo',
    avatar: null,
    notifications: 999
  },
  className,
  ...props
}) => {
  return (
    <header 
      className={cn(
        'bg-card border-b border-border px-3 sm:px-4 md:px-6 py-3 sm:py-4',
        'flex items-center justify-between',
        'sticky top-0 z-50 backdrop-blur-sm bg-card/95',
        'min-h-[60px] sm:min-h-[68px]',
        className
      )}
      {...props}
    >
      {/* Left section: Menu button + Title */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
        {showMenuButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            aria-label={menuOpen ? 'Ocultar menú' : 'Mostrar menú'}
            className="flex-shrink-0"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size="md" />
          </Button>
        )}
        
        {title && (
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground truncate">
            {title}
          </h1>
        )}
      </div>

      {/* Center section: DesafioLatam Logo */}
      <div className="hidden sm:flex flex-1 justify-center px-4">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Logo
            width={120}
            height={40}
            className="h-6 sm:h-8 md:h-10 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Right section: Theme toggle + User profile */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-1 justify-end">
        {/* Theme toggle - Desktop */}
        {showThemeToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onThemeToggle}
            aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
            className="hidden md:flex flex-shrink-0"
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} size="md" />
          </Button>
        )}

        {/* Notifications indicator */}
        {user.notifications > 0 && (
          <div className="relative flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              aria-label={`${user.notifications} notificaciones`}
              className="relative"
            >
              <Icon name="bell" size="md" />
              <div className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-4.5 flex items-center justify-center px-1 leading-none">
                {user.notifications > 99 ? '99+' : user.notifications}
              </div>
            </Button>
          </div>
        )}

        {/* User profile */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <Avatar
            src={user.avatar}
            name={user.name}
            size="sm"
            className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all w-8 h-8 sm:w-9 sm:h-9"
          />
          
          {/* User name - Only on larger screens */}
          <div className="hidden xl:block">
            <Button
              variant="ghost"
              size="sm"
              className="text-left flex items-center gap-2 px-2 py-1"
            >
              <div className="text-sm min-w-0">
                <p className="font-medium text-foreground truncate max-w-[100px]">{user.name}</p>
                <p className="text-xs text-muted-foreground">Ver perfil</p>
              </div>
              <Icon name="chevron-down" size="xs" className="text-muted-foreground flex-shrink-0" />
            </Button>
          </div>

          {/* User name - Medium screens (just name) */}
          <div className="hidden lg:block xl:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-left flex items-center gap-1 px-1"
            >
              <span className="text-sm font-medium text-foreground truncate max-w-[80px]">{user.name}</span>
              <Icon name="chevron-down" size="xs" className="text-muted-foreground flex-shrink-0" />
            </Button>
          </div>
        </div>

        {/* Mobile theme toggle */}
        {showThemeToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onThemeToggle}
            aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
            className="md:hidden flex-shrink-0"
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} size="sm" />
          </Button>
        )}
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  title: PropTypes.string,
  showMenuButton: PropTypes.bool,
  menuOpen: PropTypes.bool,
  onMenuToggle: PropTypes.func,
  showThemeToggle: PropTypes.bool,
  theme: PropTypes.oneOf(['light', 'dark']),
  onThemeToggle: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    notifications: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default AppHeader;