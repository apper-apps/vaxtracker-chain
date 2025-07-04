import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatsGrid from '@/components/organisms/StatsGrid';
import InventoryTable from '@/components/organisms/InventoryTable';
import AlertsSidebar from '@/components/organisms/AlertsSidebar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import vaccineService from '@/services/api/vaccineService';

const InventoryPage = () => {
  const { searchTerm } = useOutletContext();
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVaccines();
  }, []);

  const loadVaccines = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await vaccineService.getAll();
      setVaccines(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredVaccines = vaccines.filter(vaccine =>
    vaccine.commercialName.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    vaccine.genericName.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    vaccine.lotNumber.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  );

  const getStats = () => {
    const totalVaccines = vaccines.length;
    const totalDoses = vaccines.reduce((sum, v) => sum + v.quantityOnHand, 0);
    const expiredCount = vaccines.filter(v => new Date(v.expirationDate) < new Date()).length;
    const expiringCount = vaccines.filter(v => {
      const diffTime = new Date(v.expirationDate) - new Date();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 30;
    }).length;

    return [
      { label: 'Total Vaccines', value: totalVaccines, icon: 'Package', color: 'primary' },
      { label: 'Total Doses', value: totalDoses, icon: 'Syringe', color: 'success' },
      { label: 'Expiring Soon', value: expiringCount, icon: 'Clock', color: 'warning' },
      { label: 'Expired', value: expiredCount, icon: 'AlertTriangle', color: 'error' },
    ];
  };

  const getAlerts = () => {
    const expiredCount = vaccines.filter(v => new Date(v.expirationDate) < new Date()).length;
    const expiringCount = vaccines.filter(v => {
      const diffTime = new Date(v.expirationDate) - new Date();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 30;
    }).length;
    const lowStockCount = vaccines.filter(v => v.quantityOnHand <= 5).length;

    return [
      { type: 'critical', title: 'Expired Vaccines', count: expiredCount, icon: 'AlertTriangle' },
      { type: 'warning', title: 'Expiring Soon', count: expiringCount, icon: 'Clock' },
      { type: 'info', title: 'Low Stock', count: lowStockCount, icon: 'Package' },
    ];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Loading type="cards" />
        <Loading type="table" />
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadVaccines} />;
  }

  if (vaccines.length === 0) {
    return (
      <Empty
        title="No Vaccines in Inventory"
        description="Start by receiving your first vaccine shipment to populate the inventory."
        icon="💉"
        actionLabel="Receive Shipment"
        onAction={() => window.location.href = '/receiving'}
      />
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StatsGrid stats={getStats()} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <InventoryTable vaccines={filteredVaccines} onUpdate={loadVaccines} />
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <AlertsSidebar alerts={getAlerts()} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;