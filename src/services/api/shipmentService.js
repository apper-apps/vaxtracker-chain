import shipmentsData from '@/services/mockData/shipments.json';

class ShipmentService {
  constructor() {
    this.shipments = [...shipmentsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...this.shipments];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const shipment = this.shipments.find(s => s.Id === parseInt(id));
    if (!shipment) {
      throw new Error('Shipment not found');
    }
    return { ...shipment };
  }

  async create(shipmentData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newShipment = {
      ...shipmentData,
      Id: Math.max(...this.shipments.map(s => s.Id)) + 1,
      receivedDate: shipmentData.receivedDate || new Date().toISOString()
    };
    this.shipments.push(newShipment);
    return { ...newShipment };
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.shipments.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Shipment not found');
    }
    this.shipments[index] = {
      ...this.shipments[index],
      ...updateData
    };
    return { ...this.shipments[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.shipments.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Shipment not found');
    }
    this.shipments.splice(index, 1);
    return true;
  }

  async getRecentShipments(limit = 10) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const sorted = [...this.shipments].sort((a, b) => 
      new Date(b.receivedDate) - new Date(a.receivedDate)
    );
    return sorted.slice(0, limit);
  }
}

export default new ShipmentService();