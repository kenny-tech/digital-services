import React from "react";

import '../css/Bills.css';

const Bills = () => {
    return (
        <div className="col-md-6">
            <div className="d-flex justify-content-center h-auto billsContainer">
                <div className="mt-5 ml-3 mr-3">
                    <img src="/cable-tv-subscription.jpeg" class="img-fluid rounded" alt="TV Subscription" />
                    <h2 className="text-center mt-3">TV Subscription</h2>
                    <p className="text-center">Renew your TV Subscription</p>
                    <button type="button" class="btn btn-primary btn-lg btn-block mb-5">Renew Now</button>
                </div>
            </div>
        </div>
    )
}

export default Bills;
