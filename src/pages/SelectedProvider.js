import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_API_ROUTE, GET_BILL_CATEGORIES_API_ROUTE } from "../Route";

import Navigation from "../components/Navigation";
import FlutterwavePayment from "../components/FlutterwavePayment";
import LoadingSpinner from "../components/LoadingSpinner";

const SelectedProvider = () => {

    const location = useLocation();
    const networkName = location.state.networkName;
    const type = location.state.type;
    const usertoken = localStorage.getItem("token");
    const [billerCategory, setBillerCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usertoken}`
    }

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

    useEffect(() => {
        getBillCategories();
    }, []);  

    const getBillCategories = () => {
        setIsLoading(true);
        axios.get(`${BASE_API_ROUTE}${GET_BILL_CATEGORIES_API_ROUTE}`, {
            headers: headers
        })
        .then(function (response) {
            // console.log(response.data.data);
            setIsLoading(false);
            setBillerCategory(response.data.data);
        })
        .catch(function (error) {
            setIsLoading(false);
            setErrorMessage("Unable to fetch user list");
            console.log('error: ',error);
        });
    }

    const [phoneNumber, setPhoneNumber] = useState('');
    const [smartCardNo, setSmartCardNo] = useState('');
    
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
                        type === 'Airtime' ? ( <div className="form-group">
                        <label for="phone">{'Phone Number'}</label>
                        <input type="number" max={11} className="form-control" style={{width: '70%'}} id="phone" placeholder={'Phone number'} onChange={e => setPhoneNumber(e.target.value)} required={true}/>
                    </div>) : ( <div className="form-group">
                        <label for="phone">{'Enter Smart Card Number'}</label>
                        <input type="number" max={11} className="form-control" style={{width: '70%'}} id="phone" placeholder={'Smart Card Number'} onChange={e => setSmartCardNo(e.target.value)} required={true}/>
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
                                            <div className="card bg-light" style={{width: '22rem', height: '13rem'}}>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-center mb-1">
                                                        <img src={`/${networkName}.png`} className="img-fluid mx-auto rounded" alt={item.networkName} width={40} height={40} />
                                                    </div>
                                                    <h3 className="card-text text-center">NGN{item.amount.toLocaleString()}</h3>
                                                    {
                                                        <p className="text-center"></p>
                                                    }
                                                    <FlutterwavePayment amount={item.amount} phoneNumber={phoneNumber} item_code={''} biller_code={''} smartCardNo={''} title={'Buy Airtime'} description={'Payment for Airtime'} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>) : null
                    }
                    {
                        isLoading ? <div><LoadingSpinner /></div> : null
                    }

                    {
                        type === 'Bills' && networkName === 'DSTV' ? (<>
                            {
                                // dstvBillsAmount.map(item => {
                                //     return (
                                //         <div className="col-md-4 mb-3">
                                //             <div className="card bg-light" style={{width: '22rem', height: '13rem'}}>
                                //                 <div className="card-body">
                                //                     <div className="d-flex justify-content-center mb-1">
                                //                         <img src={`/${networkName}.png`} className="img-fluid mx-auto rounded" alt={item.networkName} width={40} height={40} />
                                //                     </div>
                                //                     <h3 className="card-text text-center">NGN{item.amount.toLocaleString()}</h3>
                                //                     {
                                //                         <p className="text-center">{item.label}</p>
                                //                     }
                                //                     <FlutterwavePayment amount={item.amount} phoneNumber={''} smartCardNo={smartCardNo} title={'Pay Bills'} description={'Payment for Bills'} />
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     )
                                // })
                               
                                <div className="row">
                                    {billerCategory && billerCategory.filter(item => item.short_name === 'DSTV').map(category => (
                                        <div className="col-md-4 mb-3">
                                            <div className="card bg-light" style={{width: '22rem', height: '13rem'}}>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-center mb-1">
                                                        <img src={`/${category.short_name}.png`} className="img-fluid mx-auto rounded" alt={category.short_name} width={40} height={40} />
                                                    </div>
                                                <h3 className="card-text text-center">NGN{category.amount.toLocaleString()}</h3>
                                                {
                                                    <p className="text-center">{category.biller_name}</p>
                                                }
                                                <FlutterwavePayment amount={category.amount} item_code={category.item_code} biller_code={category.biller_code} phoneNumber={''} smartCardNo={smartCardNo} title={'Pay Bills'} description={'Payment for Bills'} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        </>
                        ) : null
                    }

                    {
                        type === 'Bills' && networkName === 'GoTv' ? (<>
                            {
                                // gotvBillsAmount.map(item => {
                                //     return (
                                //         <div className="col-md-4 mb-3">
                                //             <div className="card bg-light" style={{width: '22rem', height: '13rem'}}>
                                //                 <div className="card-body">
                                //                     <div className="d-flex justify-content-center mb-1">
                                //                         <img src={`/${networkName}.png`} className="img-fluid mx-auto rounded" alt={item.networkName} width={40} height={40} />
                                //                     </div>
                                //                     <h3 className="card-text text-center">NGN{item.amount.toLocaleString()}</h3>
                                //                     {
                                //                         <p className="text-center">{item.label}</p>
                                //                     }
                                //                     <FlutterwavePayment amount={item.amount} phoneNumber={''} smartCardNo={smartCardNo} title={'Pay Bills'} description={'Payment for Bills'} />
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     )
                                // })
                                <div className="row">
                                    {billerCategory && billerCategory.filter(item => item.short_name === 'GOTV').map(category => (
                                        <div className="col-md-4 mb-3">
                                            <div className="card bg-light" style={{width: '22rem', height: '13rem'}}>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-center mb-1">
                                                        <img src={`/${category.short_name}.png`} className="img-fluid mx-auto rounded" alt={category.short_name} width={40} height={40} />
                                                    </div>
                                                <h3 className="card-text text-center">NGN{category.amount.toLocaleString()}</h3>
                                                {
                                                    <p className="text-center">{category.biller_name}</p>
                                                }
                                                <FlutterwavePayment amount={category.amount} item_code={category.item_code} biller_code={category.biller_code}phoneNumber={''} smartCardNo={smartCardNo} title={'Pay Bills'} description={'Payment for Bills'} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
