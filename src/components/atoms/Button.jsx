import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-primary focus:ring-primary/50 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-secondary to-purple-600 text-white hover:from-purple-600 hover:to-secondary focus:ring-secondary/50 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50',
    ghost: 'text-slate-600 hover:text-primary hover:bg-primary/10 focus:ring-primary/50',
    success: 'bg-gradient-to-r from-success to-green-600 text-white hover:from-green-600 hover:to-success focus:ring-success/50 shadow-lg hover:shadow-xl',
    warning: 'bg-gradient-to-r from-warning to-amber-600 text-white hover:from-amber-600 hover:to-warning focus:ring-warning/50 shadow-lg hover:shadow-xl',
    error: 'bg-gradient-to-r from-error to-red-600 text-white hover:from-red-600 hover:to-error focus:ring-error/50 shadow-lg hover:shadow-xl',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={iconSizes[size]} 
          className="animate-spin mr-2" 
        />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className="mr-2" 
        />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className="ml-2" 
        />
      )}
    </motion.button>
  );
};

export default Button;