import { useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { BASE_API_ROUTE, MAKE_PAYMENT_API_ROUTE, VERIFY_PAYMENT_API_ROUTE, VALIDATE_CUSTOMER_API_ROUTE } from "../Route";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FlutterwavePayment = ({amount, phoneNumber, title, description, smartCardNo, item_code, biller_code, biller_name}) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const usertoken = localStorage.getItem("token");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usertoken}`
    }

    const config = {
        public_key: 'FLWPUBK_TEST-58e3361d41799afe58295ffc9c12dbf3-X',
        tx_ref: Date.now(),
        amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: localStorage.getItem('email'),
          phone_number: '',
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
        // console.log('Phone number: ', phoneNumber);
        // console.log('Smart card number: ', smartCardNo);
        setLoading(true);
        if(phoneNumber.length !== 11 && title == 'Buy Airtime') {
            alert('Phone number cannot be blank and must be 11 digits.');
            setLoading(false);
            navigate(0);
        } 

        if(smartCardNo.length !== 10 && title == 'Pay Bills') {
            alert('Smart card number cannot be blank and must be 10 digits.');
            setLoading(false);
            navigate(0);
        } 

        if(title == 'Pay Bills') {
            validateCustomer(item_code, biller_code, smartCardNo);
        } 
       
        handleFlutterPayment({
            callback: (response) => {
                // console.log('Payment response: ',response);

                let txref_data = {
                    tx_ref: response.tx_ref,
                }

                // verify payment
                axios.post(`${BASE_API_ROUTE}${VERIFY_PAYMENT_API_ROUTE}`, txref_data, {
                    headers: headers
                })
                .then(function (response) {
                    // if payment is successfully verified, save payment and recharge number
                    // console.log('Successful payment data: ', response);
                    if(response.data.status === 'success') {
                        let data = {
                            payment_title: title,
                            user_id: localStorage.getItem('user_id'),
                            status: response.data.data.status,
                            tx_ref: response.data.data.tx_ref,
                            response_code: response.data.data.charge_response_code,
                            amount: response.data.data.amount,
                            flw_ref: response.data.data.flw_ref,
                            transaction_id: response.data.data.transaction_id,
                            currency: response.data.data.currency,
                            payment_date: response.data.data.created_at,
                            phone_number: phoneNumber,
                            smart_card_number: smartCardNo,
                            biller_name: biller_name,
                        }

                        // console.log('Payment data: ', data);

                        savePaymentAndRechargeNumber(data);
                       
                        closePaymentModal() // this will close the modal programmatically
                    }
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
            },
            onClose: () => {},
        });
    }

    const savePaymentAndRechargeNumber = (data) => {
        // save payment and recharge number
        axios.post(`${BASE_API_ROUTE}${MAKE_PAYMENT_API_ROUTE}`, data, {
            headers: headers
        })
        .then(function (response) {
            console.log('Payment success response: ',response);
            Swal.fire(
                'Recharge done successfully.',
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

    const validateCustomer = (item_code, biller_code, customer) => {
        let data = {
            item_code,
            biller_code,
            customer
        }

        // validate smart card number or phone number
        axios.post(`${BASE_API_ROUTE}${VALIDATE_CUSTOMER_API_ROUTE}`, data, {
            headers: headers
        })
        .then(function (response) {
            // console.log('Validate customer response: ',response);
        })
        .catch(function (error) {
            setLoading(false);
            Swal.fire(
                'Error!',
                error.response.data.message,
                'error'
            );   
            navigate(0);
        });
        
    }

    return (
        loading ? (<button type="button" className="btn btn-success btn-lg btn-block mb-5">Loading...</button>) : (<button type="button" className="btn btn-success btn-lg btn-block mb-5" onClick={() => handleBuyNow()}>Buy Now</button>)
    )
}

export default FlutterwavePayment