import { useState, useEffect } from 'react';
import vaccineService from '@/services/api/vaccineService';

const useVaccineAlerts = () => {
  const [alerts, setAlerts] = useState({
    expired: 0,
    expiring: 0,
    lowStock: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const vaccines = await vaccineService.getAll();
        const today = new Date();
        
        let expired = 0;
        let expiring = 0;
        let lowStock = 0;

        vaccines.forEach(vaccine => {
          const expirationDate = new Date(vaccine.expirationDate);
          const diffTime = expirationDate - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays < 0) {
            expired++;
          } else if (diffDays <= 30) {
            expiring++;
          }

          if (vaccine.quantityOnHand <= 5) {
            lowStock++;
          }
        });

        setAlerts({
          expired,
          expiring,
          lowStock,
          total: expired + expiring + lowStock
        });
      } catch (error) {
        console.error('Error loading vaccine alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAlerts();
  }, []);

  return { alerts, loading };
};

export default useVaccineAlerts;