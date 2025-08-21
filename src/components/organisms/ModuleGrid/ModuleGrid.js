'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { SearchInput, ModuleCard, ProgressSection } from '../../molecules';
import { Button, Icon, Badge } from '../../atoms';

const ModuleGrid = ({
  modules = [],
  onModuleClick,
  onModuleAction,
  showSearch = true,
  showFilters = true,
  showProgress = true,
  userProgress = null,
  className,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('number');

  // Filtros disponibles
  const filters = [
    { key: 'all', label: 'Todos', count: modules.length },
    { key: 'completed', label: 'Completados', count: modules.filter(m => m.status === 'completed').length },
    { key: 'in-progress', label: 'En Progreso', count: modules.filter(m => m.status === 'in-progress').length },
    { key: 'pending', label: 'Pendientes', count: modules.filter(m => m.status === 'pending').length },
    { key: 'blocked', label: 'Bloqueados', count: modules.filter(m => m.status === 'blocked').length },
  ];

  // Opciones de ordenamiento
  const sortOptions = [
    { key: 'number', label: 'Por Número' },
    { key: 'title', label: 'Por Título' },
    { key: 'progress', label: 'Por Progreso' },
    { key: 'status', label: 'Por Estado' },
  ];

  // Filtrar módulos
  const filteredModules = modules
    .filter(module => {
      // Filtro por búsqueda
      const matchesSearch = searchQuery === '' || 
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtro por estado
      const matchesFilter = selectedFilter === 'all' || module.status === selectedFilter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      // Ordenamiento
      switch (sortBy) {
        case 'number':
          return a.number - b.number;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        case 'status':
          const statusOrder = { 'in-progress': 0, 'pending': 1, 'completed': 2, 'blocked': 3, 'optional': 4 };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });

  // Estadísticas rápidas
  const stats = {
    total: modules.length,
    completed: modules.filter(m => m.status === 'completed').length,
    inProgress: modules.filter(m => m.status === 'in-progress').length,
    totalProgress: modules.reduce((acc, m) => acc + (m.progress || 0), 0) / modules.length,
  };

  return (
    <div className={cn('w-full space-y-6', className)} {...props}>
      {/* Header con progreso */}
      {showProgress && userProgress && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProgressSection
            title={userProgress.title}
            subtitle={userProgress.subtitle}
            progress={userProgress.progress}
            maxProgress={userProgress.maxProgress}
            currentLabel={userProgress.currentLabel}
            progressLabel={userProgress.progressLabel}
            size="lg"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completados</div>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground">En Progreso</div>
            </div>
          </div>
        </div>
      )}

      {/* Búsqueda y filtros */}
      {(showSearch || showFilters) && (
        <div className="space-y-4">
          {/* Búsqueda */}
          {showSearch && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <SearchInput
                  placeholder="Buscar módulos por título o descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onSearch={(value) => setSearchQuery(value)}
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-lg text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Filtros */}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <Button
                  key={filter.key}
                  variant={selectedFilter === filter.key ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.key)}
                  className="flex items-center gap-2"
                >
                  {filter.label}
                  <Badge 
                    variant={selectedFilter === filter.key ? 'secondary' : 'default'}
                    className="ml-1"
                  >
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Resultados */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Mostrando {filteredModules.length} de {modules.length} módulos
        </span>
        
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="text-xs"
          >
            <Icon name="close" size="sm" className="mr-1" />
            Limpiar búsqueda
          </Button>
        )}
      </div>

      {/* Grid de módulos */}
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredModules.map((module) => (
            <ModuleCard
              key={module.number}
              {...module}
              onClick={() => onModuleClick?.(module)}
              onAction={() => onModuleAction?.(module)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon 
            name={searchQuery ? 'search' : 'book'} 
            size="xl" 
            className="text-muted-foreground mb-4 opacity-50" 
          />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchQuery ? 'No se encontraron módulos' : 'No hay módulos disponibles'}
          </h3>
          <p className="text-muted-foreground max-w-md">
            {searchQuery 
              ? `No encontramos módulos que coincidan con "${searchQuery}". Intenta con otros términos.`
              : 'No hay módulos configurados en este momento.'
            }
          </p>
          
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery('')}
              className="mt-4"
            >
              Ver todos los módulos
            </Button>
          )}
        </div>
      )}

      {/* Footer con información adicional */}
      {filteredModules.length > 0 && (
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Progreso promedio: {Math.round(stats.totalProgress)}%</span>
              <span>•</span>
              <span>{stats.completed}/{stats.total} módulos completados</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Icon name="lightning" size="sm" />
              <span>¡Sigue así! Estás haciendo un gran progreso.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ModuleGrid.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['completed', 'in-progress', 'pending', 'blocked', 'optional']).isRequired,
    type: PropTypes.oneOf(['tutoring', 'self-learning']).isRequired,
    progress: PropTypes.number,
    active: PropTypes.bool,
  })),
  onModuleClick: PropTypes.func,
  onModuleAction: PropTypes.func,
  showSearch: PropTypes.bool,
  showFilters: PropTypes.bool,
  showProgress: PropTypes.bool,
  userProgress: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    progress: PropTypes.number.isRequired,
    maxProgress: PropTypes.number,
    currentLabel: PropTypes.string,
    progressLabel: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default ModuleGrid;