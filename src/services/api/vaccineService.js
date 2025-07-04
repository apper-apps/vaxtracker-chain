import vaccinesData from '@/services/mockData/vaccines.json';

class VaccineService {
  constructor() {
    this.vaccines = [...vaccinesData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.vaccines];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const vaccine = this.vaccines.find(v => v.Id === parseInt(id));
    if (!vaccine) {
      throw new Error('Vaccine not found');
    }
    return { ...vaccine };
  }

  async create(vaccineData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newVaccine = {
      ...vaccineData,
      Id: Math.max(...this.vaccines.map(v => v.Id)) + 1,
      receivedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    this.vaccines.push(newVaccine);
    return { ...newVaccine };
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.vaccines.findIndex(v => v.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Vaccine not found');
    }
    this.vaccines[index] = {
      ...this.vaccines[index],
      ...updateData,
      lastUpdated: new Date().toISOString()
    };
    return { ...this.vaccines[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.vaccines.findIndex(v => v.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Vaccine not found');
    }
    this.vaccines.splice(index, 1);
    return true;
  }

  async administerDoses(id, dosesAdministered) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const vaccine = this.vaccines.find(v => v.Id === parseInt(id));
    if (!vaccine) {
      throw new Error('Vaccine not found');
    }
    if (dosesAdministered > vaccine.quantityOnHand) {
      throw new Error('Insufficient quantity available');
    }
    vaccine.quantityOnHand -= dosesAdministered;
    vaccine.lastUpdated = new Date().toISOString();
    return { ...vaccine };
  }

  async adjustQuantity(id, adjustmentAmount, reason) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const vaccine = this.vaccines.find(v => v.Id === parseInt(id));
    if (!vaccine) {
      throw new Error('Vaccine not found');
    }
    vaccine.quantityOnHand += adjustmentAmount;
    if (vaccine.quantityOnHand < 0) {
      vaccine.quantityOnHand = 0;
    }
    vaccine.lastUpdated = new Date().toISOString();
    return { ...vaccine };
  }
}

export default new VaccineService();