import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Select = forwardRef(({ 
  label,
  options = [],
  placeholder = "Select an option",
  error,
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 form-input bg-white';
  
  const errorClasses = error ? 'border-error focus:ring-error/50 focus:border-error' : '';

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`${baseClasses} ${errorClasses} ${className} appearance-none pr-10`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ApperIcon name="ChevronDown" size={18} className="text-slate-400" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;