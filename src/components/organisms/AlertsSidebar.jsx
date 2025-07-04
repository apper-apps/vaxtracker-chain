import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Clock, Package, Thermometer } from 'lucide-react';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Card from '@/components/atoms/Card';

const AlertsSidebar = ({ isOpen, onClose, alerts = [] }) => {
  const [filter, setFilter] = useState('all');

  const alertTypes = {
    expiration: {
      icon: Clock,
      color: 'warning',
      label: 'Expiration Warning'
    },
    lowStock: {
      icon: Package,
      color: 'error',
      label: 'Low Stock'
    },
    temperature: {
      icon: Thermometer,
      color: 'error',
      label: 'Temperature Alert'
    },
    quality: {
      icon: AlertTriangle,
      color: 'warning',
      label: 'Quality Issue'
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  const getAlertIcon = (type) => {
    const IconComponent = alertTypes[type]?.icon || AlertTriangle;
    return IconComponent;
  };

  const getAlertColor = (type) => {
    return alertTypes[type]?.color || 'warning';
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const alertDate = new Date(date);
    const diffInMinutes = Math.floor((now - alertDate) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Vaccine Alerts
                </h2>
                <Badge variant="error" size="sm">
                  {alerts.length}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === 'all' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                  className="text-xs"
                >
                  All ({alerts.length})
                </Button>
                {Object.entries(alertTypes).map(([type, config]) => {
                  const count = alerts.filter(alert => alert.type === type).length;
                  return count > 0 ? (
                    <Button
                      key={type}
                      variant={filter === type ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setFilter(type)}
                      className="text-xs"
                    >
                      {config.label} ({count})
                    </Button>
                  ) : null;
                })}
              </div>
            </div>

            {/* Alerts List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredAlerts.length === 0 ? (
                <div className="p-8 text-center">
                  <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {filter === 'all' ? 'No alerts at this time' : `No ${alertTypes[filter]?.label.toLowerCase()} alerts`}
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {filteredAlerts.map((alert) => {
                    const IconComponent = getAlertIcon(alert.type);
                    const alertColor = getAlertColor(alert.type);
                    
                    return (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group"
                      >
                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${
                              alertColor === 'error' ? 'bg-red-100 text-red-600' :
                              alertColor === 'warning' ? 'bg-amber-100 text-amber-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <Badge variant={alertColor} size="sm">
                                  {alertTypes[alert.type]?.label || 'Alert'}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {formatTimeAgo(alert.createdAt)}
                                </span>
                              </div>
                              
                              <h4 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                {alert.title}
                              </h4>
                              
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {alert.message}
                              </p>
                              
                              {alert.vaccine && (
                                <div className="mt-2 p-2 bg-gray-50 rounded-md">
                                  <p className="text-xs text-gray-700">
                                    <span className="font-medium">Vaccine:</span> {alert.vaccine.name}
                                  </p>
                                  <p className="text-xs text-gray-700">
                                    <span className="font-medium">Lot:</span> {alert.vaccine.lotNumber}
                                  </p>
                                  {alert.vaccine.quantity && (
                                    <p className="text-xs text-gray-700">
                                      <span className="font-medium">Quantity:</span> {alert.vaccine.quantity} doses
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredAlerts.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => console.log('View all alerts')}
                >
                  View All Alerts
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlertsSidebar;