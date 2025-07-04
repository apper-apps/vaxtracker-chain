import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';

const Header = ({ onSearch, onMenuToggle }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Vaccine Inventory';
      case '/receiving':
        return 'Receiving & Inspection';
      case '/reconciliation':
        return 'Monthly Reconciliation';
      case '/reports':
        return 'Inventory Reports';
      default:
        return 'VaxTracker Pro';
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    onSearch?.(term);
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              icon="Menu"
              onClick={onMenuToggle}
              className="lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-xl font-bold text-slate-900 gradient-text">
                {getPageTitle()}
              </h1>
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            {(location.pathname === '/' || location.pathname === '/reports') && (
              <div className="w-64 hidden md:block">
                <SearchBar
                  placeholder="Search vaccines..."
                  onSearch={handleSearch}
                />
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon="Bell"
                className="relative"
              >
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-error rounded-full"></span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon="Settings"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;