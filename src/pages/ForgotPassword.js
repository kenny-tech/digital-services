import React from "react";

import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const ForgotPassword = () => {
    return (
        <div className="container-fluid">
            <Navigation />
            <div className="row">
                <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                    <div class="card" style={{width: '24rem'}}>
                        <div class="card-body">
                            <h5 class="card-title">Forgot Password</h5>
                            <form>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the email you used to register" />
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">Submit</button>
                                <Link to="/login">
                                    <p className="text-center mt-3 cursor-pointer">Login</p>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
