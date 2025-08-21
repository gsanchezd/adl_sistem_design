'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Header,
  Sidebar, 
  ChatWidget, 
  ModuleGrid 
} from '../../components/organisms';
import { Button, Icon } from '../../components/atoms';

export default function OrganismsPage() {
  const { theme, toggleTheme } = useTheme();
  
  // Estados para los componentes interactivos
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null);

  // Datos de ejemplo
  const sampleUser = {
    name: 'Gonzalo Sánchez',
    email: 'gonzalo@empieza.cl',
    role: 'student',
    avatar: null
  };

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

  const sampleModules = [
    {
      number: 1,
      title: 'MÓDULO 1',
      description: 'Introducción a los conceptos fundamentales',
      status: 'completed',
      type: 'tutoring',
      progress: 100
    },
    {
      number: 2,
      title: 'MÓDULO 2',
      description: 'Metodologías de mejora continua',
      status: 'in-progress',
      type: 'tutoring',
      progress: 75,
      active: true
    },
    {
      number: 3,
      title: 'MÓDULO 3',
      description: 'Aplicación práctica',
      status: 'pending',
      type: 'tutoring'
    }
  ];

  const sampleChatMessages = [
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

  const userProgress = {
    title: 'Mi Progreso General',
    subtitle: 'Curso de Mejora Continua',
    progress: 67,
    maxProgress: 3,
    currentLabel: 'Módulo actual',
    progressLabel: '2 de 3 módulos completados'
  };

  const sidebarProgress = {
    value: 67,
    currentLabel: 'Progreso general',
    progressLabel: '2/3 módulos'
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Demostración del Sidebar */}
        <div className="flex-shrink-0">
          <Sidebar
            user={sampleUser}
            currentPath="/organisms"
            progress={sidebarProgress}
            notifications={sampleNotifications}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Contenido principal */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Header de la página */}
            <header className="text-center space-y-4">
              <Link href="/" className="inline-block">
                <Button variant="outline" size="sm">
                  <Icon name="chevronLeft" size="sm" className="mr-2" />
                  Volver al Índice
                </Button>
              </Link>
              
              <h1 className="text-4xl font-bold text-foreground">
                Componentes Organismos
              </h1>
              <p className="text-lg text-muted-foreground">
                Secciones completas que combinan múltiples moléculas para formar partes distintivas de la interfaz
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

            {/* Header Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Header</h2>
              <p className="text-muted-foreground">
                Cabecera principal de la aplicación con navegación, logo y perfil de usuario
              </p>
              
              <div className="border border-border rounded-xl p-6 bg-card">
                <h3 className="text-lg font-semibold mb-4">Header Completo</h3>
                <div className="bg-background border border-border rounded-lg overflow-hidden">
                  <Header
                    title="Mi Dashboard"
                    showMenuButton={true}
                    menuOpen={!sidebarCollapsed}
                    onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                    theme={theme}
                    onThemeToggle={toggleTheme}
                    user={sampleUser}
                  />
                </div>
              </div>
            </section>

            {/* ModuleGrid Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">ModuleGrid</h2>
              <p className="text-muted-foreground">
                Grid completo de módulos con búsqueda, filtros y estadísticas de progreso
              </p>
              
              <div className="border border-border rounded-xl p-6 bg-card">
                <ModuleGrid
                  modules={sampleModules}
                  onModuleClick={(module) => {
                    setSelectedModule(module.title);
                    console.log('Module clicked:', module);
                  }}
                  onModuleAction={(module) => {
                    console.log('Module action:', module);
                  }}
                  userProgress={userProgress}
                  showSearch={true}
                  showFilters={true}
                  showProgress={true}
                />
                
                {selectedModule && (
                  <div className="mt-4 p-3 bg-accent rounded-lg">
                    <p className="text-sm text-accent-foreground">
                      Último módulo seleccionado: <strong>{selectedModule}</strong>
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Información sobre organismos */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">¿Qué son los Organismos?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">Características</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="check" size="sm" className="text-primary mt-0.5 flex-shrink-0" />
                      Combinan múltiples moléculas y átomos
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" size="sm" className="text-primary mt-0.5 flex-shrink-0" />
                      Forman secciones completas de la interfaz
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" size="sm" className="text-primary mt-0.5 flex-shrink-0" />
                      Contexto específico y funcionalidad compleja
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" size="sm" className="text-primary mt-0.5 flex-shrink-0" />
                      Manejo de estado y lógica de negocio
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">Ejemplos</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="chevronRight" size="sm" className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <strong>Header:</strong> Logo + Navegación + Búsqueda + Usuario
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="chevronRight" size="sm" className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <strong>Sidebar:</strong> Navegación + Progreso + Usuario
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="chevronRight" size="sm" className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <strong>ModuleGrid:</strong> Búsqueda + Filtros + Grid + Stats
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="chevronRight" size="sm" className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <strong>ChatWidget:</strong> Mensajes + Input + Estados
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Controles de demostración */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Controles de Demostración</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="justify-start"
                >
                  <Icon name="chevronLeft" size="sm" className="mr-2" />
                  {sidebarCollapsed ? 'Expandir' : 'Colapsar'} Sidebar
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setHeaderNotifications(!headerNotifications)}
                  className="justify-start"
                >
                  <Icon name="message" size="sm" className="mr-2" />
                  Toggle Notificaciones
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setHeaderUserMenu(!headerUserMenu)}
                  className="justify-start"
                >
                  <Icon name="user" size="sm" className="mr-2" />
                  Toggle Menú Usuario
                </Button>
                
                <Button
                  variant="primary"
                  onClick={() => setChatMinimized(!chatMinimized)}
                  className="justify-start"
                >
                  <Icon name="chat" size="sm" className="mr-2" />
                  {chatMinimized ? 'Abrir' : 'Cerrar'} Chat
                </Button>
              </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-sm text-muted-foreground pt-12 border-t border-border">
              <p>Sistema de Diseño Empieza - Componentes Organismos</p>
              <p className="mt-2">
                Tema actual: <strong>{theme}</strong> • 
                Sidebar: <strong>{sidebarCollapsed ? 'Colapsado' : 'Expandido'}</strong> •
                Chat: <strong>{chatMinimized ? 'Minimizado' : 'Abierto'}</strong>
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
                <Link href="/molecules">
                  <Button variant="outline" size="sm">
                    Ver Moleculares
                  </Button>
                </Link>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* ChatWidget (flotante) */}
      <ChatWidget
        messages={sampleChatMessages}
        currentUser={sampleUser}
        onSendMessage={(message) => {
          console.log('New message:', message);
          // Aquí agregarías el mensaje al estado
        }}
        onRetryMessage={(message) => console.log('Retry message:', message)}
        isMinimized={chatMinimized}
        onToggleMinimize={() => setChatMinimized(!chatMinimized)}
        onClose={() => setChatMinimized(true)}
      />
    </div>
  );
}