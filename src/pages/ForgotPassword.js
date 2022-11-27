import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { BASE_API_ROUTE, FORGOT_PASSWORD_API_ROUTE } from "../Route";

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(email.length === 0) {
            setEmailError('Email is required');
        } else {
            setLoading(true);

            let data = {
                email: email,
            }

            axios.post(`${BASE_API_ROUTE}${FORGOT_PASSWORD_API_ROUTE}`, data)
              .then(function (response) {
                if(response.data.success === true) {
                    Swal.fire(
                        'Good job!',
                        response.data.message,
                        'success'
                      )                
                } else {
                    setError('Wrong email supplied.')
                }      
              })
              .catch(function (error) {
                setError(error.response.data.message);
                setLoading(false);
              });
       }

    }

    return (
        <div className="container-fluid">
            <Navigation />
            <div className="row">
                <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                    <div class="card" style={{width: '24rem'}}>
                        <div class="card-body">
                            <h5 class="card-title">Forgot Password</h5>
                            {
                                error !== '' ? <p className="text-danger">{error}</p> : null
                            }
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" placeholder="Enter the email you used to register" onChange={event => setEmail(event.target.value)} value={email} />
                                    {emailError && email.length === 0 && <span className="text-danger">{emailError}</span>}
                                </div>
                                {
                                    loading ? (<button type="submit" disabled={true} class="btn btn-primary btn-block">Submitting...</button>) : (<button type="submit" className="btn btn-primary btn-block">Submit</button>)
                                }                                   <Link to="/login">
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
