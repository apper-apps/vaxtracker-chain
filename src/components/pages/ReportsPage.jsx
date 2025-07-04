import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import vaccineService from '@/services/api/vaccineService';
import { format } from 'date-fns';

const ReportsPage = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    vaccineFamily: '',
    status: '',
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'safe', label: 'Safe' },
    { value: 'expiring', label: 'Expiring Soon' },
    { value: 'expired', label: 'Expired' },
  ];

  const vaccineFamilyOptions = [
    { value: '', label: 'All Vaccine Families' },
    { value: 'DTaP', label: 'DTaP' },
    { value: 'Hep B', label: 'Hepatitis B' },
    { value: 'MMR', label: 'MMR' },
    { value: 'Varicella', label: 'Varicella' },
    { value: 'HPV', label: 'HPV' },
    { value: 'Hib', label: 'Hib' },
    { value: 'Tdap', label: 'Tdap' },
    { value: 'MCV4', label: 'MCV4' },
    { value: 'MenB', label: 'MenB' },
    { value: 'Hep A', label: 'Hepatitis A' },
    { value: 'PCV15', label: 'PCV15' },
    { value: 'RSV', label: 'RSV' },
    { value: 'IPV', label: 'IPV' },
    { value: 'MMRV', label: 'MMRV' },
    { value: 'RV', label: 'Rotavirus' },
  ];

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

  const getVaccineStatus = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'expired';
    if (diffDays <= 30) return 'expiring';
    return 'safe';
  };

  const filteredVaccines = vaccines.filter(vaccine => {
    const matchesFamily = !filters.vaccineFamily || vaccine.genericName.includes(filters.vaccineFamily);
    const matchesStatus = !filters.status || getVaccineStatus(vaccine.expirationDate) === filters.status;
    
    let matchesDateRange = true;
    if (filters.startDate) {
      matchesDateRange = matchesDateRange && new Date(vaccine.expirationDate) >= new Date(filters.startDate);
    }
    if (filters.endDate) {
      matchesDateRange = matchesDateRange && new Date(vaccine.expirationDate) <= new Date(filters.endDate);
    }

    return matchesFamily && matchesStatus && matchesDateRange;
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExport = () => {
    const csvContent = [
      ['Vaccine Name', 'Generic Name', 'Lot Number', 'Expiration Date', 'Quantity On Hand', 'Status'],
      ...filteredVaccines.map(vaccine => [
        vaccine.commercialName,
        vaccine.genericName,
        vaccine.lotNumber,
        format(new Date(vaccine.expirationDate), 'yyyy-MM-dd'),
        vaccine.quantityOnHand,
        getVaccineStatus(vaccine.expirationDate)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vaccine-inventory-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadVaccines} />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Inventory Reports</h2>
            <p className="text-slate-600">Filter and export vaccine inventory data for reporting purposes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Input
              label="Start Date"
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
            <Select
              label="Vaccine Family"
              value={filters.vaccineFamily}
              onChange={(e) => handleFilterChange('vaccineFamily', e.target.value)}
              options={vaccineFamilyOptions}
            />
            <Select
              label="Status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              options={statusOptions}
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-600">
              Showing {filteredVaccines.length} of {vaccines.length} vaccines
            </p>
            <Button
              onClick={handleExport}
              icon="Download"
              variant="outline"
              disabled={filteredVaccines.length === 0}
            >
              Export CSV
            </Button>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card padding="none">
          {filteredVaccines.length === 0 ? (
            <div className="p-6">
              <Empty
                title="No Vaccines Found"
                description="No vaccines match your current filter criteria."
                icon="🔍"
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
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
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredVaccines.map((vaccine) => {
                    const status = getVaccineStatus(vaccine.expirationDate);
                    const statusConfig = {
                      safe: { variant: 'success', text: 'Safe' },
                      expiring: { variant: 'warning', text: 'Expiring Soon' },
                      expired: { variant: 'error', text: 'Expired' },
                    };
                    
                    return (
                      <tr key={vaccine.Id} className="table-row">
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
                          {format(new Date(vaccine.expirationDate), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <span className="font-semibold">{vaccine.quantityOnHand}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <Badge variant={statusConfig[status].variant} size="sm">
                            {statusConfig[status].text}
                          </Badge>
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

export default ReportsPage;