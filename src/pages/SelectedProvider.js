import React from "react";
import { useLocation } from "react-router-dom";

import RechargeAmount from "../components/RechargeAmount";
import RechargeNumber from "../components/RechargeNumber";

const SelectedProvider = () => {

    const location = useLocation();
    const networkName = location.state.networkName;
    const type = location.state.type;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h1>{networkName}</h1>
                </div>
                <div className="col-12 mb-3">
                    {
                        type === 'Airtime' ? (<RechargeNumber label="Phone Number" placeHolder="Enter phone number to recharge"/>) : (<RechargeNumber label="Smart Card Number" placeHolder="Enter smart card number"/>)
                    }
                </div>
                {
                    type === 'Airtime' ? (<><RechargeAmount network={networkName} amount="NGN100" />
                    <RechargeAmount network={networkName} amount="NGN200" label="" />
                    <RechargeAmount network={networkName} amount="NGN500" label="" />
                    <RechargeAmount network={networkName} amount="NGN1000" label="" />
                    <RechargeAmount network={networkName} amount="NGN1,500" label="" />
                    <RechargeAmount network={networkName} amount="NGN2,500" label="" />
                    <RechargeAmount network={networkName} amount="NGN3,000" label="" />
                    <RechargeAmount network={networkName} amount="NGN4,000" label="" />
                    <RechargeAmount network={networkName} amount="NGN5,000" label="" /></>) : null
                }

                {
                    type === 'Bills' && networkName === 'DSTV' ? (<><RechargeAmount network={networkName} amount="NGN1000" label="DSTV Starter" />
                    <RechargeAmount network={networkName} amount="NGN2,000" label="DSTV Standard" />
                    <RechargeAmount network={networkName} amount="NGN3,000" label="DSTV Pro" />
                    <RechargeAmount network={networkName} amount="NGN4,000" label="DSTV Super" />
                    <RechargeAmount network={networkName} amount="NGN5,000" label="DSTV Classic" />
                    <RechargeAmount network={networkName} amount="NGN6,000" label="DSTV Premium" /></>) : null
                }

                {
                    type === 'Bills' && networkName === 'GoTv' ? (<><RechargeAmount network={networkName} amount="NGN1000" label="GoTV Starter" />
                    <RechargeAmount network={networkName} amount="NGN1000" label="GoTV Standard" />
                    <RechargeAmount network={networkName} amount="NGN2000" label="GoTV Jolly"/>
                    <RechargeAmount network={networkName} amount="NGN3000" label="GoTV Plus"/>
                    <RechargeAmount network={networkName} amount="NGN4,000" label="GoTV Pro"/>
                    <RechargeAmount network={networkName} amount="NGN5,000" label="GoTV Premium"/></>) : null
                }
            </div>
        </div>
    )
}

export default SelectedProvider;
