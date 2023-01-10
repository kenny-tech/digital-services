import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

const FlutterwavePayment = ({amount, phoneNumber}) => {
    const config = {
        public_key: 'FLWPUBK_TEST-58e3361d41799afe58295ffc9c12dbf3-X',
        tx_ref: Date.now(),
        amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: 'user@gmail.com',
          phone_number: phoneNumber,
          name: 'john doe',
        },
        customizations: {
          title: 'my Payment Title',
          description: 'Payment for items in cart',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };
    
    const handleFlutterPayment = useFlutterwave(config);

    const handleBuyNow = () => {
        alert(amount)
        // alert(amount);
        handleFlutterPayment({
            callback: (response) => {
            console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
        });
    }

    return (
        <button type="button" class="btn btn-success btn-lg btn-block mb-5" onClick={() => handleBuyNow()}>Buy Now</button>
    )
}

export default FlutterwavePayment