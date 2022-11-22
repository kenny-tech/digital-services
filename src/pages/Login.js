import React from "react";

import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                    <div class="card" style={{width: '24rem'}}>
                        <div class="card-body">
                            <h5 class="card-title">Login</h5>
                            <form>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">Submit</button>
                                <Link to="/forgot-password">
                                    <p className="text-center mt-3 cursor-pointer">Forgot Password?</p>
                                </Link>
                                <Link to="/register">
                                    <p className="text-center mt-3 cursor-pointer">Don't have an account yet? Register</p>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
