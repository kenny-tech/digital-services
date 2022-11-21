import React from "react";
import { Link } from "react-router-dom";
  
import '../css/Airtime.css';

const Airtime = () => {
    return (
        <div className="col-md-6">
            <div className="d-flex justify-content-center h-auto airtimeContainer">
            <div className="mt-5 ml-3 mr-3">
                    <img src="/airtime-recharge.jpeg" class="img-fluid rounded" alt="TV Subscription" />
                    <h2 className="text-center mt-3">Recharge Airtime</h2>
                    <p className="text-center">Top up your phone on any network</p>
                    <Link to="provider" state={{ type: "Airtime" }}>
                        <button type="button" class="btn btn-success btn-lg btn-block mb-5">Buy Now</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Airtime;
