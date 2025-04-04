import React, { ComponentType, SVGProps } from 'react';

interface IconProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, className = '' }) => {
  return <IconComponent className={className} />;
};
