import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useTheme } from '../../../contexts/ThemeContext';
import { cn } from '../../../utils/cn';

const Logo = ({
  width = 120,
  height = 40,
  className,
  priority = false,
  ...props
}) => {
  const { theme } = useTheme();
  
  const logoSrc = theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg';

  return (
    <Image
      src={logoSrc}
      alt="DesafioLatam"
      width={width}
      height={height}
      className={className || 'h-auto w-auto'}
      priority={priority}
      {...props}
    />
  );
};

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  priority: PropTypes.bool,
};

export default Logo;