import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  padding = 'md',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-card border border-slate-200/50 transition-all duration-200';
  
  const hoverClasses = hover ? 'hover:shadow-card-hover hover:-translate-y-1 interactive-element' : '';
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${hoverClasses} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;