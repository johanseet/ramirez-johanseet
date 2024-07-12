class Payment {
    constructor(id, businessId, planId, paypalSubscriptionId, startDate, endDate, createdAt) {
      this.id = id;
      this.businessId = businessId;
      this.planId = planId;
      this.paypalSubscriptionId = paypalSubscriptionId;
      this.startDate = startDate;
      this.endDate = endDate;
      this.createdAt = createdAt;
  
      this.validateDates();
    }
  
    validateDates() {
      if (this.startDate > this.endDate) {
        throw new Error('La fecha de inicio no puede ser posterior a la fecha de finalización');
      }
    }
  }
  
  export default Payment;
  