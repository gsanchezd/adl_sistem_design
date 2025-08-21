import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { cn } from '../../../utils/cn';
import { Logo, Icon, Avatar } from '../../atoms';

const CourseHeader = ({
  title,
  startDate,
  endDate,
  format,
  user = {
    name: 'Gonzalo Sánchez',
    email: 'gonzalo@empieza.cl',
    avatar: null,
    role: 'Estudiante',
    notifications: 3
  },
  className,
  ...props
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={cn('bg-card/30 border-b border-border px-6 py-4', className)} {...props}>
      <div className="flex items-center justify-between relative">
        {/* Left section: Course info */}
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
            {startDate && endDate && (
              <>
                <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
                <span>•</span>
              </>
            )}
            {format && <span>{format}</span>}
          </div>
        </div>
        
        {/* Logo Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Logo
              width={120}
              height={40}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </div>
        
        {/* Right section: Notifications + User */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative group">
            <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
              <Icon name="message" size="md" className="text-muted-foreground" />
              {user.notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {user.notifications}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Notificaciones</h3>
                  <button className="text-xs text-primary hover:text-primary/80">
                    Marcar todas como leídas
                  </button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {/* Notification Items */}
                <div className="p-4 border-b border-border hover:bg-accent/50 transition-colors">
                  <div className="flex space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nueva actividad disponible</p>
                      <p className="text-xs text-muted-foreground">El módulo 3 ya está listo para comenzar</p>
                      <p className="text-xs text-muted-foreground mt-1">Hace 2 horas</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-b border-border hover:bg-accent/50 transition-colors">
                  <div className="flex space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Recordatorio de tarea</p>
                      <p className="text-xs text-muted-foreground">La evaluación del módulo 2 vence mañana</p>
                      <p className="text-xs text-muted-foreground mt-1">Hace 1 día</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex space-x-3">
                    <div className="h-2 w-2 bg-muted rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Mensaje del instructor</p>
                      <p className="text-xs text-muted-foreground">Nueva sesión de tutoría programada</p>
                      <p className="text-xs text-muted-foreground mt-1">Hace 3 días</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-t border-border">
                <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium">
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-3 hover:bg-accent rounded-lg p-2 transition-colors">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
              <Avatar
                src={user.avatar}
                name={user.name}
                size="sm"
                className="w-8 h-8"
              />
              <Icon name="chevron-down" size="sm" className="text-muted-foreground" />
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={user.avatar}
                    name={user.name}
                    size="lg"
                    className="w-12 h-12"
                  />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-1">
                      {user.role} Activo
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  <Icon name="user" size="sm" />
                  <span>Mi Perfil</span>
                </a>
                
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  <Icon name="badge" size="sm" />
                  <span>Mis Certificados</span>
                  <span className="ml-auto text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">3</span>
                </a>
                
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  <Icon name="chart" size="sm" />
                  <span>Mi Progreso</span>
                </a>
                
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  <Icon name="settings" size="sm" />
                  <span>Configuración</span>
                </a>
              </div>
              
              <div className="p-2 border-t border-border">
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  <Icon name="logout" size="sm" />
                  <span>Cerrar Sesión</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseHeader.propTypes = {
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  format: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    role: PropTypes.string,
    notifications: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default CourseHeader;