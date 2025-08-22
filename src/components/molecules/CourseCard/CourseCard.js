import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { Badge, Icon, Button } from '../../atoms';

const CourseCard = ({
  title,
  code,
  status = 'active',
  type = 'e-learning',
  startDate,
  endDate,
  hasMoreClasses = false,
  role = 'Estudiante',
  icon,
  className,
  onAccess,
  ...props
}) => {
  // Mapear estados a colores y textos
  const statusConfig = {
    'concluded': {
      badge: 'completed',
      text: 'Curso concluido',
      bgColor: 'bg-muted',
      textColor: 'text-muted-foreground',
      accessible: true
    },
    'active': {
      badge: 'in-progress', 
      text: 'Curso activo',
      bgColor: 'bg-primary',
      textColor: 'text-primary-foreground',
      accessible: true
    },
    'upcoming': {
      badge: 'pending',
      text: 'Próximamente',
      bgColor: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      accessible: false
    }
  };

  const currentStatus = statusConfig[status] || statusConfig.active;

  // Iconos por defecto según el tipo/código
  const getDefaultIcon = () => {
    if (icon) return icon;
    
    if (code?.includes('Data')) return 'chart';
    if (code?.includes('UX')) return 'design';
    if (code?.includes('LP4')) return 'code';
    if (code?.includes('PreBootcamp')) return 'book';
    
    return 'document';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const handleAccess = () => {
    if (currentStatus.accessible && onAccess) {
      onAccess({ title, code, status });
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden transition-all duration-200 flex flex-col h-full',
        'border border-border hover:border-primary/30 hover:shadow-md',
        'bg-card',
        !currentStatus.accessible && 'opacity-60',
        className
      )}
      {...props}
    >
      {/* Status banner - top of card */}
      <div className={cn(
        'w-full px-4 py-2 text-center text-sm font-medium',
        currentStatus.bgColor,
        currentStatus.textColor
      )}>
        {currentStatus.text}
      </div>

      {/* Dates section - right below banner */}
      {(startDate || endDate) && (
        <div className="px-4 py-2 bg-muted/30 border-b border-border text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-4">
            {startDate && (
              <div className="flex items-center gap-1">
                <Icon name="calendar" size="xs" />
                <span>{formatDate(startDate)}</span>
              </div>
            )}
            {startDate && endDate && <span>-</span>}
            {endDate && (
              <div className="flex items-center gap-1">
                <Icon name="calendar" size="xs" />
                <span>{formatDate(endDate)}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="p-6 text-foreground flex flex-col flex-grow">
        {/* Header with title */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-3">
            {title}
          </h3>
          {code && (
            <p className="text-muted-foreground text-sm font-medium">
              {code}
            </p>
          )}
        </div>

        {/* Course details - flex-grow to take available space */}
        <div className="space-y-2 mb-6 flex-grow">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="monitor" size="xs" />
            <span>{type === 'e-learning' ? 'e-Learning' : type}</span>
          </div>
        </div>

        {/* Access button - always at bottom */}
        <Button
          variant={currentStatus.accessible ? "secondary" : "ghost"}
          size="sm"
          onClick={handleAccess}
          disabled={!currentStatus.accessible}
          className="w-full justify-center mt-auto"
        >
          {currentStatus.accessible ? 'Acceder' : 'No disponible'}
        </Button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  code: PropTypes.string,
  status: PropTypes.oneOf(['concluded', 'active', 'upcoming']),
  type: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  hasMoreClasses: PropTypes.bool,
  role: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  onAccess: PropTypes.func,
};

export default CourseCard;