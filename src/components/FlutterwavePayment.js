import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { BASE_API_ROUTE, MAKE_PAYMENT_API_ROUTE } from "../Route";
import axios from "axios";
import Swal from "sweetalert2";

const FlutterwavePayment = ({amount, phoneNumber, title, description, smartCardNo}) => {
    const config = {
        public_key: 'FLWPUBK_TEST-58e3361d41799afe58295ffc9c12dbf3-X',
        tx_ref: Date.now(),
        amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: localStorage.getItem('email'),
          phone_number: phoneNumber,
          name: localStorage.getItem('name'),
        },
        customizations: {
          title: title,
          description: description,
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };
    
    const handleFlutterPayment = useFlutterwave(config);

    const handleBuyNow = () => {
       
        handleFlutterPayment({
            callback: (response) => {
            console.log(response);
                if(response.status === 'successful') {
                    let data = {
                        payment_title: title,
                        user_id: localStorage.getItem('user_id'),
                        status: response.status,
                        tx_ref: response.tx_ref,
                        response_code: response.charge_response_code,
                        amount: response.charged_amount,
                        flw_ref: response.flw_ref,
                        transaction_id: response.transaction_id,
                        currency: response.currency,
                        payment_date: response.created_at,
                        phone_number: phoneNumber
                    }

                axios.post(`${BASE_API_ROUTE}${MAKE_PAYMENT_API_ROUTE}`, data)
                    .then(function (response) {
                        console.log(response);
                        if(response.data.success === true) {
                            Swal.fire(
                                'Good job!',
                                'Payment successful! The airtime has been sent to '.phoneNumber,
                                'success'
                            )   
                        } else {
                            Swal.fire(
                                'Error!',
                                'Unable to process your payment. Please try again',
                                'error'
                            )   
                        }      
                    })
                    .catch(function (error) {
                        Swal.fire(
                            'Error!',
                            error.response.data.message,
                            'error'
                        )   
                    });
                }
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