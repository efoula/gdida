import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  description,
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const toggleSize = {
    sm: {
      toggle: 'w-8 h-4',
      circle: 'h-3 w-3',
      translateX: 'translate-x-4',
    },
    md: {
      toggle: 'w-11 h-6',
      circle: 'h-5 w-5',
      translateX: 'translate-x-5',
    },
    lg: {
      toggle: 'w-14 h-7',
      circle: 'h-6 w-6',
      translateX: 'translate-x-7',
    },
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        className={`
          ${toggleSize[size].toggle}
          ${enabled ? 'bg-primary' : 'bg-gray-200'} 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          relative inline-flex shrink-0 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        `}
        role="switch"
        aria-checked={enabled}
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
      >
        <span
          className={`
            ${enabled ? toggleSize[size].translateX : 'translate-x-0'} 
            ${toggleSize[size].circle}
            pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
          `}
        />
      </button>
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <span className={`text-sm font-medium text-text-primary ${disabled ? 'opacity-50' : ''}`}>
              {label}
            </span>
          )}
          {description && (
            <p className={`text-xs text-text-secondary mt-1 ${disabled ? 'opacity-50' : ''}`}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Toggle;