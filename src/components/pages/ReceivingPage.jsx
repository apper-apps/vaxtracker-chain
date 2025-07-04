import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReceivingForm from '@/components/organisms/ReceivingForm';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import shipmentService from '@/services/api/shipmentService';
import { format } from 'date-fns';

const ReceivingPage = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shipmentService.getAll();
      setShipments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    loadShipments();
  };

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadShipments} />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ReceivingForm onSuccess={handleFormSuccess} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Recent Shipments</h2>
            <p className="text-slate-600">View recently received vaccine shipments and inspection results.</p>
          </div>

          {shipments.length === 0 ? (
            <Empty
              title="No Shipments Received"
              description="Shipments you receive will appear here for tracking and review."
              icon="📦"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Vaccine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Lot Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Received Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {shipments.map((shipment) => (
                    <tr key={shipment.Id} className="table-row">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {shipment.vaccineName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {shipment.lotNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {format(new Date(shipment.receivedDate), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {shipment.quantityReceived} / {shipment.quantitySent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {shipment.quantityReceived === shipment.quantitySent ? (
                          <Badge variant="success" size="sm">Complete</Badge>
                        ) : (
                          <Badge variant="warning" size="sm">Discrepancy</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ReceivingPage;