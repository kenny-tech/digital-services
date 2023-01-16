import { useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { BASE_API_ROUTE, MAKE_PAYMENT_API_ROUTE } from "../Route";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FlutterwavePayment = ({amount, phoneNumber, title, description, smartCardNo}) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        if(phoneNumber.length === 0) {
            alert('Phone number cannot be blank and must be 11 characters.');
            setLoading(false);
            navigate(0);
        } 
       
        handleFlutterPayment({
            callback: (response) => {
            // console.log('Payment response: ',response);
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
                
                const usertoken = localStorage.getItem("token");

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usertoken}`
                }

                axios.post(`${BASE_API_ROUTE}${MAKE_PAYMENT_API_ROUTE}`, data, {
                    headers: headers
                })
                    .then(function (response) {
                        // console.log(response);
                        Swal.fire(
                            'Airtime sent successfully.',
                            'Payment successful!',
                            'success'
                        )   
                        setLoading(false);    
                    })
                    .catch(function (error) {
                        // console.log('Error: ',error);
                        setLoading(false);
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
        loading ? (<button type="button" className="btn btn-success btn-lg btn-block mb-5">Loading...</button>) : (<button type="button" className="btn btn-success btn-lg btn-block mb-5" onClick={() => handleBuyNow()}>Buy Now</button>)
    )
}

export default FlutterwavePayment