import React from "react";
import { Link } from "react-router-dom";
  
import '../css/Airtime.css';

const Electricity = () => {
    return (
        <div className="col-md-3 mb-3">
            <div className="d-flex justify-content-center h-auto airtimeContainer">
            <div className="mt-5 ml-3 mr-3">
                    <img src="/electricity.png" className="img-fluid rounded" alt="Airtime" />
                    <h4 className="text-center mt-3">Electricity</h4>
                    <p className="text-center">Pay your Electricity Bills</p>
                    {
                        localStorage.getItem('token') !== null ? ( <Link to="/selected-provider" state={{ networkName: "Electricity", type: "Bills" }}>
                        <button type="button" className="btn btn-success btn-lg btn-block mb-5">Buy Now</button>
                    </Link>) : (<Link to="login">
                        <button type="button" className="btn btn-success btn-lg btn-block mb-5">Buy Now</button>
                    </Link>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Electricity;
