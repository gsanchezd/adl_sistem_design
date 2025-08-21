import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { sizePropType } from '../../../utils/propTypes';

// Componente principal exportado
const TableComponent = ({
  children,
  size = 'md',
  striped = false,
  bordered = true,
  hoverable = true,
  className,
  ...props
}) => {
  return (
    <div className={cn(
      'rounded-lg overflow-hidden',
      bordered && 'border border-border',
      className
    )}>
      <table 
        className={cn(
          'w-full border-collapse',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base',
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            if (child.type === TableComponent.Header) {
              return React.cloneElement(child, { index });
            }
            return React.cloneElement(child, {
              striped,
              hoverable,
              index,
            });
          }
          return child;
        })}
      </table>
    </div>
  );
};

// Exportar componente principal y subcomponentes
TableComponent.Header = ({ children, className, ...props }) => (
  <thead className={cn('bg-muted/50', className)} {...props}>
    {children}
  </thead>
);

TableComponent.Body = ({ children, className, striped, hoverable, ...props }) => {
  const { striped: _striped, hoverable: _hoverable, ...cleanProps } = props;
  
  return (
    <tbody className={className} {...cleanProps}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === TableComponent.Row) {
          return React.cloneElement(child, { striped, hoverable, index });
        }
        return child;
      })}
    </tbody>
  );
};

TableComponent.Row = ({ children, className, striped, hoverable, index, ...props }) => {
  const { striped: _striped, hoverable: _hoverable, ...cleanProps } = props;
  
  return (
    <tr 
      className={cn(
        'border-b border-border last:border-b-0',
        hoverable && 'hover:bg-muted/20 transition-colors',
        striped && index % 2 === 1 && 'bg-muted/10',
        className
      )}
      {...cleanProps}
    >
      {children}
    </tr>
  );
};

TableComponent.HeaderCell = ({ children, className, ...props }) => (
  <th 
    className={cn(
      'px-4 py-3 text-left font-semibold text-foreground',
      'border-b border-border',
      className
    )}
    {...props}
  >
    {children}
  </th>
);

TableComponent.Cell = ({ children, className, ...props }) => (
  <td 
    className={cn(
      'px-4 py-3 text-foreground',
      className
    )}
    {...props}
  >
    {children}
  </td>
);

TableComponent.propTypes = {
  children: PropTypes.node.isRequired,
  size: sizePropType,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  hoverable: PropTypes.bool,
  className: PropTypes.string,
};

export default TableComponent;