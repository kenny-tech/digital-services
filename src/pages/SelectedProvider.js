import React from "react";
import { useLocation } from "react-router-dom";

import RechargeAmount from "../components/RechargeAmount";
import Phone from "../components/Phone";

const SelectedProvider = () => {

    const location = useLocation();
    const networkName = location.state.networkName;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h1>{networkName}</h1>
                </div>
                <div className="col-12 mb-3">
                    <Phone />
                </div>
                <RechargeAmount network={networkName} amount="NGN100" />
                <RechargeAmount network={networkName} amount="NGN200" />
                <RechargeAmount network={networkName} amount="NGN500" />
                <RechargeAmount network={networkName} amount="NGN1000" />
                <RechargeAmount network={networkName} amount="NGN1,500" />
                <RechargeAmount network={networkName} amount="NGN2,500" />
                <RechargeAmount network={networkName} amount="NGN3,000" />
                <RechargeAmount network={networkName} amount="NGN4,000" />
                <RechargeAmount network={networkName} amount="NGN5,000" />
            </div>
        </div>
    )
}

export default SelectedProvider;
