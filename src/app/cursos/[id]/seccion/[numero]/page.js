'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Button, Icon } from '../../../../../components/atoms';
import { CourseSidebar, AppHeader, TutorChat } from '../../../../../components/organisms';
import { useTheme } from '../../../../../contexts/ThemeContext';

// Mock data para obtener información del curso y sección
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
      progress: {
        current: 85,
        completed: 6,
        total: 7
      }
    }
  };
  
  return courses[id] || null;
};

const getSectionData = (courseId, sectionNumber) => {
  const sections = {
    '1': {
      1: {
        title: 'Prepárate para este curso - Programa Académico',
        type: 'programa-academico',
        contentUrl: '/clase1.pdf',
        contentType: 'pdf'
      },
      2: {
        title: 'Evaluación Diagnóstico',
        type: 'clase',
        contentUrl: 'https://www.example.com/evaluacion-diagnostico',
        contentType: 'iframe'
      },
      3: {
        title: 'MÓDULO 1',
        type: 'clase',
        contentUrl: 'https://www.example.com/modulo-1',
        contentType: 'iframe'
      },
      4: {
        title: 'MÓDULO 2',
        type: 'clase',
        contentUrl: 'https://www.example.com/modulo-2',
        contentType: 'iframe'
      },
      5: {
        title: 'Encuestas',
        type: 'clase',
        contentUrl: 'https://www.example.com/encuestas',
        contentType: 'iframe'
      },
      6: {
        title: 'MÓDULO 3',
        type: 'tutoria',
        contentUrl: 'https://www.example.com/modulo-3',
        contentType: 'iframe'
      },
      7: {
        title: 'Evaluación Final',
        type: 'tutoria',
        contentUrl: 'https://www.example.com/evaluacion-final',
        contentType: 'iframe'
      }
    }
  };
  
  return sections[courseId]?.[sectionNumber] || null;
};

export default function SeccionPage({ params, searchParams }) {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  
  const course = getCourseData(resolvedParams.id);
  const section = getSectionData(resolvedParams.id, parseInt(resolvedParams.numero));
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  
  // Obtener el tipo de contenido desde los parámetros de búsqueda
  const contentType = resolvedSearchParams?.tipo || section?.type || 'clase';
  
  if (!course || !section) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Sección no encontrada</h1>
          <p className="text-muted-foreground mb-6">La sección que buscas no existe o no está disponible.</p>
          <Link href={`/cursos/${resolvedParams.id}`}>
            <Button>
              <Icon name="arrow-left" size="sm" className="mr-2" />
              Volver al Curso
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Determinar el título y URL del contenido basado en el tipo
  const getContentInfo = () => {
    let title = section.title;
    let contentUrl = section.contentUrl;
    let renderType = section.contentType || 'iframe';
    
    if (contentType === 'tutoria' && section.contentType === 'iframe') {
      title += ' - Tutoría';
      contentUrl += '?tipo=tutoria';
    } else if (contentType === 'programa' && section.contentType === 'iframe') {
      title += ' - Programa Académico';
      contentUrl += '?tipo=programa';
    }
    
    return { title, contentUrl, renderType };
  };

  const { title: sectionTitle, contentUrl, renderType } = getContentInfo();

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
            {/* Breadcrumb and back button */}
            <div className="bg-muted/30 border-b border-border px-6 py-3 -m-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link href={`/cursos/${course.id}`}>
                    <Button variant="ghost" size="sm">
                      <Icon name="arrow-left" size="sm" className="mr-2" />
                      Volver al Curso
                    </Button>
                  </Link>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">{sectionTitle}</h1>
                    <p className="text-sm text-muted-foreground">{course.title}</p>
                  </div>
                </div>
                
                {/* Content Type Badge */}
                <div className="flex items-center gap-2">
                  {contentType === 'programa-academico' && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      <Icon name="book" size="xs" />
                      Programa Académico
                    </div>
                  )}
                  {contentType === 'clase' && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-sm">
                      <Icon name="monitor" size="xs" />
                      Clase
                    </div>
                  )}
                  {contentType === 'tutoria' && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm">
                      <Icon name="users" size="xs" />
                      Tutoría
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Display */}
            <div className="flex-1 bg-white border border-border rounded-xl overflow-hidden">
            {renderType === 'pdf' ? (
              <div className="w-full h-full min-h-[600px] relative">
                {/* PDF display using iframe with viewer */}
                <iframe
                  src={`${contentUrl}#view=FitH&toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full border-0"
                  style={{ backgroundColor: 'white' }}
                  title={sectionTitle}
                  type="application/pdf"
                />
                
                {/* Fallback message and manual actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <a
                    href={contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    <Icon name="document" size="sm" />
                    Abrir en nueva pestaña
                  </a>
                  <a
                    href={contentUrl}
                    download
                    className="inline-flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/90 transition-colors shadow-lg"
                  >
                    <Icon name="arrow-right" size="sm" />
                    Descargar
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                src={contentUrl}
                className="w-full h-full min-h-[600px]"
                title={sectionTitle}
                frameBorder="0"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              />
            )}
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