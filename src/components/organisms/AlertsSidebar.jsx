import { motion } from 'framer-motion';
import AlertCard from '@/components/molecules/AlertCard';

const AlertsSidebar = ({ alerts, onAlertClick }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Alerts</h2>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.type}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AlertCard
              title={alert.title}
              count={alert.count}
              type={alert.type}
              icon={alert.icon}
              onClick={() => onAlertClick?.(alert.type)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlertsSidebar;