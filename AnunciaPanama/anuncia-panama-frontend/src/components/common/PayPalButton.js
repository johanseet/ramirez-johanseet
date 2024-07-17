import { useEffect } from 'react';
import useSubscription from '@hooks/useSubscription';
import { useRouter } from 'next/navigation';

const PayPalButton = ({ planId, businessId }) => {
  const { registerSubscription } = useSubscription();
  const router = useRouter();

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!clientId) {
      console.error("PayPal client ID no está definido");
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`;
    script.addEventListener('load', () => {
      paypal.Buttons({
        createSubscription: function(data, actions) {
          return actions.subscription.create({
            'plan_id': planId
          });
        },
        onApprove: async function(data, actions) {
          try {
            const subscriptionDetails = await actions.subscription.get();
            console.log('Subscription', subscriptionDetails);
            console.log("businessId onapprove",businessId)
            const response = await registerSubscription(subscriptionDetails, planId, businessId);
            console.log('Suscripcion REGISTRADA', response);
            router.push('/');
          } catch (error) {
            console.error('Error durante la suscripcion:', error);
          }
        },
        onError: function(err) {
          console.error('Error durante la suscripcion:', error);
        }
      }).render('#paypal-button-container');
    });
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [planId, registerSubscription]);

  return (
    <div>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PayPalButton;
