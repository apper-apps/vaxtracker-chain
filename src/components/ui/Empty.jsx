import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';

const Empty = ({ 
  title = 'No Data Available',
  description = 'There are no items to display at the moment.',
  icon = '📋',
  actionLabel,
  onAction
}) => {
  return (
    <Card className="text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 mb-6">{description}</p>
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            variant="primary"
            icon="Plus"
          >
            {actionLabel}
          </Button>
        )}
      </motion.div>
    </Card>
  );
};

export default Empty;