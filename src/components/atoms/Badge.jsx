import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  pulse = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg',
    secondary: 'bg-gradient-to-r from-secondary to-purple-600 text-white shadow-lg',
    success: 'bg-gradient-to-r from-success to-green-600 text-white shadow-lg',
    warning: 'bg-gradient-to-r from-warning to-amber-600 text-white shadow-lg',
    error: 'bg-gradient-to-r from-error to-red-600 text-white shadow-lg',
    critical: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg animate-pulse',
    expired: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg',
    expiring: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg',
    safe: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg',
    info: 'bg-gradient-to-r from-info to-blue-600 text-white shadow-lg',
    outline: 'border-2 border-primary text-primary bg-white',
    ghost: 'text-slate-600 bg-slate-100',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${pulse ? 'animate-pulse' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge;