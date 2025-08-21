// Design Tokens del Sistema de Diseño Empieza
// Basado en los ejemplos de propuesta.html y propuesta_light.html

export const colors = {
  // Colores primarios - Verde Empieza
  primary: {
    50: 'hsl(84, 55%, 95%)',
    100: 'hsl(84, 55%, 90%)',
    200: 'hsl(84, 55%, 80%)',
    300: 'hsl(84, 55%, 70%)',
    400: 'hsl(84, 55%, 60%)',
    500: 'hsl(84, 55%, 40%)', // Color principal
    600: 'hsl(84, 55%, 35%)',
    700: 'hsl(84, 55%, 30%)',
    800: 'hsl(84, 55%, 25%)',
    900: 'hsl(84, 55%, 15%)',
  },
  
  // Colores de estado
  success: 'hsl(120, 100%, 25%)',
  warning: 'hsl(45, 100%, 50%)',
  error: 'hsl(0, 84%, 60%)',
  info: 'hsl(210, 100%, 50%)',
  
  // Gradientes
  gradients: {
    primary: 'linear-gradient(135deg, rgba(114, 158, 46, 0.05) 0%, rgba(114, 158, 46, 0.02) 100%)',
  }
};

export const spacing = {
  0: '0px',
  1: '0.25rem', // 4px
  2: '0.5rem',  // 8px
  3: '0.75rem', // 12px
  4: '1rem',    // 16px
  5: '1.25rem', // 20px
  6: '1.5rem',  // 24px
  8: '2rem',    // 32px
  10: '2.5rem', // 40px
  12: '3rem',   // 48px
  16: '4rem',   // 64px
  20: '5rem',   // 80px
  24: '6rem',   // 96px
};

export const borderRadius = {
  none: '0px',
  sm: 'calc(0.75rem - 4px)', // 8px
  md: 'calc(0.75rem - 2px)', // 10px
  lg: '0.75rem',             // 12px - Radio principal
  xl: '1rem',                // 16px
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
};

export const typography = {
  fontFamily: {
    sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const animation = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
  },
  
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
  toast: 60,
};

// Breakpoints responsive
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Componentes específicos
export const components = {
  button: {
    height: {
      sm: '2rem',     // 32px
      md: '2.5rem',   // 40px
      lg: '3rem',     // 48px
    },
    padding: {
      sm: '0.5rem 0.75rem',
      md: '0.75rem 1rem',
      lg: '1rem 1.5rem',
    },
  },
  
  input: {
    height: {
      sm: '2rem',
      md: '2.5rem',
      lg: '3rem',
    },
  },
  
  avatar: {
    size: {
      xs: '1.5rem',   // 24px
      sm: '2rem',     // 32px
      md: '2.5rem',   // 40px
      lg: '3rem',     // 48px
      xl: '4rem',     // 64px
    },
  },
};