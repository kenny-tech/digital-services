import { useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { BASE_API_ROUTE, MAKE_PAYMENT_API_ROUTE, VERIFY_PAYMENT_API_ROUTE, VALIDATE_CUSTOMER_API_ROUTE } from "../Route";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../services/alert";

const FlutterwavePayment = ({ amount, phoneNumber, title, description, smartCardNo, item_code, biller_code, biller_name, meterNumber, accountNumber, customAmount }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    let phone = '+234' + phoneNumber.substring(1);

    const usertoken = localStorage.getItem("token");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usertoken}`
    }

    if (title === 'Payment for Electricity') {
        amount = customAmount;
    }

    const config = {
        public_key: 'FLWPUBK-6c675eeb5e923f572a94c100503d0fe1-X',
        tx_ref: Date.now(),
        amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: localStorage.getItem('email'),
            phone_number: phone,
            name: localStorage.getItem('name'),
        },
        customizations: {
            title: title,
            description: description,
            logo: 'https://digitalstore.cakamba.com/logo.jpeg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    const handleBuyNow = () => {
        setLoading(true);
        if (phoneNumber.length !== 11 && (title === 'Buy Airtime' || title === 'Buy Data')) {
            alert('Phone number cannot be blank and must be 11 digits.');
            setLoading(false);
            navigate(0);
        }

        if (smartCardNo.length !== 10 && title === 'Pay Bills') {
            alert('Smart card number cannot be blank and must be 10 digits.');
            setLoading(false);
            navigate(0);
        }

        if (meterNumber.length === 0 && customAmount.length === 0 && title === 'Payment for Electricity') {
            alert('Meter number and Amount are both required');
            setLoading(false);
            navigate(0);
        }

        if (accountNumber.length === 0 && title === 'Payment for Wifi') {
            alert('Account Number is required');
            setLoading(false);
            navigate(0);
        }

        if (title === 'Pay Bills' || title === 'Payment for Electricity' || title === 'Payment for Wifi') {
            let customer;
            if(title === 'Pay Bills') {
                customer = smartCardNo;
            }
            if(title === 'Payment for Electricity') {
                customer = meterNumber;
            }
            if(title === 'Payment for Wifi') {
                customer = accountNumber;
            }

            // Call the validateCustomer function
            (async () => {
                try {
                    const customerData = await validateCustomer(item_code, biller_code, customer);
                    if (customerData && customerData.response_code === "00") {
                        alert(`Payment for ${smartCardNo} (${customerData.name}). Amount - NGN${amount.toLocaleString()}`);
                        handleFlutterPayment({
                            callback: (response) => {
                
                                let txref_data = {
                                    tx_ref: response.tx_ref,
                                }
                
                                // verify payment
                                axios.post(`${BASE_API_ROUTE}${VERIFY_PAYMENT_API_ROUTE}`, txref_data, {
                                    headers: headers
                                })
                                    .then(function (response) {
                                        // if payment is successfully verified, save payment and recharge number
                                        console.log('Successful payment response : ', response);
                                        if (response.data.status === 'success') {
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
                                                phone_number: phone,
                                                smart_card_number: smartCardNo,
                                                biller_name: biller_name,
                                                meter_number: meterNumber,
                                                account_number: accountNumber
                                            }
                
                                            // console.log('Payment data: ', data);
                
                                            savePaymentAndRechargeNumber(data);
                
                                            closePaymentModal() // this will close the modal programmatically
                                        }
                                        setLoading(false);
                                    })
                                    .catch(function (error) {
                                        // console.log('Error payment : ',error);
                                        setLoading(false);
                                        errorAlert(error.response.data.message);
                                    });
                            },
                            onClose: () => { },
                        });
                    } else {
                        alert(`The number (${customer}) is not correct. Please check and try again.`);
                        navigate(0);
                    }
                } catch (error) {
                    console.log('Error occurred while validating customer: ', error);
                }
            })();
        }
    }

    const savePaymentAndRechargeNumber = (data) => {
        // save payment and recharge number
        axios.post(`${BASE_API_ROUTE}${MAKE_PAYMENT_API_ROUTE}`, data, {
            headers: headers
        })
            .then(function (response) {
                successAlert('Payment successful');
                setLoading(false);
            })
            .catch(function (error) {
                // console.log('Error: ',error);
                errorAlert(error.response.data.message);
                setLoading(false);
            });
    }

    const validateCustomer = async (item_code, biller_code, customer) => {
        let data = {
            item_code,
            biller_code,
            customer
        }

        try {
            const response = await axios.post(`${BASE_API_ROUTE}${VALIDATE_CUSTOMER_API_ROUTE}`, data, {
                headers: headers
            });
            return response.data.data;
        } catch (error) {
            console.log('Validate customer error: ', error);
            setLoading(false);
            errorAlert(error.response.data.message);
            throw error;
        }

    }

    return (
        loading ? (<button type="button" className="btn btn-success btn-lg btn-block mb-5">Loading...</button>) : (<button type="button" className="btn btn-success btn-lg btn-block mb-5" onClick={() => handleBuyNow()}>Buy Now</button>)
    )
}

export default FlutterwavePayment