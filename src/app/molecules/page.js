'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  SearchInput, 
  NotificationItem, 
  UserInfo, 
  ModuleCard, 
  ChatMessage, 
  DropdownItem, 
  ProgressSection,
  Alert,
  Breadcrumbs 
} from '../../components/molecules';
import { Button, Icon } from '../../components/atoms';

export default function MoleculesPage() {
  const { theme, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);

  // Datos de ejemplo
  const sampleNotifications = [
    {
      id: '1',
      title: 'Nueva actividad disponible',
      message: 'El módulo 3 ya está listo para comenzar',
      timestamp: 'Hace 2 horas',
      read: false,
      type: 'info'
    },
    {
      id: '2',
      title: 'Recordatorio de tarea',
      message: 'La evaluación del módulo 2 vence mañana',
      timestamp: 'Hace 1 día',
      read: false,
      type: 'warning'
    },
    {
      id: '3',
      title: 'Mensaje del instructor',
      message: 'Nueva sesión de tutoría programada',
      timestamp: 'Hace 3 días',
      read: true,
      type: 'success'
    }
  ];

  const sampleUsers = [
    {
      name: 'Gonzalo Sánchez',
      email: 'gonzalo@empieza.cl',
      role: 'student',
      avatar: null
    },
    {
      name: 'María García',
      email: 'maria@empieza.cl',
      role: 'teacher',
      avatar: null
    },
    {
      name: 'Juan Pérez',
      email: 'juan@empieza.cl',
      role: 'admin',
      avatar: null
    }
  ];

  const sampleModules = [
    {
      number: 1,
      title: 'Prepárate para este curso',
      description: 'Recursos iniciales y preparación',
      status: 'optional',
      type: 'self-learning'
    },
    {
      number: 2,
      title: 'Evaluación Diagnóstico',
      description: 'Evaluación inicial de conocimientos',
      status: 'completed',
      type: 'tutoring',
      progress: 100
    },
    {
      number: 3,
      title: 'MÓDULO 1',
      description: 'Introducción a los conceptos fundamentales',
      status: 'completed',
      type: 'tutoring',
      progress: 100
    },
    {
      number: 4,
      title: 'MÓDULO 2',
      description: 'Metodologías de mejora continua',
      status: 'in-progress',
      type: 'tutoring',
      progress: 75,
      active: true
    },
    {
      number: 5,
      title: 'Encuestas',
      description: 'Evaluación del progreso',
      status: 'blocked',
      type: 'self-learning'
    }
  ];

  const sampleMessages = [
    {
      message: '¡Hola! Soy tu tutor virtual. ¿En qué puedo ayudarte hoy?',
      timestamp: '10:30',
      sender: 'tutor',
      senderName: 'Tutor Virtual'
    },
    {
      message: 'Tengo dudas sobre el módulo 2',
      timestamp: '10:32',
      sender: 'user',
      senderName: 'Gonzalo',
      isOwn: true
    },
    {
      message: 'Perfecto. El módulo 2 trata sobre metodologías de mejora continua. ¿Hay algún concepto específico que te gustaría repasar?',
      timestamp: '10:33',
      sender: 'tutor',
      senderName: 'Tutor Virtual'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <Button variant="outline" size="sm">
              <Icon name="chevronLeft" size="sm" className="mr-2" />
              Volver al Índice
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-foreground">
            Componentes Moleculares
          </h1>
          <p className="text-lg text-muted-foreground">
            Combinaciones de componentes atómicos para crear funcionalidades específicas
          </p>
          
          <Button 
            onClick={toggleTheme}
            variant="outline"
            className="mt-4"
          >
            <Icon name="settings" size="sm" className="mr-2" />
            Cambiar a tema {theme === 'dark' ? 'claro' : 'oscuro'}
          </Button>
        </header>

        {/* SearchInput Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">SearchInput</h2>
          <p className="text-muted-foreground">Input de búsqueda con funcionalidades avanzadas</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <SearchInput
              placeholder="Buscar contenido..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={(value) => alert(`Buscando: ${value}`)}
            />
            
            <SearchInput
              placeholder="Búsqueda rápida"
              size="sm"
              showClearButton={false}
            />
          </div>
          
          {searchValue && (
            <p className="text-sm text-muted-foreground">
              Valor actual: <strong>&quot;{searchValue}&quot;</strong>
            </p>
          )}
        </section>

        {/* NotificationItem Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">NotificationItem</h2>
          <p className="text-muted-foreground">Items individuales de notificación con estados</p>
          
          <div className="max-w-md space-y-0 border border-border rounded-xl overflow-hidden">
            {sampleNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
                onClick={() => alert(`Clicked: ${notification.title}`)}
                onMarkAsRead={() => alert(`Marcada como leída: ${notification.title}`)}
              />
            ))}
          </div>
        </section>

        {/* UserInfo Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">UserInfo</h2>
          <p className="text-muted-foreground">Información de usuario con avatar y detalles</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleUsers.map((user, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <UserInfo
                  user={user}
                  size="lg"
                  showStatus={true}
                  status={index === 0 ? 'online' : index === 1 ? 'busy' : 'away'}
                  clickable={true}
                  onClick={(e, userData) => alert(`Clicked user: ${userData.name}`)}
                />
              </div>
            ))}
          </div>
          
          {/* Layout vertical */}
          <div className="flex justify-center">
            <UserInfo
              user={sampleUsers[0]}
              layout="vertical"
              size="xl"
              showStatus={true}
              status="online"
            />
          </div>
        </section>

        {/* ModuleCard Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">ModuleCard</h2>
          <p className="text-muted-foreground">Cards de módulos educativos con estados y progreso</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleModules.map((module, index) => (
              <ModuleCard
                key={index}
                {...module}
                onClick={() => setSelectedModule(module.title)}
                onAction={() => alert(`Acción en: ${module.title}`)}
              />
            ))}
          </div>
          
          {selectedModule && (
            <p className="text-sm text-muted-foreground">
              Último módulo seleccionado: <strong>{selectedModule}</strong>
            </p>
          )}
        </section>

        {/* ChatMessage Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">ChatMessage</h2>
          <p className="text-muted-foreground">Mensajes de chat con diferentes remitentes</p>
          
          <div className="max-w-md mx-auto space-y-4 p-4 bg-card rounded-xl">
            {sampleMessages.map((message, index) => (
              <ChatMessage
                key={index}
                {...message}
                onRetry={() => alert('Reintentando envío...')}
              />
            ))}
          </div>
        </section>

        {/* ProgressSection Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">ProgressSection</h2>
          <p className="text-muted-foreground">Sección de progreso con título y descripción</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <ProgressSection
              title="Mi Progreso"
              progress={85}
              maxProgress={7}
              currentLabel="Curso actual"
              progressLabel="6 de 7 secciones completadas"
            />
            
            <ProgressSection
              title="Progreso del Módulo"
              subtitle="Módulo 2: Metodologías"
              progress={75}
              currentLabel="Actividades completadas"
              size="lg"
            />
          </div>
        </section>

        {/* DropdownItem Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">DropdownItem</h2>
          <p className="text-muted-foreground">Items de menú desplegable con iconos y badges</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Menu de usuario */}
            <div className="space-y-2 p-4 bg-card border border-border rounded-xl">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Menú de Usuario</h3>
              
              <DropdownItem leftIcon="user" onClick={() => alert('Mi Perfil')}>
                Mi Perfil
              </DropdownItem>
              
              <DropdownItem leftIcon="badge" badge="3" onClick={() => alert('Certificados')}>
                Mis Certificados
              </DropdownItem>
              
              <DropdownItem leftIcon="chart" onClick={() => alert('Progreso')}>
                Mi Progreso
              </DropdownItem>
              
              <DropdownItem leftIcon="settings" onClick={() => alert('Configuración')}>
                Configuración
              </DropdownItem>
              
              <hr className="my-2 border-border" />
              
              <DropdownItem leftIcon="logout" danger onClick={() => alert('Cerrar Sesión')}>
                Cerrar Sesión
              </DropdownItem>
            </div>
            
            {/* Menu de recursos */}
            <div className="space-y-2 p-4 bg-card border border-border rounded-xl">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Recursos</h3>
              
              <DropdownItem leftIcon="document" rightIcon="chevronRight">
                Reportes
              </DropdownItem>
              
              <DropdownItem leftIcon="message" rightIcon="chevronRight">
                Feedback
              </DropdownItem>
              
              <DropdownItem leftIcon="question" rightIcon="chevronRight">
                Preguntas Frecuentes
              </DropdownItem>
              
              <DropdownItem leftIcon="heart" rightIcon="chevronRight">
                Favoritos
              </DropdownItem>
              
              <DropdownItem leftIcon="users" rightIcon="chevronRight" active>
                Staff
              </DropdownItem>
            </div>
          </div>
        </section>

        {/* Alert Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Alert</h2>
          <p className="text-muted-foreground">Alertas con diferentes variantes y funcionalidad de cierre</p>
          
          <div className="space-y-4 max-w-2xl">
            {/* Alertas básicas */}
            <Alert variant="info" title="Información importante">
              Este es un mensaje informativo que proporciona contexto adicional al usuario.
            </Alert>
            
            <Alert variant="success" title="¡Éxito!" dismissible>
              Tu progreso ha sido guardado correctamente. Puedes continuar con el siguiente módulo.
            </Alert>
            
            <Alert variant="warning" title="Atención requerida">
              La fecha límite para esta evaluación es mañana. Asegúrate de completarla a tiempo.
            </Alert>
            
            <Alert variant="error" title="Error en la conexión" dismissible>
              No se pudo cargar el contenido. Verifica tu conexión a internet e intenta nuevamente.
            </Alert>
            
            <Alert variant="default">
              Esta es una alerta básica sin título específico. Útil para mensajes generales.
            </Alert>

            {/* Alertas con contenido más complejo */}
            <Alert variant="info" title="Nuevo curso disponible" dismissible>
              <div className="space-y-2">
                <p>Se ha agregado un nuevo módulo a tu plan de estudios:</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Módulo 4: Técnicas Avanzadas</li>
                  <li>Duración estimada: 2 horas</li>
                  <li>Incluye evaluación final</li>
                </ul>
                <p className="text-sm mt-2">
                  <strong>Disponible desde:</strong> Hoy a las 14:00 hrs
                </p>
              </div>
            </Alert>
            
            <Alert variant="warning" title="Sesión por expirar">
              <div className="flex items-center justify-between">
                <span>Tu sesión expirará en 5 minutos por inactividad.</span>
                <Button size="sm" variant="outline" className="ml-4">
                  Extender sesión
                </Button>
              </div>
            </Alert>
          </div>
        </section>

        {/* Breadcrumbs Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Breadcrumbs</h2>
          <p className="text-muted-foreground">Navegación jerárquica que muestra la ubicación actual del usuario</p>
          
          <div className="space-y-6 max-w-4xl">
            {/* Breadcrumbs básico */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Navegación básica</p>
              <div className="p-4 bg-card border border-border rounded-lg">
                <Breadcrumbs
                  items={[
                    { label: 'Inicio', href: '/' },
                    { label: 'Cursos', href: '/courses' },
                    { label: 'Módulo 2', href: '/courses/module-2' },
                    { label: 'Evaluación Final' }
                  ]}
                />
              </div>
            </div>

            {/* Breadcrumbs con iconos */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Con iconos</p>
              <div className="p-4 bg-card border border-border rounded-lg">
                <Breadcrumbs
                  items={[
                    { label: 'Dashboard', href: '/', icon: 'chart' },
                    { label: 'Mi Progreso', href: '/progress', icon: 'star' },
                    { label: 'Certificados', href: '/certificates', icon: 'badge' },
                    { label: 'Certificado de Completado', icon: 'document' }
                  ]}
                />
              </div>
            </div>

            {/* Diferentes separadores */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Diferentes separadores</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Separador por defecto</p>
                  <Breadcrumbs
                    items={[
                      { label: 'Biblioteca', href: '/library' },
                      { label: 'Documentos', href: '/library/docs' },
                      { label: 'Manual de Usuario' }
                    ]}
                  />
                </div>
                
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Separador chevronDown</p>
                  <Breadcrumbs
                    separator="chevronDown"
                    items={[
                      { label: 'Configuración', href: '/settings' },
                      { label: 'Perfil', href: '/settings/profile' },
                      { label: 'Notificaciones' }
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Breadcrumbs largo */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Navegación con muchos niveles</p>
              <div className="p-4 bg-card border border-border rounded-lg">
                <Breadcrumbs
                  items={[
                    { label: 'Inicio', href: '/', icon: 'chart' },
                    { label: 'Cursos', href: '/courses', icon: 'book' },
                    { label: 'Mejora Continua', href: '/courses/mejora-continua' },
                    { label: 'Módulo 3', href: '/courses/mejora-continua/module-3' },
                    { label: 'Lección 2', href: '/courses/mejora-continua/module-3/lesson-2' },
                    { label: 'Ejercicio Práctico', href: '/courses/mejora-continua/module-3/lesson-2/exercise' },
                    { label: 'Resultados' }
                  ]}
                />
              </div>
            </div>

            {/* Casos de uso comunes */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Casos de uso en la plataforma</p>
              
              <div className="space-y-3">
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Navegación del estudiante</p>
                  <Breadcrumbs
                    items={[
                      { label: 'Mi Dashboard', href: '/dashboard', icon: 'user' },
                      { label: 'Mis Cursos', href: '/my-courses' },
                      { label: 'Curso Actual' }
                    ]}
                  />
                </div>
                
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Panel del instructor</p>
                  <Breadcrumbs
                    items={[
                      { label: 'Panel Instructor', href: '/instructor', icon: 'users' },
                      { label: 'Gestión de Cursos', href: '/instructor/courses' },
                      { label: 'Evaluaciones', href: '/instructor/courses/evaluations' },
                      { label: 'Crear Nueva Evaluación' }
                    ]}
                  />
                </div>
                
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Administración</p>
                  <Breadcrumbs
                    items={[
                      { label: 'Admin', href: '/admin', icon: 'settings' },
                      { label: 'Usuarios', href: '/admin/users' },
                      { label: 'Gestión de Roles', href: '/admin/users/roles' },
                      { label: 'Editar Permisos' }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-12 border-t border-border">
          <p>Sistema de Diseño Empieza - Componentes Moleculares</p>
          <p className="mt-2">
            Tema actual: <strong>{theme}</strong> • 
            Valor de búsqueda: <strong>&quot;{searchValue}&quot;</strong>
          </p>
          <div className="mt-4 space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                ← Índice
              </Button>
            </Link>
            <Link href="/atoms">
              <Button variant="outline" size="sm">
                Ver Atómicos
              </Button>
            </Link>
            <Link href="/organisms">
              <Button variant="primary" size="sm">
                Ver Organismos →
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}