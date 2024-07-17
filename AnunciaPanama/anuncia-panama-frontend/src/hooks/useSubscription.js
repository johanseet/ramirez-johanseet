import { useCallback } from 'react';
import { registerSubscriptionService } from '../services/api/businessService';

const useSubscription = () => {
  const registerSubscription = useCallback(async (subscriptionDetails, planId, businessId) => {
    const transformedData = transformSubscriptionData(subscriptionDetails, planId, businessId);
    console.log("transformedData",transformedData)
    try {
      const response = await registerSubscriptionService(transformedData);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }, []);

  const transformSubscriptionData = (subscriptionDetails, planId, businessId) => {
    const billingInfo = subscriptionDetails.billing_info.cycle_executions[0].total_price_per_cycle;
    console.log(businessId);
    return {
      businessId: businessId,
      planId: planId,
      paypalSubscriptionId: subscriptionDetails.id,
      status: subscriptionDetails.status,
      statusUpdateTime: subscriptionDetails.status_update_time,
      startTime: subscriptionDetails.start_time,
      payerId: subscriptionDetails.subscriber.payer_id,
      createdAt: new Date().toISOString(),
      cycleSequence: subscriptionDetails.billing_info.cycle_executions[0].sequence,
      grossAmount: parseFloat(billingInfo.gross_amount.value),
      totalItemAmount: parseFloat(billingInfo.total_item_amount.value),
      shippingAmount: parseFloat(billingInfo.shipping_amount.value),
      taxAmount: parseFloat(billingInfo.tax_amount.value),
      paymentTime: subscriptionDetails.billing_info.last_payment.time
    };
  };

  return {
    registerSubscription
  };
};

export default useSubscription;
