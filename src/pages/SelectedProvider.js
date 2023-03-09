import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_API_ROUTE, GET_BILL_CATEGORIES_API_ROUTE } from "../Route";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Navigation from "../components/Navigation";
import FlutterwavePayment from "../components/FlutterwavePayment";
import LoadingSpinner from "../components/LoadingSpinner";

const SelectedProvider = () => {

    const navigate = useNavigate()
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

    useEffect(() => {
        getBillCategories();
    }, []);  

    const getBillCategories = () => {
        setIsLoading(true);
        axios.get(`${BASE_API_ROUTE}${GET_BILL_CATEGORIES_API_ROUTE}`, {
            headers: headers
        })
        .then(function (response) {
            console.log('Bill categories: ',response.data.data);
            setIsLoading(false);
            setBillerCategory(response.data.data);
        })
        .catch(function (error) {
            setIsLoading(false);
            setErrorMessage("Unable to fetch user list");
            console.log('Error message; ', error.response.data.message)
            console.log('error: ',error);
            if(error.response.data.message === 'Unauthenticated') {
                Swal.fire(
                    'Error!',
                    'Your session has expired. Please login again to continue.',
                    'error'
                )
                navigate('/login');
            }
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
                                                        <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" alt={item.networkName} width={40} height={40} />
                                                    </div>
                                                    <h3 className="card-text text-center">NGN{item.amount.toLocaleString()}</h3>
                                                    {
                                                        <p className="text-center"></p>
                                                    }
                                                    <FlutterwavePayment amount={item.amount} phoneNumber={phoneNumber} item_code={''} biller_code={''} biller_name={''} smartCardNo={''} title={'Buy Airtime'} description={'Payment for Airtime'} />
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
                                isLoading ? <div><LoadingSpinner /></div> : ( <div className="row ml-2">
                                {
                                    
                                billerCategory && billerCategory.filter(item => item.biller_name.split(" ")[0] === 'DSTV' && item.country === 'NG').map(category => (
                                    <div className="col-md-4 mb-3">
                                        <div className="card bg-light" style={{width: '22rem', height: '13rem'}}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-center mb-1">
                                                    <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" width={40} height={40} />
                                                </div>
                                            <h3 className="card-text text-center">NGN{category.amount.toLocaleString()}</h3>
                                            {
                                                <p className="text-center">{category.biller_name}</p>
                                            }
                                            <FlutterwavePayment amount={category.amount} item_code={category.item_code} biller_code={category.biller_code} biller_name={category.biller_name} phoneNumber={''} smartCardNo={smartCardNo} title={'Pay Bills'} description={'Payment for Bills'} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>)
                            
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
                                isLoading ? <div><LoadingSpinner /></div> : ( <div className="row ml-2">
                                {
                                billerCategory && billerCategory.filter(item => (item.biller_name.split(" ")[0] === 'GOTV' || item.biller_name.split(" ")[0] === 'GOtv' ) && item.country === 'NG').map(category => (
                                    <div className="col-md-4 mb-3">
                                        <div className="card bg-light" style={{width: '22rem', height: '13rem'}}> 
                                            <div className="card-body">
                                                <div className="d-flex justify-content-center mb-1">
                                                <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" width={40} height={40} />
                                                </div>
                                            <h3 className="card-text text-center">NGN{category.amount.toLocaleString()}</h3> 
                                            {
                                                <p className="text-center">{category.biller_name}</p>
                                            }
                                            <FlutterwavePayment amount={category.amount} item_code={category.item_code} biller_code={category.biller_code} biller_name={category.biller_name} phoneNumber={''} smartCardNo={smartCardNo} title={'Pay Bills'} description={'Payment for Bills'} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>)
                                
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
