import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { Button, Input, Switch } from '../../atoms';

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  onApplyFilters,
  className,
  ...props
}) => {
  const handleInputChange = (field, value) => {
    onFilterChange?.({ ...filters, [field]: value });
  };

  const handleSwitchChange = (field) => (event) => {
    onFilterChange?.({ ...filters, [field]: event.target.checked });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      career: '',
      senceCareerCode: '',
      senceModuleCode: '',
      generation: '',
      carrera: false,
      curso: false,
      taller: false,
      soloActivos: false,
    };
    onFilterChange?.(clearedFilters);
    onClearFilters?.(clearedFilters);
  };

  return (
    <div 
      className={cn(
        'bg-card border-r border-border p-6 space-y-6 overflow-y-auto',
        'w-80 flex-shrink-0',
        className
      )}
      {...props}
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Buscador Avanzado
        </h2>

        {/* Toggle filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="carrera-filter" className="text-sm font-medium text-foreground">
              Carrera
            </label>
            <Switch
              id="carrera-filter"
              checked={filters.carrera || false}
              onChange={handleSwitchChange('carrera')}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="curso-filter" className="text-sm font-medium text-foreground">
              Curso
            </label>
            <Switch
              id="curso-filter"
              checked={filters.curso || false}
              onChange={handleSwitchChange('curso')}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="taller-filter" className="text-sm font-medium text-foreground">
              Taller
            </label>
            <Switch
              id="taller-filter"
              checked={filters.taller || false}
              onChange={handleSwitchChange('taller')}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="solo-activos-filter" className="text-sm font-medium text-foreground">
              Solo activos
            </label>
            <Switch
              id="solo-activos-filter"
              checked={filters.soloActivos || false}
              onChange={handleSwitchChange('soloActivos')}
            />
          </div>
        </div>
      </div>

      {/* Search inputs */}
      <div className="space-y-4">
        <div>
          <label htmlFor="search-name" className="block text-sm font-medium text-foreground mb-2">
            Nombre
          </label>
          <Input
            id="search-name"
            placeholder="Buscar por nombre..."
            value={filters.search || ''}
            onChange={(e) => handleInputChange('search', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="search-career" className="block text-sm font-medium text-foreground mb-2">
            Carrera
          </label>
          <Input
            id="search-career"
            placeholder="Buscar por carrera"
            value={filters.career || ''}
            onChange={(e) => handleInputChange('career', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="sence-career-code" className="block text-sm font-medium text-foreground mb-2">
            Código SENCE carrera
          </label>
          <Input
            id="sence-career-code"
            placeholder="Buscar por código SENCE de carrera"
            value={filters.senceCareerCode || ''}
            onChange={(e) => handleInputChange('senceCareerCode', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="sence-module-code" className="block text-sm font-medium text-foreground mb-2">
            Código SENCE módulo
          </label>
          <Input
            id="sence-module-code"
            placeholder="Buscar por código SENCE de módulo"
            value={filters.senceModuleCode || ''}
            onChange={(e) => handleInputChange('senceModuleCode', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="generation" className="block text-sm font-medium text-foreground mb-2">
            Generación
          </label>
          <Input
            id="generation"
            placeholder="Buscar por generación..."
            value={filters.generation || ''}
            onChange={(e) => handleInputChange('generation', e.target.value)}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-3 pt-4 border-t border-border">
        <Button
          variant="secondary"
          size="sm"
          onClick={clearAllFilters}
          className="w-full"
        >
          Limpiar filtros
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onApplyFilters?.(filters)}
          className="w-full"
        >
          Filtrar
        </Button>
      </div>
    </div>
  );
};

FilterSidebar.propTypes = {
  filters: PropTypes.shape({
    search: PropTypes.string,
    career: PropTypes.string,
    senceCareerCode: PropTypes.string,
    senceModuleCode: PropTypes.string,
    generation: PropTypes.string,
    carrera: PropTypes.bool,
    curso: PropTypes.bool,
    taller: PropTypes.bool,
    soloActivos: PropTypes.bool,
  }),
  onFilterChange: PropTypes.func,
  onClearFilters: PropTypes.func,
  onApplyFilters: PropTypes.func,
  className: PropTypes.string,
};

FilterSidebar.defaultProps = {
  filters: {},
};

export default FilterSidebar;