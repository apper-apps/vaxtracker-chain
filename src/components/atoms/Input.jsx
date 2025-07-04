import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 form-input';
  
  const errorClasses = error ? 'border-error focus:ring-error/50 focus:border-error' : '';
  
  const iconClasses = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={18} className="text-slate-400" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses} ${iconClasses} ${className}`}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={18} className="text-slate-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;