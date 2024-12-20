import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalPaymentProps {
  amount: number;
  onSuccess: (details: any) => void;
}

export const PayPalPayment = ({ amount, onSuccess }: PayPalPaymentProps) => {
  return (
    <PayPalButtons
      style={{ layout: "horizontal" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount.toString(),
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          onSuccess(details);
        });
      }}
    />
  );
};