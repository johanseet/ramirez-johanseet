class Subscription {
  constructor({ userId, planId, paypalSubscriptionId, status, startDate, endDate }) {
    this.userId = userId;
    this.planId = planId;
    this.paypalSubscriptionId = paypalSubscriptionId;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

module.exports = Subscription;
