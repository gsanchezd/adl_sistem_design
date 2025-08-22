'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Button, Icon, Badge } from '../../../components/atoms';
import { ModuleCard } from '../../../components/molecules';
import { CourseSidebar, AppHeader, TutorChat } from '../../../components/organisms';
import { useTheme } from '../../../contexts/ThemeContext';

// Mock data para el curso
const getCourseData = (id) => {
  const courses = {
    '1': {
      id: 1,
      title: 'PRUEBAS MEJORA CONTINUA',
      code: '[ADMIN] PreBootcamp',
      status: 'concluded',
      startDate: '2025-08-07',
      endDate: '2025-08-11',
      format: 'Formato de Matrícula',
      modules: [
        {
          id: 1,
          number: 1,
          title: 'Prepárate para este curso',
          status: 'optional',
          types: ['programa-academico'],
          links: {
            'programa-academico': '/cursos/1/seccion/1'
          }
        },
        {
          id: 2,
          number: 2,
          title: 'Evaluación Diagnóstico',
          status: 'completed',
          types: ['clase', 'tutoria'],
          links: {
            'clase': '/cursos/1/seccion/2',
            'tutoria': '/cursos/1/seccion/2?tipo=tutoria'
          }
        },
        {
          id: 3,
          number: 3,
          title: 'MÓDULO 1',
          status: 'completed',
          types: ['clase', 'tutoria'],
          links: {
            'clase': '/cursos/1/seccion/3',
            'tutoria': '/cursos/1/seccion/3?tipo=tutoria'
          }
        },
        {
          id: 4,
          number: 4,
          title: 'MÓDULO 2',
          status: 'active',
          types: ['clase', 'tutoria'],
          isActive: true,
          links: {
            'clase': '/cursos/1/seccion/4',
            'tutoria': '/cursos/1/seccion/4?tipo=tutoria'
          }
        },
        {
          id: 5,
          number: 5,
          title: 'Encuestas',
          status: 'blocked',
          types: ['clase', 'tutoria'],
          links: {
            'clase': '/cursos/1/seccion/5',
            'tutoria': '/cursos/1/seccion/5?tipo=tutoria'
          }
        },
        {
          id: 6,
          number: 6,
          title: 'MÓDULO 3',
          status: 'blocked',
          types: ['clase', 'tutoria'],
          links: {
            'clase': '/cursos/1/seccion/6',
            'tutoria': '/cursos/1/seccion/6?tipo=tutoria'
          }
        },
        {
          id: 7,
          number: 7,
          title: 'Evaluación Final',
          status: 'blocked',
          types: ['clase', 'tutoria'],
          links: {
            'clase': '/cursos/1/seccion/7',
            'tutoria': '/cursos/1/seccion/7?tipo=tutoria'
          }
        }
      ],
      progress: {
        current: 85,
        completed: 6,
        total: 7
      }
    }
  };
  
  return courses[id] || null;
};

export default function CursoPage({ params }) {
  const resolvedParams = use(params);
  const course = getCourseData(resolvedParams.id);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

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

  const handleModuleAccess = (moduleData, actionType = null) => {
    console.log('Accediendo al módulo:', moduleData, actionType);
    
    // Buscar el módulo completo en los datos
    const fullModule = course.modules.find(m => m.title === moduleData.title);
    
    if (fullModule && fullModule.links) {
      let targetUrl = null;
      
      if (actionType && fullModule.links[actionType]) {
        targetUrl = fullModule.links[actionType];
      } else if (fullModule.links['programa-academico']) {
        targetUrl = fullModule.links['programa-academico'];
      } else if (fullModule.links['clase']) {
        targetUrl = fullModule.links['clase'];
      }
      
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <CourseSidebar
            currentProgress={course.progress.current}
            completedSections={course.progress.completed}
            totalSections={course.progress.total}
            onTutorOpen={() => setIsTutorOpen(true)}
          />
        )}

        {/* Main Content */}
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
            {/* Breadcrumb */}
            <div className="bg-muted/30 border-b border-border px-6 py-3 -m-6 mb-6">
              <nav className="flex items-center space-x-2 text-sm">
                <Link href="/cursos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cursos
                </Link>
                <Icon name="chevron-right" size="sm" className="text-muted-foreground" />
                <span className="text-primary font-medium">Dashboard</span>
              </nav>
            </div>

          {/* Course Sections */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Secciones del Curso</h2>
              <p className="text-muted-foreground text-sm">Contenido organizado por unidades de aprendizaje</p>
            </div>

            {/* Module Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {course.modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  number={module.number}
                  title={module.title}
                  status={module.status}
                  types={module.types}
                  links={module.links}
                  active={module.isActive}
                  onAction={(e, data) => handleModuleAccess(data)}
                />
              ))}
            </div>
          </div>
          </main>
        </div>
      </div>

      {/* Tutor Chat */}
      <TutorChat
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
      />
    </div>
  );
}