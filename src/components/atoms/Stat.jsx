import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Stat = ({ 
  label, 
  value, 
  icon, 
  trend,
  trendValue,
  color = 'primary',
  className = '',
  ...props 
}) => {
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info',
  };

  const bgColors = {
    primary: 'bg-primary/10',
    secondary: 'bg-secondary/10',
    success: 'bg-success/10',
    warning: 'bg-warning/10',
    error: 'bg-error/10',
    info: 'bg-info/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`${className}`}
      {...props}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        {icon && (
          <div className={`p-2 rounded-lg ${bgColors[color]}`}>
            <ApperIcon name={icon} size={16} className={colors[color]} />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className={`text-2xl font-bold ${colors[color]} gradient-text`}>{value}</p>
          {trend && (
            <div className="flex items-center mt-1">
              <ApperIcon 
                name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={trend === 'up' ? 'text-success' : 'text-error'} 
              />
              <span className={`text-sm ml-1 ${trend === 'up' ? 'text-success' : 'text-error'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Stat;