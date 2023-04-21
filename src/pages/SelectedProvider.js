import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_API_ROUTE, GET_BILL_CATEGORIES_API_ROUTE } from "../Route";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Navigation from "../components/Navigation";
import FlutterwavePayment from "../components/FlutterwavePayment";
import LoadingSpinner from "../components/LoadingSpinner";
import WithAuth from "../services/withAuth";

const SelectedProvider = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const networkName = location.state.networkName;
    const type = location.state.type;
    const usertoken = localStorage.getItem("token");
    const [billerCategory, setBillerCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isAirtime, setIsAirtime] = useState(true);

    // console.log('Network Name: ', networkName);
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
            "amount": 1500
        },
        {
            "id": 6,
            "amount": 2000
        },
        {
            "id": 7,
            "amount": 3000
        },
        {
            "id": 8,
            "amount": 4000
        },
        {
            "id": 9,
            "amount": 5000
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
                console.log('Bill categories: ', response.data.data);
                setIsLoading(false);
                setBillerCategory(response.data.data);
            })
            .catch(function (error) {
                setIsLoading(false);
                setErrorMessage("Unable to fetch Bills");
                console.log('Error message; ', error.response.data.message)
                console.log('error: ', error);
                if (error.response.data.message === 'Unauthenticated') {
                    Swal.fire(
                        'Error!',
                        'Your session has expired. Please login again to continue.',
                        'error'
                    )
                    navigate('/login');
                }
            });
    }

    const handleAirtimeTypeChange = (e) => {
        let type = e.target.value;
        if (type === 'Airtime') {
            setIsAirtime(true);
        } else {
            setIsAirtime(false);
        }
    }

    const [phoneNumber, setPhoneNumber] = useState('');
    const [smartCardNo, setSmartCardNo] = useState('');

    return (
        <div className="container-fluid mt-3 mb-3">
            <Navigation />
            <br />
            <div className="row">
                <div className="col-md-12 mb-3 ml-3">
                    <h1>{networkName}</h1>
                </div>
                <div className="col-12 mb-3 ml-3">
                    {
                        type === 'Airtime' ? (<><div className="form-group">
                            <label for="phone">{'Phone Number'}</label>
                            <input type="number" max={11} className="form-control" style={{ width: '70%' }} id="phone" placeholder={'Phone number'} onChange={e => setPhoneNumber(e.target.value)} required={true} />
                        </div>
                            <div className="form-group">
                                <label for="type">{'Select whether Airtime or Data'}</label>
                                <select className="form-control" name='type' style={{ width: '70%' }} onChange={(e) => handleAirtimeTypeChange(e)}>
                                    <option value={'Airtime'}>Airtime</option>
                                    <option value={'Data'}>Data</option>
                                </select>
                            </div></>) : (<div className="form-group">
                                <label for="phone">{'Enter Smart Card Number'}</label>
                                <input type="number" max={11} className="form-control" style={{ width: '70%' }} id="phone" placeholder={'Smart Card Number'} onChange={e => setSmartCardNo(e.target.value)} required={true} />
                            </div>)
                    }
                </div>

                <div className="row ml-3">
                    {
                        type === 'Airtime' && isAirtime ? (
                            <>
                                {
                                    rechargeAmount.map(item => {
                                        return (
                                            <div className="col-md-4 mb-3">
                                                <div className="card bg-light" style={{ width: '22rem', height: '13rem' }}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center mb-1">
                                                            <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" alt={item.networkName} width={40} height={40} />
                                                        </div>
                                                        <h3 className="card-text text-center">NGN{item.amount.toLocaleString()}</h3>
                                                        <p className="text-center">Airtime</p>
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
                        type === 'Airtime' && !isAirtime && networkName === 'MTN' ? (<>
                            {
                                isLoading ? <div><LoadingSpinner /></div> : (<div className="row ml-2">
                                    {

                                        billerCategory && billerCategory.filter(item => item.biller_code === 'BIL108').map(category => (
                                            <div className="col-md-4 mb-3">
                                                <div className="card bg-light" style={{ width: '22rem', height: '13rem' }}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center mb-1">
                                                            <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" width={40} height={40} alt="" />
                                                        </div>
                                                        <h3 className="card-text text-center">NGN{category.amount.toLocaleString()}</h3>
                                                        {
                                                            <p className="text-center">{category.biller_name}</p>
                                                        }
                                                        <FlutterwavePayment amount={category.amount} item_code={category.item_code} biller_code={category.biller_code} biller_name={category.biller_name} phoneNumber={phoneNumber} smartCardNo={''} title={'Buy Data'} description={'Payment for Data'} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>)
                            }
                        </>) : (<></>)
                    }

                    {
                        type === 'Airtime' && !isAirtime && networkName === 'Airtel' ? (<>
                            {
                                isLoading ? <div><LoadingSpinner /></div> : (<div className="row ml-2">
                                    {

                                        billerCategory && billerCategory.filter(item => item.biller_code === 'BIL110').map(category => (
                                            <div className="col-md-4 mb-3">
                                                <div className="card bg-light" style={{ width: '22rem', height: '13rem' }}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center mb-1">
                                                            <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" width={40} height={40} alt="" />
                                                        </div>
                                                        <h3 className="card-text text-center">NGN{category.amount.toLocaleString()}</h3>
                                                        {
                                                            <p className="text-center">{category.biller_name}</p>
                                                        }
                                                        <FlutterwavePayment amount={category.amount} item_code={category.item_code} biller_code={category.biller_code} biller_name={category.biller_name} phoneNumber={phoneNumber} smartCardNo={''} title={'Buy Data'} description={'Payment for Data'} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>)
                            }
                        </>) : (<></>)
                    }

                    {
                        type === 'Airtime' && !isAirtime && networkName === 'Glo' ? (<>
                            {
                                isLoading ? <div><LoadingSpinner /></div> : (<div className="row ml-2">
                                    {

                                        billerCategory && billerCategory.filter(item => item.biller_code === 'BIL109').map(category => (
                                            <div className="col-md-4 mb-3">
                                                <div className="card bg-light" style={{ width: '22rem', height: '13rem' }}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center mb-1">
                                                            <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" width={40} height={40} alt="" />
                                                        </div>
                                                        <h3 className="card-text text-center">NGN{category.amount.toLocaleString()}</h3>
                                                        {
                                                            <p className="text-center">{category.biller_name}</p>
                                                        }
                                                        <FlutterwavePayment amount={category.amount} item_code={category.item_code} biller_code={category.biller_code} biller_name={category.biller_name} phoneNumber={phoneNumber} smartCardNo={''} title={'Buy Data'} description={'Payment for Data'} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>)
                            }
                        </>) : (<></>)
                    }

                    {
                        type === 'Airtime' && !isAirtime && networkName === '9Mobile' ? (<>
                            {
                                isLoading ? <div><LoadingSpinner /></div> : (<div className="row ml-2">
                                    {

                                        billerCategory && billerCategory.filter(item => item.biller_code === 'BIL111').map(category => (
                                            <div className="col-md-4 mb-3">
                                                <div className="card bg-light" style={{ width: '22rem', height: '13rem' }}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center mb-1">
                                                            <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" width={40} height={40} alt="" />
                                                        </div>
                                                        <h3 className="card-text text-center">NGN{category.amount.toLocaleString()}</h3>
                                                        {
                                                            <p className="text-center">{category.biller_name}</p>
                                                        }
                                                        <FlutterwavePayment amount={category.amount} item_code={category.item_code} biller_code={category.biller_code} biller_name={category.biller_name} phoneNumber={phoneNumber} smartCardNo={''} title={'Buy Data'} description={'Payment for Data'} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>)
                            }
                        </>) : (<></>)
                    }

                    {
                        type === 'Bills' && networkName === 'DSTV' ? (<>
                            {
                                isLoading ? <div><LoadingSpinner /></div> : (<div className="row ml-2">
                                    {

                                        billerCategory && billerCategory.filter(item => item.biller_name.split(" ")[0] === 'DSTV' && item.country === 'NG').map(category => (
                                            <div className="col-md-4 mb-3">
                                                <div className="card bg-light" style={{ width: '22rem', height: '13rem' }}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center mb-1">
                                                            <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" width={40} height={40} alt="" />
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

                    {
                        type === 'Bills' && networkName === 'GoTv' ? (<>
                            {
                                isLoading ? <div><LoadingSpinner /></div> : (<div className="row ml-2">
                                    {
                                        billerCategory && billerCategory.filter(item => (item.biller_name.split(" ")[0] === 'GOTV' || item.biller_name.split(" ")[0] === 'GOtv') && item.country === 'NG').map(category => (
                                            <div className="col-md-4 mb-3">
                                                <div className="card bg-light" style={{ width: '22rem', height: '13rem' }}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center mb-1">
                                                            <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" width={40} height={40} alt="" />
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

                {
                        type === 'Bills' && networkName === 'Electricity' ? (<>
                            {
                                isLoading ? <div><LoadingSpinner /></div> : (<div className="row ml-2">
                                    {
                                        billerCategory && billerCategory.filter(item => (item.label_name.split(" ")[0] === 'Meter') && item.country === 'NG').map(category => (
                                            <div className="col-md-4 mb-3">
                                                <div className="card bg-light" style={{ width: '22rem', height: '13rem' }}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center mb-1">
                                                            <img src={`/${networkName.toLowerCase()}.png`} className="img-fluid mx-auto rounded" width={40} height={40} alt="" />
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

export default WithAuth(SelectedProvider);
