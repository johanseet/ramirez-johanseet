class Subscription {
    constructor(businessId, planId, paypalSubscriptionId, status, statusUpdateTime, startTime, payerId, createdAt) {
      this.businessId = businessId;
      this.planId = planId;
      this.paypalSubscriptionId = paypalSubscriptionId;
      this.status = status;
      this.statusUpdateTime = statusUpdateTime;
      this.startTime = startTime;
      this.payerId = payerId;
      this.createdAt = createdAt;
    }
  }
  
  export default Subscription;
  