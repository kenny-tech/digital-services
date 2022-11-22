import React from "react";

import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                    <div class="card" style={{width: '24rem'}}>
                        <div class="card-body">
                            <h5 class="card-title">Register</h5>
                            <form>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Name</label>
                                    <input type="name" class="form-control" id="name" aria-describedby="nmmeHelp" placeholder="Full Name" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">Submit</button>
                                <Link to="/login">
                                    <p className="text-center mt-3 cursor-pointer">Already have an account? Login</p>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
