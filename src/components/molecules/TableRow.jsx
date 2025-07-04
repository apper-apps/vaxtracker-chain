import { motion } from 'framer-motion';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { format } from 'date-fns';

const TableRow = ({ 
  vaccine,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editValue,
  onEditValueChange,
  className = '',
  ...props 
}) => {
  const getExpirationStatus = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: 'expired', variant: 'error', text: 'Expired' };
    } else if (diffDays <= 30) {
      return { status: 'expiring', variant: 'warning', text: `${diffDays} days` };
    } else {
      return { status: 'safe', variant: 'success', text: 'Safe' };
    }
  };

  const expirationStatus = getExpirationStatus(vaccine.expirationDate);

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`table-row ${className}`}
      {...props}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
        {vaccine.commercialName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        {vaccine.genericName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        {vaccine.lotNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        <div className="flex items-center gap-2">
          {format(new Date(vaccine.expirationDate), 'MMM dd, yyyy')}
          <Badge variant={expirationStatus.variant} size="sm">
            {expirationStatus.text}
          </Badge>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        <span className="font-semibold">{vaccine.quantityOnHand}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={editValue}
              onChange={(e) => onEditValueChange(e.target.value)}
              className="w-20"
              min="0"
              max={vaccine.quantityOnHand}
            />
            <Button
              variant="success"
              size="sm"
              icon="Check"
              onClick={onSave}
            />
            <Button
              variant="ghost"
              size="sm"
              icon="X"
              onClick={onCancel}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>0</span>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              disabled={vaccine.quantityOnHand === 0}
            >
              Record
            </Button>
          </div>
        )}
      </td>
    </motion.tr>
  );
};

export default TableRow;