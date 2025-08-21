'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms';

const Breadcrumbs = ({
  items = [],
  separator = 'chevronRight',
  className,
  ...props
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-1 text-sm', className)}
      {...props}
    >
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;
          
          return (
            <li key={index} className="flex items-center space-x-1">
              {/* Separador (excepto para el primer item) */}
              {!isFirst && (
                <Icon 
                  name={separator} 
                  size="sm" 
                  className="text-muted-foreground" 
                  aria-hidden="true"
                />
              )}
              
              {/* Item del breadcrumb */}
              {isLast || !item.href ? (
                // Último item o item sin link - no clickeable
                <span 
                  className={cn(
                    'font-medium',
                    isLast 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon && (
                    <Icon 
                      name={item.icon} 
                      size="sm" 
                      className="mr-1 inline" 
                    />
                  )}
                  {item.label}
                </span>
              ) : (
                // Item con link - clickeable
                <Link
                  href={item.href}
                  className={cn(
                    'font-medium text-muted-foreground hover:text-foreground transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-sm px-1'
                  )}
                >
                  {item.icon && (
                    <Icon 
                      name={item.icon} 
                      size="sm" 
                      className="mr-1 inline" 
                    />
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.string,
    })
  ).isRequired,
  separator: PropTypes.string,
  className: PropTypes.string,
};

export default Breadcrumbs;