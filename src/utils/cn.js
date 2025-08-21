// Utilidad para concatenar clases CSS de forma condicional
// Inspirada en clsx/classnames pero simplificada

export function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(' ');
}

// Variante que acepta objetos condicionales
export function clsx(...args) {
  const classes = [];
  
  for (const arg of args) {
    if (!arg) continue;
    
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(' ');
}