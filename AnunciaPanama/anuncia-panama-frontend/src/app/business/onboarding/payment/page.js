"use client"
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';

const Payment = () => {
  const router = useRouter();

  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      // Call your backend to save the transaction
      router.push('/business/dashboard');
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Pago</h1>
      <PayPalScriptProvider options={{ "client-id": "your-client-id" }}>
        <div className="bg-white p-4 rounded shadow">
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '0.01' // Reemplaza con el monto real
                  }
                }]
              });
            }}
            onApprove={handleApprove}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
};

Payment.getLayout = function getLayout(page) {
  return (
    <OnboardingLayout>
      {page}
    </OnboardingLayout>
  );
};

export default Payment;
