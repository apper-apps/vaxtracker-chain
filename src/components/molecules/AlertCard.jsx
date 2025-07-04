import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const AlertCard = ({ 
  title,
  count,
  type = 'warning',
  icon,
  onClick,
  className = '',
  ...props 
}) => {
  const typeConfig = {
    critical: {
      bgGradient: 'from-red-500 to-red-600',
      icon: 'AlertTriangle',
      textColor: 'text-white',
    },
    warning: {
      bgGradient: 'from-amber-500 to-orange-600',
      icon: 'Clock',
      textColor: 'text-white',
    },
    success: {
      bgGradient: 'from-green-500 to-green-600',
      icon: 'CheckCircle',
      textColor: 'text-white',
    },
    info: {
      bgGradient: 'from-blue-500 to-blue-600',
      icon: 'Info',
      textColor: 'text-white',
    },
  };

  const config = typeConfig[type];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      <Card className={`bg-gradient-to-br ${config.bgGradient} border-0 shadow-lg hover:shadow-xl`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${config.textColor} opacity-90`}>
              {title}
            </p>
            <p className={`text-3xl font-bold ${config.textColor} mt-1`}>
              {count}
            </p>
          </div>
          <div className="p-3 bg-white/20 rounded-full">
            <ApperIcon 
              name={icon || config.icon} 
              size={24} 
              className={config.textColor}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AlertCard;