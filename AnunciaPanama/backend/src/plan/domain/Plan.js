class Plan {
    constructor(id, name, cost, maxAdsPerMonth, features, createdAt) {
      this.id = id;
      this.name = name;
      this.cost = cost;
      this.maxAdsPerMonth = maxAdsPerMonth;
      this.features = features;
      this.createdAt = createdAt;
  
      this.validateCost();
    }
  
    validateCost() {
      if (this.cost < 0) {
        throw new Error('El costo no puede ser negativo');
      }
    }
  }
  
  export default Plan;
  