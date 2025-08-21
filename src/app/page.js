'use client';

import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { Button, Icon, Badge } from '../components/atoms';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  const sections = [
    {
      title: 'Componentes Atómicos',
      description: 'Elementos básicos del sistema de diseño: colores, botones, inputs, selects, checkboxes, radios, switches, badges, avatares, iconos y barras de progreso.',
      href: '/atoms',
      icon: 'settings',
      badge: '13 componentes',
      color: 'bg-primary/5 border-primary/20 hover:bg-primary/10'
    },
    {
      title: 'Componentes Moleculares',
      description: 'Combinaciones de átomos para crear funcionalidades específicas: búsqueda, notificaciones, alertas, breadcrumbs, cards de módulos.',
      href: '/molecules',
      icon: 'users',
      badge: '9 componentes',
      color: 'bg-secondary/5 border-secondary/20 hover:bg-secondary/10'
    },
    {
      title: 'Componentes Organismos',
      description: 'Secciones completas que combinan múltiples moléculas: header, sidebar, chat widget, module grid.',
      href: '/organisms',
      icon: 'book',
      badge: '4 componentes',
      color: 'bg-accent/5 border-accent/20 hover:bg-accent/10'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-8 py-16">
        
        {/* Header */}
        <header className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-4">
            <img 
              src="https://doc-images-adl.s3-sa-east-1.amazonaws.com/logo.svg" 
              alt="Empieza" 
              className="h-16 w-auto"
            />
          </div>
          
          <h1 className="text-5xl font-bold text-foreground">
            Sistema de Diseño
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Biblioteca de componentes reutilizables basada en los diseños de referencia de la plataforma educativa Empieza.
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <Button 
              onClick={toggleTheme}
              variant="outline"
            >
              <Icon name="settings" size="sm" className="mr-2" />
              Tema {theme === 'dark' ? 'Claro' : 'Oscuro'}
            </Button>
            
            <a 
              href="https://github.com/tu-repo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <Icon name="star" size="sm" className="mr-2" />
              Ver en GitHub
            </a>
          </div>
        </header>

        {/* Navigation Cards */}
        <section className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`block p-6 rounded-xl border transition-all duration-200 hover-lift ${section.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon name={section.icon} size="lg" className="text-primary" />
                  </div>
                  <Badge variant="secondary" size="sm">
                    {section.badge}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {section.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {section.description}
                </p>
                
                <div className="flex items-center text-primary text-sm font-medium">
                  Ver componentes
                  <Icon name="chevronRight" size="sm" className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12">Características</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Icon name="badge" size="lg" className="text-primary" />
              </div>
              <h3 className="font-semibold">Diseño Consistente</h3>
              <p className="text-sm text-muted-foreground">
                Basado en los diseños originales de Empieza
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Icon name="settings" size="lg" className="text-primary" />
              </div>
              <h3 className="font-semibold">Modo Oscuro/Claro</h3>
              <p className="text-sm text-muted-foreground">
                Soporte completo para ambos temas
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Icon name="check" size="lg" className="text-primary" />
              </div>
              <h3 className="font-semibold">Accesible</h3>
              <p className="text-sm text-muted-foreground">
                Navegación por teclado y ARIA labels
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Icon name="lightning" size="lg" className="text-primary" />
              </div>
              <h3 className="font-semibold">Rápido</h3>
              <p className="text-sm text-muted-foreground">
                Optimizado para rendimiento
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-8">Tecnologías</h2>
          
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="star" size="sm" />
              <span className="text-sm">Next.js 15</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="star" size="sm" />
              <span className="text-sm">React 19</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="star" size="sm" />
              <span className="text-sm">Tailwind CSS 4</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="star" size="sm" />
              <span className="text-sm">JavaScript ES6+</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Sistema de Diseño Empieza • Tema actual: <strong>{theme}</strong>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Construido con ❤️ para la plataforma educativa Empieza
          </p>
        </footer>
      </div>
    </div>
  );
}
