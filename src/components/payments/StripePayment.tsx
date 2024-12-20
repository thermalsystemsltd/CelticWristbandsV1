interface StripePaymentProps {
  amount: number;
  onSuccess: () => void;
}

export const StripePayment = ({ amount, onSuccess }: StripePaymentProps) => {
  const handleStripeCheckout = async () => {
    // Stripe implementation will go here
    console.log('Stripe checkout', amount);
    onSuccess();
  };

  return (
    <button
      onClick={handleStripeCheckout}
      className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-amber-600 transition"
    >
      Pay with Card
    </button>
  );
};