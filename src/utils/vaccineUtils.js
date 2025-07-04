export const getVaccineFamily = (genericName) => {
  const familyMap = {
    'DTaP': 'Diphtheria, Tetanus, Pertussis',
    'DTaP-IPV': 'Diphtheria, Tetanus, Pertussis, Polio',
    'DTaP-IPV-Hib': 'Diphtheria, Tetanus, Pertussis, Polio, Haemophilus influenzae type b',
    'DTaP-IPV-Hib-Hep B': 'Diphtheria, Tetanus, Pertussis, Polio, Haemophilus influenzae type b, Hepatitis B',
    'IPV': 'Polio',
    'Hep B': 'Hepatitis B',
    'Hep A': 'Hepatitis A',
    'RSV': 'Respiratory Syncytial Virus',
    'MMR': 'Measles, Mumps, Rubella',
    'MMRV': 'Measles, Mumps, Rubella, Varicella',
    'Hib': 'Haemophilus influenzae type b',
    'Tdap': 'Tetanus, Diphtheria, Pertussis',
    'Varicella': 'Chickenpox',
    'MCV4': 'Meningococcal',
    'MenB': 'Meningococcal B',
    'HPV': 'Human Papillomavirus',
    'PCV15': 'Pneumococcal',
    'RV': 'Rotavirus'
  };
  
  return familyMap[genericName] || genericName;
};

export const calculateTotalDoses = (vaccines) => {
  return vaccines.reduce((total, vaccine) => total + vaccine.quantityOnHand, 0);
};

export const getVaccinesByFamily = (vaccines) => {
  const familyGroups = {};
  
  vaccines.forEach(vaccine => {
    const family = vaccine.genericName;
    if (!familyGroups[family]) {
      familyGroups[family] = [];
    }
    familyGroups[family].push(vaccine);
  });
  
  return familyGroups;
};

export const filterVaccinesByStatus = (vaccines, status) => {
  const today = new Date();
  
  return vaccines.filter(vaccine => {
    const expirationDate = new Date(vaccine.expirationDate);
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    switch (status) {
      case 'expired':
        return diffDays < 0;
      case 'expiring':
        return diffDays >= 0 && diffDays <= 30;
      case 'safe':
        return diffDays > 30;
      case 'lowStock':
case 'lowStock':
      return vaccine.quantityOnHand <= 5;
    default:
      return true;
  }
});
};

// Dashboard-specific utility functions
export const calculateTotalQuantity = (vaccines) => {
  return vaccines.reduce((total, vaccine) => total + vaccine.quantityOnHand, 0);
};

export const getExpiringVaccines = (vaccines, daysThreshold = 30) => {
  const today = new Date();
  return vaccines.filter(vaccine => {
    const expirationDate = new Date(vaccine.expirationDate);
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= daysThreshold;
  });
};

export const getExpiredVaccines = (vaccines) => {
  const today = new Date();
  return vaccines.filter(vaccine => {
    const expirationDate = new Date(vaccine.expirationDate);
    return expirationDate < today;
  });
};

export const getLowStockVaccines = (vaccines, threshold = 5) => {
  return vaccines.filter(vaccine => vaccine.quantityOnHand <= threshold);
};

export const calculateDashboardMetrics = (vaccines) => {
  const totalQuantity = calculateTotalQuantity(vaccines);
  const expiringVaccines = getExpiringVaccines(vaccines);
  const expiredVaccines = getExpiredVaccines(vaccines);
  const lowStockVaccines = getLowStockVaccines(vaccines);

  return {
    totalQuantity,
    totalVaccines: vaccines.length,
    expiringCount: expiringVaccines.length,
    expiredCount: expiredVaccines.length,
    lowStockCount: lowStockVaccines.length,
    expiringVaccines,
    expiredVaccines,
lowStockVaccines
  };
};

export const sortVaccines = (vaccines, sortBy, sortOrder = 'asc') => {
  const sorted = [...vaccines].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.commercialName.toLowerCase();
        bValue = b.commercialName.toLowerCase();
        break;
      case 'expiration':
        aValue = new Date(a.expirationDate);
        bValue = new Date(b.expirationDate);
        break;
      case 'quantity':
        aValue = a.quantityOnHand;
        bValue = b.quantityOnHand;
        break;
      case 'family':
        aValue = a.genericName.toLowerCase();
        bValue = b.genericName.toLowerCase();
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
};