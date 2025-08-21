'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { cn } from '../../../utils/cn';
import { UserInfo, ProgressSection } from '../../molecules';
import { Button, Icon, Badge } from '../../atoms';

const Sidebar = ({
  user,
  currentPath = '/',
  progress = null,
  notifications = [],
  isCollapsed = false,
  onToggleCollapse,
  className,
  ...props
}) => {
  const navigationItems = [
    {
      title: 'Panel Principal',
      items: [
        { label: 'Dashboard', icon: 'chart', href: '/', badge: null },
        { label: 'Mis Módulos', icon: 'book', href: '/modules', badge: 'active' },
        { label: 'Mi Progreso', icon: 'star', href: '/progress', badge: null },
      ]
    },
    {
      title: 'Comunicación',
      items: [
        { label: 'Chat', icon: 'chat', href: '/chat', badge: '3' },
        { label: 'Notificaciones', icon: 'message', href: '/notifications', badge: notifications.filter(n => !n.read).length || null },
        { label: 'Foro', icon: 'users', href: '/forum', badge: null },
      ]
    },
    {
      title: 'Recursos',
      items: [
        { label: 'Biblioteca', icon: 'document', href: '/library', badge: null },
        { label: 'Certificados', icon: 'badge', href: '/certificates', badge: null },
        { label: 'Soporte', icon: 'question', href: '/support', badge: null },
      ]
    }
  ];

  const renderNavItem = (item) => {
    const isActive = currentPath === item.href;
    
    return (
      <Link key={item.href} href={item.href}>
        <div
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            isActive && 'bg-primary text-primary-foreground hover:bg-primary/90',
            isCollapsed && 'justify-center px-2'
          )}
        >
          <Icon 
            name={item.icon} 
            size="sm" 
            className={cn(
              isActive ? 'text-current' : 'text-muted-foreground',
              'flex-shrink-0'
            )}
          />
          
          {!isCollapsed && (
            <>
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {item.badge && (
                <Badge 
                  variant={item.badge === 'active' ? 'default' : 'secondary'}
                  className="h-5 text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </div>
      </Link>
    );
  };

  return (
    <aside 
      className={cn(
        'h-screen bg-card border-r border-border',
        'flex flex-col',
        'transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        'sticky top-0',
        className
      )}
      {...props}
    >
      {/* Header del sidebar */}
      <div className={cn(
        'p-4 border-b border-border',
        'flex items-center',
        isCollapsed && 'justify-center'
      )}>
        {!isCollapsed ? (
          <div className="flex items-center gap-3 flex-1">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <Icon name="lightning" size="sm" className="text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Empieza</span>
          </div>
        ) : (
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <Icon name="lightning" size="sm" className="text-primary-foreground" />
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          <Icon 
            name={isCollapsed ? 'chevronRight' : 'chevronLeft'} 
            size="sm" 
          />
        </Button>
      </div>

      {/* Información del usuario */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border">
          <UserInfo
            user={user}
            size="lg"
            layout="vertical"
            showStatus={true}
            status="online"
            clickable={true}
            onClick={(e, userData) => console.log('User clicked:', userData.name)}
          />
        </div>
      )}

      {/* Navegación */}
      <nav className="flex-1 p-3 space-y-6">
        {navigationItems.map((section) => (
          <div key={section.title}>
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-3">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map(renderNavItem)}
            </div>
          </div>
        ))}
      </nav>

      {/* Progreso del usuario */}
      {!isCollapsed && progress && (
        <div className="p-4 border-t border-border">
          <ProgressSection
            title="Mi Progreso General"
            progress={progress.value}
            currentLabel={progress.currentLabel}
            progressLabel={progress.progressLabel}
            size="sm"
          />
        </div>
      )}

      {/* Footer */}
      <div className={cn(
        'p-3 border-t border-border',
        'flex flex-col gap-2'
      )}>
        {!isCollapsed ? (
          <>
            <Button variant="ghost" size="sm" className="justify-start">
              <Icon name="settings" size="sm" className="mr-2" />
              Configuración
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <Icon name="question" size="sm" className="mr-2" />
              Ayuda
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" className="justify-center px-2">
              <Icon name="settings" size="sm" />
            </Button>
            <Button variant="ghost" size="sm" className="justify-center px-2">
              <Icon name="question" size="sm" />
            </Button>
          </>
        )}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    role: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  currentPath: PropTypes.string,
  progress: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currentLabel: PropTypes.string,
    progressLabel: PropTypes.string,
  }),
  notifications: PropTypes.arrayOf(PropTypes.object),
  isCollapsed: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
  className: PropTypes.string,
};

export default Sidebar;