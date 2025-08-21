'use client';

import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button, Icon, Pagination } from '../../components/atoms';
import { CourseCard } from '../../components/molecules';
import { FilterSidebar, AppHeader } from '../../components/organisms';

const mockCourses = [
  {
    id: 1,
    title: '[ADMIN] PreBootcamp',
    code: '[ADMIN] PreBootcamp',
    status: 'concluded',
    type: 'e-Learning',
    role: 'Admin',
    startDate: '2021-08-03',
    endDate: '2021-08-03',
    hasMoreClasses: true,
    icon: 'book'
  },
  {
    id: 2,
    title: '[ADMIN] LP4 - Programación básica en Python - Data Science',
    code: '[ADMIN] LP4 - Data Science',
    status: 'concluded',
    type: 'e-Learning',
    role: 'Admin',
    startDate: '2022-01-02',
    endDate: '2022-01-09',
    hasMoreClasses: true,
    icon: 'code'
  },
  {
    id: 3,
    title: '[ADMIN] Data Analysis asincrónico',
    code: '[ADMIN] Data Analysis asincrónico',
    status: 'concluded',
    type: 'e-Learning',
    role: 'Admin',
    endDate: '2022-01-06',
    hasMoreClasses: true,
    icon: 'chart'
  },
  {
    id: 4,
    title: '[ADMIN] Data Studio',
    code: '[ADMIN] Data Studio',
    status: 'concluded',
    type: 'Inmerso',
    role: 'Admin',
    startDate: '2022-01-10',
    endDate: '2022-01-15',
    icon: 'chart'
  },
  {
    id: 5,
    title: '[ADMIN] LP4 - Diseño UX - Diseño UX/UI',
    code: 'Diseño UX/UI',
    status: 'concluded',
    type: 'e-Learning',
    role: 'Admin',
    startDate: '2022-02-06',
    endDate: '2022-02-17',
    hasMoreClasses: true,
    icon: 'design'
  },
  {
    id: 6,
    title: '[ADMIN] LP4 - Fundamentos Desarrollo Web - Diseño UX/UI',
    code: 'Diseño UX/UI',
    status: 'concluded',
    type: 'e-Learning',
    role: 'Admin',
    startDate: '2022-02-14',
    endDate: '2022-03-17',
    hasMoreClasses: true,
    icon: 'code'
  }
];

export default function CursosPage() {
  const { theme, toggleTheme } = useTheme();
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);
  const [filters, setFilters] = useState({
    search: '',
    career: '',
    senceCareerCode: '',
    senceModuleCode: '',
    generation: '',
    carrera: false,
    curso: false,
    taller: false,
    soloActivos: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let filtered = mockCourses;

    // Filter by search term
    if (currentFilters.search) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
        course.code?.toLowerCase().includes(currentFilters.search.toLowerCase())
      );
    }

    // Filter by status if "solo activos" is enabled
    if (currentFilters.soloActivos) {
      filtered = filtered.filter(course => course.status === 'active');
    }

    // Additional filters can be added here based on the other filter options
    // For now, we'll keep it simple with search and active status

    setFilteredCourses(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleCourseAccess = (courseData) => {
    // Navigate to course detail page
    window.location.href = `/cursos/${courseData.id}`;
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Filter Sidebar */}
        {sidebarOpen && (
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleFilterChange}
            onApplyFilters={applyFilters}
          />
        )}

        {/* Main content */}
        <div className="flex-1 min-h-screen">
          <AppHeader
            title="Mis Cursos_"
            showMenuButton={true}
            menuOpen={sidebarOpen}
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            theme={theme}
            onThemeToggle={toggleTheme}
            user={{
              name: 'Gonzalo',
              avatar: null,
              notifications: 999
            }}
          />

          {/* Course content */}
          <main className="p-6 space-y-6">
            {/* Course Listing Section */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Mis Cursos</h2>
                <p className="text-muted-foreground text-sm">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, filteredCourses.length)} de {filteredCourses.length} cursos disponibles
                </p>
              </div>
              
              {filteredCourses.length === 0 && filters.search && (
                <div className="text-center py-12">
                  <Icon name="search" size="xl" className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No se encontraron cursos
                  </h3>
                  <p className="text-muted-foreground">
                    Intenta con otros términos de búsqueda o ajusta los filtros.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    code={course.code}
                    status={course.status}
                    type={course.type}
                    startDate={course.startDate}
                    endDate={course.endDate}
                    hasMoreClasses={course.hasMoreClasses}
                    role={course.role}
                    icon={course.icon}
                    onAccess={() => handleCourseAccess(course)}
                  />
                ))}
              </div>
            </div>

            {/* Pagination - Demo */}
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={3}
                totalPages={10}
                onPageChange={() => {}}
                showFirstLast={true}
                showPrevNext={true}
                maxVisiblePages={5}
              />
            </div>

            {/* Empty state when no filters applied */}
            {filteredCourses.length === 0 && !filters.search && (
              <div className="text-center py-12">
                <Icon name="book" size="xl" className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No hay cursos disponibles
                </h3>
                <p className="text-muted-foreground">
                  Los cursos aparecerán aquí cuando estén disponibles.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}