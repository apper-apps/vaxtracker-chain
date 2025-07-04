import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import TableRow from '@/components/molecules/TableRow';
import vaccineService from '@/services/api/vaccineService';

const InventoryTable = ({ vaccines, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (vaccineId) => {
    setEditingId(vaccineId);
    setEditValue('');
  };

  const handleSave = async (vaccineId) => {
    try {
      const dosesToAdminister = parseInt(editValue);
      if (dosesToAdminister <= 0) {
        toast.error('Please enter a valid number of doses');
        return;
      }

      const vaccine = vaccines.find(v => v.Id === vaccineId);
      if (dosesToAdminister > vaccine.quantityOnHand) {
        toast.error('Cannot administer more doses than available');
        return;
      }

      await vaccineService.administerDoses(vaccineId, dosesToAdminister);
      toast.success(`${dosesToAdminister} doses administered successfully`);
      
      setEditingId(null);
      setEditValue('');
      onUpdate?.();
    } catch (error) {
      toast.error('Failed to record administration');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  if (vaccines.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">💉</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Vaccines Found</h3>
          <p className="text-slate-600">No vaccines match your current search criteria.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Vaccine Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Generic Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Lot Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Expiration Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Quantity On Hand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Administered Doses
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {vaccines.map((vaccine) => (
              <TableRow
                key={vaccine.Id}
                vaccine={vaccine}
                isEditing={editingId === vaccine.Id}
                onEdit={() => handleEdit(vaccine.Id)}
                onSave={() => handleSave(vaccine.Id)}
                onCancel={handleCancel}
                editValue={editValue}
                onEditValueChange={setEditValue}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default InventoryTable;