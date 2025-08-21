# Sistema de Diseño Empieza

Sistema de componentes y diseño para el rediseño de la plataforma educativa Empieza, construido con Next.js, React y Tailwind CSS.

## Descripción del Proyecto

Este proyecto tiene como objetivo crear un sistema de diseño completo basado en los mockups y ejemplos de la carpeta `ejemplos_iniciales`. El sistema incluirá componentes atómicos, modulares y páginas completas que reflejan la identidad visual y funcional de Empieza.

## Características del Diseño

### Paleta de Colores
- **Primary**: `hsl(84, 55%, 40%)` - Verde oliva característico
- **Background**: Soporte para modo oscuro y claro
- **Border radius**: `0.75rem` para consistencia visual

### Componentes Identificados

#### Atómicos
- Botones (primario, secundario, destructivo)
- Inputs con iconos
- Badges/Pills de estado
- Avatares con iniciales
- Iconos SVG
- Progress bars
- Dropdowns/Tooltips

#### Modulares
- Sidebar de navegación
- Header con notificaciones y usuario
- Cards de módulos/cursos
- Chat de tutor virtual
- Notifications dropdown
- User menu dropdown

#### Páginas
- Dashboard principal de estudiante
- Vista de módulos de curso
- Sistema de notificaciones
- Perfiles de usuario

## Estructura del Proyecto

```
/
├── src/
│   ├── components/
│   │   ├── atoms/          # Componentes básicos reutilizables
│   │   ├── molecules/      # Combinaciones de átomos
│   │   └── organisms/      # Componentes complejos
│   ├── pages/              # Páginas de la aplicación
│   ├── styles/             # Configuración de Tailwind y CSS personalizado
│   └── utils/              # Funciones auxiliares
├── public/                 # Recursos estáticos
└── ejemplos_iniciales/     # Referencias de diseño
```

## Tecnologías

- **Next.js** - Framework React para desarrollo web
- **React 19** - Biblioteca de componentes
- **Tailwind CSS** - Framework de CSS utility-first
- **JavaScript ES6+** - Desarrollo moderno sin tipado estático
- **CSS Custom Properties** - Variables CSS para theming

## Getting Started

Instalar dependencias y ejecutar el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Características del Sistema

- **Dark/Light Mode**: Soporte completo para temas
- **Responsive Design**: Adaptable a diferentes dispositivos
- **Componentes Reutilizables**: Arquitectura modular
- **Animaciones Suaves**: Transiciones y efectos visuales
- **Accesibilidad**: Cumplimiento de estándares WCAG

## Inspiración de Diseño

Los diseños base se encuentran en la carpeta `ejemplos_iniciales/propuestas/` y incluyen:
- Dashboard con modo oscuro y claro
- Navegación lateral con progreso
- Sistema de módulos educativos
- Interfaz de chat con tutor virtual
- Notificaciones y menús desplegables
