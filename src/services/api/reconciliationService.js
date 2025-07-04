import reconciliationsData from '@/services/mockData/reconciliations.json';

class ReconciliationService {
  constructor() {
    this.reconciliations = [...reconciliationsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...this.reconciliations];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const reconciliation = this.reconciliations.find(r => r.Id === parseInt(id));
    if (!reconciliation) {
      throw new Error('Reconciliation record not found');
    }
    return { ...reconciliation };
  }

  async create(reconciliationData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newReconciliation = {
      ...reconciliationData,
      Id: Math.max(...this.reconciliations.map(r => r.Id)) + 1,
      date: reconciliationData.date || new Date().toISOString()
    };
    this.reconciliations.push(newReconciliation);
    return { ...newReconciliation };
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.reconciliations.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Reconciliation record not found');
    }
    this.reconciliations[index] = {
      ...this.reconciliations[index],
      ...updateData
    };
    return { ...this.reconciliations[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.reconciliations.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Reconciliation record not found');
    }
    this.reconciliations.splice(index, 1);
    return true;
  }

  async getByDateRange(startDate, endDate) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const filtered = this.reconciliations.filter(r => {
      const recordDate = new Date(r.date);
      return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
    });
    return filtered;
  }

  async getByVaccine(vaccineId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const filtered = this.reconciliations.filter(r => r.vaccineId === parseInt(vaccineId));
    return filtered;
  }
}

export default new ReconciliationService();