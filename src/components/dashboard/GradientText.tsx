import React from 'react';

export interface GradientTextProps {
  text?: string;
  variant?: 'sunset' | 'aqua' | 'rainbow' | 'fire' | 'purple' | 'rosemont';
  className?: string;
  animate?: boolean;
}

const gradients: Record<string, string> = {
  sunset: 'linear-gradient(90deg, #ff5858 0%, #f09819 100%)',
  aqua: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
  rainbow:
    'linear-gradient(90deg, #ff5858 0%, #f09819 20%, #43cea2 40%, #185a9d 60%, #a770ef 80%, #f09819 100%)',
  fire: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)',
  purple: 'linear-gradient(90deg, #a770ef 0%, #f6d365 100%)',
  rosemont: 'linear-gradient(90deg, #e4003a 0%, #444ea5 100%)',
};

const GradientText: React.FC<GradientTextProps> = ({
  text = 'Gradient Text',
  variant = 'sunset',
  className = '',
  animate = false,
}) => {
  return (
    <span
      className={`gradient-text ${className} ${
        animate ? 'gradient-animate' : ''
      }`}
      key={variant + text + animate}
      style={{
        background: gradients[variant],
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        display: 'inline-block',
      }}
    >
      {text}
    </span>
  );
};

export default GradientText;
