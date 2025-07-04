import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: 'Inventory', href: '/', icon: 'Package', badge: null },
    { name: 'Receiving', href: '/receiving', icon: 'Truck', badge: null },
    { name: 'Reconciliation', href: '/reconciliation', icon: 'Calculator', badge: null },
    { name: 'Reports', href: '/reports', icon: 'FileText', badge: null },
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white/80 backdrop-blur-lg border-r border-slate-200/50 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Shield" size={18} className="text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold gradient-text">VaxTracker</h1>
                <p className="text-sm text-slate-500">Pro</p>
              </div>
            </div>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-r-2 border-primary'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <ApperIcon
                  name={item.icon}
                  size={18}
                  className="mr-3 flex-shrink-0"
                />
                {item.name}
                {item.badge && (
                  <Badge variant="error" size="sm" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-lg border-r border-slate-200/50 lg:hidden"
      >
        <div className="flex flex-col h-full pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-between flex-shrink-0 px-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Shield" size={18} className="text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold gradient-text">VaxTracker</h1>
                <p className="text-sm text-slate-500">Pro</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
            >
              <ApperIcon name="X" size={18} />
            </button>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-r-2 border-primary'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <ApperIcon
                  name={item.icon}
                  size={18}
                  className="mr-3 flex-shrink-0"
                />
                {item.name}
                {item.badge && (
                  <Badge variant="error" size="sm" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;