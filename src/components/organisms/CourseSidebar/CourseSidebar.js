import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms';

const CourseSidebar = ({
  currentProgress = 85,
  completedSections = 6,
  totalSections = 7,
  onTutorOpen,
  className,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const resources = [
    { id: 1, name: 'Reportes', icon: 'document', href: '#' },
    { id: 2, name: 'Feedback', icon: 'inbox', href: '#' },
    { id: 3, name: 'Preguntas Frecuentes', icon: 'help', href: '#' },
    { id: 4, name: 'Resumen Académico', icon: 'user', href: '#' },
    { id: 5, name: 'Apuntes', icon: 'edit', href: '#' },
    { id: 6, name: 'Favoritos', icon: 'heart', href: '#' },
    { id: 7, name: 'Staff', icon: 'users', href: '#' },
  ];

  return (
    <div className={cn('w-64 bg-card/50 border-r border-border', className)} {...props}>
      <div className="p-6">
        {/* Search */}
        <div className="mb-6 px-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="search" size="sm" className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Buscar contenido..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-accent/40 border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            />
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-6 px-3">
          <div className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-widest mb-3">
            Mi Progreso
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Curso actual</span>
            <span className="text-sm font-bold text-primary">{currentProgress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500" 
              style={{ width: `${currentProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {completedSections} de {totalSections} secciones completadas
          </p>
        </div>

        {/* Resources Section */}
        <div>
          <div className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-widest mb-3 px-3">
            Recursos
          </div>
          
          <nav className="space-y-1">
            {resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-accent/60 transition-colors"
              >
                <Icon name={resource.icon} size="sm" />
                <span className="text-sm">{resource.name}</span>
              </a>
            ))}
            
            <button
              onClick={onTutorOpen}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-accent/60 transition-colors w-full text-left"
            >
              <Icon name="message" size="sm" />
              <span className="text-sm">Tutor Virtual</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

CourseSidebar.propTypes = {
  currentProgress: PropTypes.number,
  completedSections: PropTypes.number,
  totalSections: PropTypes.number,
  onTutorOpen: PropTypes.func,
  className: PropTypes.string,
};

export default CourseSidebar;