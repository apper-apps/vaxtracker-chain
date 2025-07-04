import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <Card className="text-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-error/10 to-red-200 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" size={32} className="text-error" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Data</h3>
        <p className="text-slate-600 mb-6">{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            icon="RefreshCw"
          >
            Try Again
          </Button>
        )}
      </motion.div>
    </Card>
  );
};

export default Error;