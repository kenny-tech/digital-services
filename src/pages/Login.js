import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation";
import { BASE_API_ROUTE, LOGIN_API_ROUTE } from "../Route";
import '../css/Auth.css';

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email.length === 0) {
            setEmailError('Email is required');
        } else if (password.length === 0) {
            setPasswordError('Password is required');
        } else {
            setLoading(true);

            let data = {
                email: email,
                password: password,
            }

            axios.post(`${BASE_API_ROUTE}${LOGIN_API_ROUTE}`, data)
                .then(function (response) {
                    if (response.data.success === true) {
                        localStorage.setItem('token', response.data.data.token);
                        localStorage.setItem('name', response.data.data.name);
                        localStorage.setItem('email', response.data.data.email);
                        localStorage.setItem('user_id', response.data.data.user_id);
                        sessionStorage.setItem("isLoggedIn", "true");
                        navigate('/');
                    } else {
                        setError('Invalid login details.')
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
                    <div className="card" style={{ width: '24rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Login</h5>
                            {
                                error !== '' ? <p className="text-danger">{error}</p> : null
                            }
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" placeholder="Enter email" onChange={event => setEmail(event.target.value)} value={email} />
                                    {emailError && email.length === 0 && <span className="text-danger">{emailError}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" placeholder="Password" onChange={event => setPassword(event.target.value)} value={password} />
                                    {passwordError && password.length === 0 && <span className="text-danger">Password is required</span>}
                                </div>
                                {
                                    loading ? (<button type="submit" disabled={true} className="btn btn-primary btn-block">Submitting...</button>) : (<button type="submit" className="btn btn-primary btn-block">Submit</button>)
                                }                                <Link to="/forgot-password">
                                    <p className="text-center mt-3 cursor-pointer">Forgot Password?</p>
                                </Link>
                                <Link to="/register">
                                    <p className="text-center mt-3 cursor-pointer register">Don't have an account yet? Register</p>
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
