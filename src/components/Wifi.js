import React from "react";
import { Link } from "react-router-dom";

import '../css/Bills.css';

const Wifi = () => {
    return (
        <div className="col-md-3 mb-3">
            <div className="d-flex justify-content-center h-auto billsContainer">
                <div className="mt-5 ml-3 mr-3">
                    <img src="/wifi.png" className="img-fluid rounded" alt="TV Subscription" />
                    <h4 className="text-center mt-3">WiFi</h4>
                    <p className="text-center">Renew your WiFi Subscription</p>
                    {
                        localStorage.getItem('token') !== null ? ( <Link to="provider" state={{ type: "Bills" }}>
                            <button type="button" className="btn btn-success btn-lg btn-block mb-5">Renew Now</button>
                        </Link>) : (<Link to="login">
                            <button type="button" className="btn btn-success btn-lg btn-block mb-5">Buy Now</button>
                        </Link>)
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Wifi;
