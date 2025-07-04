import { useState } from 'react';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import shipmentService from '@/services/api/shipmentService';

const ReceivingForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    vaccineName: '',
    genericName: '',
    lotNumber: '',
    expirationDate: '',
    quantitySent: '',
    quantityReceived: '',
    passedInspection: '',
    failedInspection: '',
    discrepancyReason: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const shipmentData = {
        ...formData,
        quantitySent: parseInt(formData.quantitySent),
        quantityReceived: parseInt(formData.quantityReceived),
        passedInspection: parseInt(formData.passedInspection),
        failedInspection: parseInt(formData.failedInspection),
        receivedDate: new Date().toISOString(),
      };

      await shipmentService.create(shipmentData);
      toast.success('Shipment received and recorded successfully');
      
      // Reset form
      setFormData({
        vaccineName: '',
        genericName: '',
        lotNumber: '',
        expirationDate: '',
        quantitySent: '',
        quantityReceived: '',
        passedInspection: '',
        failedInspection: '',
        discrepancyReason: '',
      });

      onSuccess?.();
    } catch (error) {
      toast.error('Failed to record shipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Receive New Shipment</h2>
        <p className="text-slate-600">Record details of incoming vaccine shipment and inspection results.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Vaccine Name"
            name="vaccineName"
            value={formData.vaccineName}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Generic Name"
            name="genericName"
            value={formData.genericName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Lot Number"
            name="lotNumber"
            value={formData.lotNumber}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Expiration Date"
            name="expirationDate"
            type="date"
            value={formData.expirationDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Quantity Sent"
            name="quantitySent"
            type="number"
            value={formData.quantitySent}
            onChange={handleInputChange}
            required
            min="0"
          />
          <FormField
            label="Quantity Received"
            name="quantityReceived"
            type="number"
            value={formData.quantityReceived}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Inspection Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Doses Passing Inspection"
              name="passedInspection"
              type="number"
              value={formData.passedInspection}
              onChange={handleInputChange}
              required
              min="0"
            />
            <FormField
              label="Doses Failed Inspection"
              name="failedInspection"
              type="number"
              value={formData.failedInspection}
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>
        </div>

        {parseInt(formData.failedInspection) > 0 && (
          <FormField
            label="Discrepancy Reason"
            name="discrepancyReason"
            value={formData.discrepancyReason}
            onChange={handleInputChange}
            placeholder="Explain why doses failed inspection..."
            required
          />
        )}

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setFormData({
              vaccineName: '',
              genericName: '',
              lotNumber: '',
              expirationDate: '',
              quantitySent: '',
              quantityReceived: '',
              passedInspection: '',
              failedInspection: '',
              discrepancyReason: '',
            })}
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Record Shipment
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReceivingForm;