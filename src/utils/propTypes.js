import PropTypes from 'prop-types';

// PropTypes comunes reutilizables para componentes

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

export const sizePropType = PropTypes.oneOf(['sm', 'md', 'lg']);

export const variantPropType = PropTypes.oneOf([
  'primary',
  'secondary',
  'destructive',
  'ghost',
  'outline',
]);

export const colorPropType = PropTypes.oneOf([
  'primary',
  'secondary',
  'muted',
  'accent',
  'destructive',
]);

export const statusPropType = PropTypes.oneOf([
  'completed',
  'in-progress',
  'pending',
  'blocked',
  'optional',
]);

export const alignmentPropType = PropTypes.oneOf([
  'left',
  'center',
  'right',
]);

// PropTypes específicos para eventos
export const clickHandlerPropType = PropTypes.func;
export const changeHandlerPropType = PropTypes.func;
export const submitHandlerPropType = PropTypes.func;

// PropTypes para datos comunes
export const userPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string,
  role: PropTypes.string,
});

export const modulePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: statusPropType,
  progress: PropTypes.number,
  type: PropTypes.oneOf(['self-learning', 'tutoring']),
  icon: PropTypes.string,
});

export const notificationPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  read: PropTypes.bool,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
});

// PropTypes para componentes de layout
export const classNamePropType = PropTypes.string;
export const stylePropType = PropTypes.object;