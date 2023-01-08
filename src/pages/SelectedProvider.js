import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import Navigation from "../components/Navigation";

const SelectedProvider = () => {

    const location = useLocation();
    const networkName = location.state.networkName;
    const type = location.state.type;

    let rechargeAmount = [
        {
          "id": 1,
          "amount": 100
        },
        {
            "id": 2,
            "amount": 200
        },
        {
            "id": 3,
            "amount": 500
        },
        {
            "id": 4,
            "amount": 1000
        },
        {
            "id": 5,
            "amount": 2000
        },
        {
            "id": 6,
            "amount": 3000
        },
    ]

    let dstvBillsAmount = [
        {
          "id": 1,
          "amount": 1000,
          "label": 'DSTV Starter'
        },
        {
            "id": 2,
            "amount": 2000,
            "label": 'DSTV Medium'
        },
        {
            "id": 3,
            "amount": 5000,
            "label": 'DSTV Max'
        },
        {
            "id": 4,
            "amount": 10000,
            "label": 'DSTV Basuc'
        },
        {
            "id": 5,
            "amount": 20000,
            "label": 'DSTV Standard'
        },
        {
            "id": 6,
            "amount": 35000,
            "label": 'DSTV Premium'
        },
    ]

    let gotvBillsAmount = [
        {
          "id": 1,
          "amount": 1000,
          "label": 'GoTv Starter'
        },
        {
            "id": 2,
            "amount": 2000,
            "label": 'GoTv Medium'
        },
        {
            "id": 3,
            "amount": 5000,
            "label": 'GoTv Max'
        },
        {
            "id": 4,
            "amount": 10000,
            "label": 'GoTv Basuc'
        },
        {
            "id": 5,
            "amount": 20000,
            "label": 'GoTv Standard'
        },
        {
            "id": 6,
            "amount": 35000,
            "label": 'GoTv Premium'
        },
    ]

    const [amountSelected, setAmountSelected] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [smartCardNo, setSmartCardNo] = useState('');

    const handleBuyNow = (amountToRecharge) => {
        setAmountSelected(amountToRecharge);
        // alert(amount);
        handleFlutterPayment({
            callback: (response) => {
            console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
        });
    }

    const config = {
        public_key: 'FLWPUBK_TEST-X',
        tx_ref: Date.now(),
        amount: amountSelected,
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

    return (
        <div className="container-fluid mt-3 mb-3">
            <Navigation />
            <br/>
            <div className="row">
                <div className="col-md-12 mb-3 ml-3">
                    <h1>{networkName}</h1>
                </div>
                <div className="col-12 mb-3 ml-3">
                    {
                        type === 'Airtime' ? ( <div class="form-group">
                        <label for="phone">{'Phone Number'}</label>
                        <input type="text" max={11} class="form-control" style={{width: '70%'}} id="phone" placeholder={'Enter phone number to recharge'} onChange={e => setPhoneNumber(e.target.value)} />
                    </div>) : ( <div class="form-group">
                        <label for="phone">{'Enter Smart Card Number'}</label>
                        <input type="text" max={11} class="form-control" style={{width: '70%'}} id="phone" placeholder={'Smart Card Number'} onChange={e => setSmartCardNo(e.target.value)} />
                    </div>)
                    }
                </div>
                
                <div className="row ml-3">
                    {
                        type === 'Airtime' ? (
                        <>
                            {
                                rechargeAmount.map(item => {
                                    return (
                                        <div className="col-md-4 mb-3">
                                            <div class="card bg-light" style={{width: '22rem', height: '13rem'}}>
                                                <div class="card-body">
                                                    <div className="d-flex justify-content-center mb-1">
                                                        <img src={`/${networkName}.png`} class="img-fluid mx-auto rounded" alt={item.networkName} width={40} height={40} />
                                                    </div>
                                                    <h3 class="card-text text-center">NGN{item.amount.toLocaleString()}</h3>
                                                    {
                                                        <p className="text-center"></p>
                                                    }
                                                    <button type="button" class="btn btn-success btn-lg btn-block mb-5" onClick={() => handleBuyNow(item.amount)}>Buy Now</button>
                                                    {/* <button
                                                        onClick={() => {
                                                        handleFlutterPayment({
                                                            callback: (response) => {
                                                            console.log(response);
                                                                closePaymentModal() // this will close the modal programmatically
                                                            },
                                                            onClose: () => {},
                                                        });
                                                        }}
                                                        class="btn btn-success btn-lg btn-block mb-5"
                                                    >
                                                        Buy Now
                                                    </button> */}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>) : null
                    }

                    {
                        type === 'Bills' && networkName === 'DSTV' ? (<>
                            {
                                dstvBillsAmount.map(item => {
                                    return (
                                        <div className="col-md-4 mb-3">
                                            <div class="card bg-light" style={{width: '22rem', height: '13rem'}}>
                                                <div class="card-body">
                                                    <div className="d-flex justify-content-center mb-1">
                                                        <img src={`/${networkName}.png`} class="img-fluid mx-auto rounded" alt={item.networkName} width={40} height={40} />
                                                    </div>
                                                    <h3 class="card-text text-center">NGN{item.amount.toLocaleString()}</h3>
                                                    {
                                                        <p className="text-center">{item.label}</p>
                                                    }
                                                    <button type="button" class="btn btn-success btn-lg btn-block mb-5" onClick={() => handleBuyNow(item.amount)}>Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                        ) : null
                    }

                    {
                        type === 'Bills' && networkName === 'GoTv' ? (<>
                            {
                                gotvBillsAmount.map(item => {
                                    return (
                                        <div className="col-md-4 mb-3">
                                            <div class="card bg-light" style={{width: '22rem', height: '13rem'}}>
                                                <div class="card-body">
                                                    <div className="d-flex justify-content-center mb-1">
                                                        <img src={`/${networkName}.png`} class="img-fluid mx-auto rounded" alt={item.networkName} width={40} height={40} />
                                                    </div>
                                                    <h3 class="card-text text-center">NGN{item.amount.toLocaleString()}</h3>
                                                    {
                                                        <p className="text-center">{item.label}</p>
                                                    }
                                                    <button type="button" class="btn btn-success btn-lg btn-block mb-5" onClick={() => handleBuyNow(item.amount)}>Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectedProvider;
