import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import vaccineService from "@/services/api/vaccineService";
import reconciliationService from "@/services/api/reconciliationService";

const ReconciliationPage = () => {
  const [vaccines, setVaccines] = useState([]);
  const [reconciliations, setReconciliations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVaccine, setSelectedVaccine] = useState('');
  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const adjustmentReasons = [
    { value: 'expired', label: 'Expired Vaccines' },
    { value: 'damaged', label: 'Damaged During Storage' },
    { value: 'spillage', label: 'Spillage/Wastage' },
    { value: 'temperature', label: 'Temperature Excursion' },
    { value: 'counting_error', label: 'Counting Error' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [vaccinesData, reconciliationsData] = await Promise.all([
        vaccineService.getAll(),
        reconciliationService.getAll()
      ]);
      setVaccines(vaccinesData);
      setReconciliations(reconciliationsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustment = async (e) => {
    e.preventDefault();
    if (!selectedVaccine || !adjustmentAmount || !adjustmentReason) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const adjustmentData = {
        vaccineId: selectedVaccine,
        adjustmentAmount: parseInt(adjustmentAmount),
        reason: adjustmentReason,
        date: new Date().toISOString(),
        performedBy: 'Current User',
      };

      await reconciliationService.create(adjustmentData);
      toast.success('Inventory adjustment recorded successfully');
      
      // Reset form
      setSelectedVaccine('');
      setAdjustmentAmount('');
      setAdjustmentReason('');
      
      // Reload data
      await loadData();
    } catch (err) {
      toast.error('Failed to record adjustment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  const vaccineOptions = vaccines.map(vaccine => ({
    value: vaccine.Id,
    label: `${vaccine.commercialName} - ${vaccine.lotNumber}`,
  }));

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Inventory Adjustment</h2>
            <p className="text-slate-600">Record adjustments to vaccine inventory for reconciliation purposes.</p>
          </div>

          <form onSubmit={handleAdjustment} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Select Vaccine"
                value={selectedVaccine}
                onChange={(e) => setSelectedVaccine(e.target.value)}
                options={vaccineOptions}
                placeholder="Choose a vaccine..."
                required
              />
              <Input
                label="Adjustment Amount"
                type="number"
                value={adjustmentAmount}
                onChange={(e) => setAdjustmentAmount(e.target.value)}
                placeholder="Enter positive or negative amount"
                required
              />
            </div>

            <Select
              label="Adjustment Reason"
              value={adjustmentReason}
              onChange={(e) => setAdjustmentReason(e.target.value)}
              options={adjustmentReasons}
              placeholder="Select reason for adjustment..."
              required
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                loading={submitting}
                disabled={submitting}
                icon="Save"
              >
                Record Adjustment
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Reconciliation History</h2>
            <p className="text-slate-600">Review past inventory adjustments and reconciliation records.</p>
          </div>

          {reconciliations.length === 0 ? (
            <Empty
              title="No Reconciliation Records"
              description="Inventory adjustments and reconciliation records will appear here."
              icon="📊"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Vaccine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Adjustment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Performed By
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {reconciliations.map((record) => {
                    const vaccine = vaccines.find(v => v.Id === record.vaccineId);
                    return (
                      <tr key={record.Id} className="table-row">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {format(new Date(record.date), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {vaccine ? `${vaccine.commercialName} - ${vaccine.lotNumber}` : 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <span className={record.adjustmentAmount > 0 ? 'text-success' : 'text-error'}>
                            {record.adjustmentAmount > 0 ? '+' : ''}{record.adjustmentAmount}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {adjustmentReasons.find(r => r.value === record.reason)?.label || record.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {record.performedBy}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ReconciliationPage;