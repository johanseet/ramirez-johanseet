class SubscriptionPaymentHistory {
    constructor(subscriptionId, cycleSequence, grossAmount, totalItemAmount, shippingAmount, taxAmount, paymentTime) {
      this.subscriptionId = subscriptionId;
      this.cycleSequence = cycleSequence;
      this.grossAmount = grossAmount;
      this.totalItemAmount = totalItemAmount;
      this.shippingAmount = shippingAmount;
      this.taxAmount = taxAmount;
      this.paymentTime = paymentTime;
  
      this.validateAmounts();
    }
  
    validateAmounts() {
      if (isNaN(this.grossAmount) || this.grossAmount < 0) {
        throw new Error(`Monto bruto inválido: ${this.grossAmount}`);
      }
      if (isNaN(this.totalItemAmount) || this.totalItemAmount < 0) {
        throw new Error(`Monto total de ítems inválido: ${this.totalItemAmount}`);
      }
      if (isNaN(this.shippingAmount) || this.shippingAmount < 0) {
        throw new Error(`Monto de envío inválido: ${this.shippingAmount}`);
      }
      if (isNaN(this.taxAmount) || this.taxAmount < 0) {
        throw new Error(`Monto de impuestos inválido: ${this.taxAmount}`);
      }
    }
  }
  
  export default SubscriptionPaymentHistory;
  