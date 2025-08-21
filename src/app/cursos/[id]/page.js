'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button, Icon, Badge } from '../../../components/atoms';
import { AppHeader } from '../../../components/organisms';

// Mock data para el curso
const getCourseData = (id) => {
  const courses = {
    '1': {
      id: 1,
      title: '[ADMIN] PreBootcamp',
      code: '[ADMIN] PreBootcamp',
      status: 'concluded',
      type: 'e-Learning',
      role: 'Admin',
      startDate: '2021-08-03',
      endDate: '2021-08-03',
      description: 'Curso de preparación para el bootcamp. Incluye conceptos básicos de programación, metodologías ágiles y herramientas de desarrollo.',
      instructor: 'Equipo Empieza',
      duration: '40 horas',
      level: 'Principiante',
      modules: [
        {
          id: 1,
          title: 'Introducción a la Programación',
          status: 'completed',
          lessons: 8,
          duration: '2 horas'
        },
        {
          id: 2,
          title: 'Herramientas de Desarrollo',
          status: 'completed',
          lessons: 6,
          duration: '1.5 horas'
        },
        {
          id: 3,
          title: 'Metodologías Ágiles',
          status: 'completed',
          lessons: 5,
          duration: '1 hora'
        }
      ],
      stats: {
        progress: 100,
        completedLessons: 19,
        totalLessons: 19,
        timeSpent: '4.5 horas'
      }
    }
  };
  
  return courses[id] || null;
};

export default function CursoPage({ params }) {
  const { theme, toggleTheme } = useTheme();
  const resolvedParams = use(params);
  const course = getCourseData(resolvedParams.id);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Curso no encontrado</h1>
          <p className="text-muted-foreground mb-6">El curso que buscas no existe o ha sido removido.</p>
          <Link href="/cursos">
            <Button>
              <Icon name="arrow-left" size="sm" className="mr-2" />
              Volver a Cursos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = {
    'concluded': {
      badge: 'completed',
      text: 'Curso concluido',
      color: 'text-green-600'
    },
    'active': {
      badge: 'in-progress',
      text: 'Curso activo',
      color: 'text-blue-600'
    },
    'upcoming': {
      badge: 'pending',
      text: 'Próximamente',
      color: 'text-gray-600'
    }
  };

  const currentStatus = statusConfig[course.status] || statusConfig.active;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader
        title="Detalle del Curso"
        showMenuButton={false}
        theme={theme}
        onThemeToggle={toggleTheme}
        user={{
          name: 'Gonzalo',
          avatar: null,
          notifications: 999
        }}
      />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/cursos" className="hover:text-foreground">
            Mis Cursos
          </Link>
          <Icon name="chevronRight" size="xs" />
          <span className="text-foreground">{course.title}</span>
        </nav>

        {/* Course Header */}
        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge status={currentStatus.badge} size="sm">
                  {currentStatus.text}
                </Badge>
                <span className="text-sm text-muted-foreground">{course.type}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {course.title}
              </h1>
              
              <p className="text-muted-foreground text-lg mb-4">
                {course.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Instructor:</span>
                  <p className="font-medium text-foreground">{course.instructor}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Duración:</span>
                  <p className="font-medium text-foreground">{course.duration}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Nivel:</span>
                  <p className="font-medium text-foreground">{course.level}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Rol:</span>
                  <p className="font-medium text-foreground">{course.role}</p>
                </div>
              </div>
            </div>

            <div className="ml-8">
              <div className="w-32 h-32 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="book" size="xl" className="text-primary" />
              </div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{course.stats.progress}%</div>
              <div className="text-sm text-muted-foreground">Progreso</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {course.stats.completedLessons}/{course.stats.totalLessons}
              </div>
              <div className="text-sm text-muted-foreground">Lecciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{course.stats.timeSpent}</div>
              <div className="text-sm text-muted-foreground">Tiempo invertido</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{course.modules.length}</div>
              <div className="text-sm text-muted-foreground">Módulos</div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-6">Contenido del Curso</h2>
            
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div key={module.id} className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-muted-foreground">Módulo {index + 1}</span>
                        <Badge 
                          status={module.status} 
                          size="sm"
                        >
                          {module.status === 'completed' ? 'Completado' : 'En progreso'}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2">
                        {module.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="book" size="xs" />
                          {module.lessons} lecciones
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="clock" size="xs" />
                          {module.duration}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      variant={module.status === 'completed' ? 'outline' : 'default'}
                      size="sm"
                    >
                      {module.status === 'completed' ? 'Revisar' : 'Continuar'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-6">
              <h3 className="font-semibold text-foreground mb-4">Información del Curso</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Fecha de inicio:</span>
                  <p className="font-medium text-foreground">{new Date(course.startDate).toLocaleDateString('es-ES')}</p>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Fecha de término:</span>
                  <p className="font-medium text-foreground">{new Date(course.endDate).toLocaleDateString('es-ES')}</p>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Código del curso:</span>
                  <p className="font-medium text-foreground">{course.code}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Button className="w-full mb-3">
                  <Icon name="play" size="sm" className="mr-2" />
                  Continuar Curso
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Icon name="download" size="sm" className="mr-2" />
                  Descargar Certificado
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/cursos">
            <Button variant="outline">
              <Icon name="arrow-left" size="sm" className="mr-2" />
              Volver a Mis Cursos
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}