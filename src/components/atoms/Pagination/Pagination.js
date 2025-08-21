import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  size = 'md',
  className,
  ...props
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    }

    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  const sizes = {
    sm: 'text-xs',
    md: 'text-sm', 
    lg: 'text-base',
  };

  const buttonSizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={cn('flex items-center justify-center space-x-1', sizes[size], className)}
      role="navigation"
      aria-label="Pagination"
      {...props}
    >
      {/* First page */}
      {showFirstLast && currentPage > 1 && (
        <Button
          variant="ghost"
          size={buttonSizes[size]}
          onClick={() => handlePageChange(1)}
          aria-label="Ir a la primera página"
          className="hidden sm:flex"
        >
          <Icon name="arrow-left" size="sm" className="mr-1" />
          Primera
        </Button>
      )}

      {/* Previous page */}
      {showPrevNext && (
        <Button
          variant="ghost" 
          size={buttonSizes[size]}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <Icon name="arrow-left" size="sm" />
          <span className="hidden sm:ml-1 sm:inline">Anterior</span>
        </Button>
      )}

      {/* First page number if not visible */}
      {showStartEllipsis && (
        <>
          <Button
            variant="ghost"
            size={buttonSizes[size]}
            onClick={() => handlePageChange(1)}
            className="hidden sm:flex"
          >
            1
          </Button>
          <span className="px-2 text-muted-foreground hidden sm:inline">...</span>
        </>
      )}

      {/* Visible page numbers */}
      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'ghost'}
          size={buttonSizes[size]}
          onClick={() => handlePageChange(page)}
          aria-label={page === currentPage ? `Página actual, página ${page}` : `Ir a la página ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            'min-w-[40px]',
            page === currentPage && 'font-semibold'
          )}
        >
          {page}
        </Button>
      ))}

      {/* Last page number if not visible */}
      {showEndEllipsis && (
        <>
          <span className="px-2 text-muted-foreground hidden sm:inline">...</span>
          <Button
            variant="ghost"
            size={buttonSizes[size]}
            onClick={() => handlePageChange(totalPages)}
            className="hidden sm:flex"
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next page */}
      {showPrevNext && (
        <Button
          variant="ghost"
          size={buttonSizes[size]}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Página siguiente"
        >
          <span className="hidden sm:mr-1 sm:inline">Siguiente</span>
          <Icon name="arrow-right" size="sm" />
        </Button>
      )}

      {/* Last page */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant="ghost"
          size={buttonSizes[size]}
          onClick={() => handlePageChange(totalPages)}
          aria-label="Ir a la última página"
          className="hidden sm:flex"
        >
          Última
          <Icon name="arrow-right" size="sm" className="ml-1" />
        </Button>
      )}
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  showFirstLast: PropTypes.bool,
  showPrevNext: PropTypes.bool,
  maxVisiblePages: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Pagination;