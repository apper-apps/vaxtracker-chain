import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
            color={stat.color}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;