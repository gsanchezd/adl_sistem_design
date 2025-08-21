'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { cn } from '../../../utils/cn';
import { SearchInput, UserInfo, NotificationItem } from '../../molecules';
import { Button, Icon, Badge } from '../../atoms';

const Header = ({
  user,
  onSearch,
  onToggleTheme,
  theme = 'light',
  notifications = [],
  showNotifications = false,
  onToggleNotifications,
  showUserMenu = false,
  onToggleUserMenu,
  className,
  ...props
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header 
      className={cn(
        'w-full bg-card border-b border-border',
        'px-6 py-4',
        'flex items-center justify-between',
        'sticky top-0 z-50',
        className
      )}
      {...props}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <Icon name="lightning" size="sm" className="text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Empieza</span>
        </Link>
      </div>

      {/* Búsqueda central */}
      <div className="flex-1 max-w-md mx-6 hidden lg:block">
        <SearchInput
          placeholder="Buscar módulos, contenido..."
          size="sm"
          onSearch={onSearch}
        />
      </div>

      {/* Acciones del usuario */}
      <div className="flex items-center gap-3">
        {/* Búsqueda móvil */}
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Icon name="search" size="sm" />
        </Button>

        {/* Toggle de tema */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onToggleTheme}
          className="flex items-center gap-2"
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size="sm" />
          <span className="hidden md:inline text-sm">
            {theme === 'light' ? 'Tema Oscuro' : 'Tema Claro'}
          </span>
        </Button>

        {/* Notificaciones */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleNotifications}
            className="relative"
          >
            <Icon name="message" size="sm" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>

          {/* Dropdown de notificaciones */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Notificaciones</h3>
                  {unreadCount > 0 && (
                    <Badge variant="secondary">{unreadCount} nuevas</Badge>
                  )}
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      {...notification}
                      onClick={() => console.log('Notification clicked:', notification.id)}
                      onMarkAsRead={() => console.log('Mark as read:', notification.id)}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Icon name="message" size="lg" className="mx-auto mb-2 opacity-50" />
                    <p>No hay notificaciones</p>
                  </div>
                )}
              </div>
              
              {notifications.length > 5 && (
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    Ver todas las notificaciones
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Menú de usuario */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleUserMenu}
            className="flex items-center gap-2"
          >
            <span className="text-sm font-medium text-foreground">{user?.name}</span>
            <Icon name="chevron-down" size="xs" className="text-muted-foreground" />
          </Button>

          {/* Dropdown de usuario */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <UserInfo
                  user={user}
                  size="lg"
                  layout="vertical"
                  showStatus={true}
                  status="online"
                  clickable={false}
                />
              </div>
              
              <div className="p-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Icon name="user" size="sm" className="mr-2" />
                  Mi Perfil
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Icon name="badge" size="sm" className="mr-2" />
                  Mis Certificados
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Icon name="chart" size="sm" className="mr-2" />
                  Mi Progreso
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Icon name="settings" size="sm" className="mr-2" />
                  Configuración
                </Button>
                
                <hr className="my-2 border-border" />
                
                <Button variant="ghost" size="sm" className="w-full justify-start text-destructive">
                  <Icon name="logout" size="sm" className="mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    role: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  onSearch: PropTypes.func,
  onToggleTheme: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark']),
  notifications: PropTypes.arrayOf(PropTypes.object),
  showNotifications: PropTypes.bool,
  onToggleNotifications: PropTypes.func,
  showUserMenu: PropTypes.bool,
  onToggleUserMenu: PropTypes.func,
  className: PropTypes.string,
};

export default Header;