import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Error from "../components/Error";
import { BASE_API_ROUTE, REGISTER_API_ROUTE } from "../Route";

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordLenghError, setPasswordLengthError] = useState('');
    const [confirmPasswordLenghError, setConfirmPasswordLengthError] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (name.length === 0) {
            setNameError('Name is required');
        } else if(email.length === 0) {
            setEmailError('Email is required');
        } else if(password.length === 0) {
            setPasswordError('Password is required');
        } else if(password.length < 6) {
            setPasswordLengthError('Password length must be 6 characters or more');
        } else if(confirmPassword.length === 0) {
            setConfirmPasswordError('Confirm Password is required');
        }  else if(confirmPassword.length < 6) {
            setConfirmPasswordLengthError('Confirm Password length must be 6 characters or more');
        } else if(password !== confirmPassword ) {
            setConfirmPasswordError('Password and Confirm Password must match');
        } else {
            let data = {
                name: name,
                email: email,
                password: password,
                confirm_password: confirmPassword
            }

            axios.post(`${BASE_API_ROUTE}${REGISTER_API_ROUTE}`, data)
              .then(function (response) {
                console.log(response);
                alert('Registration successful. Please check your email for instruction on how to activate your account.');
              })
              .catch(function (error) {
                // console.log('error: ',error.response.data.errors)
                setErrors(error.response.data.errors);
              });
       }

    }

    return (
        <div className="container-fluid">
            <Navigation />
            <div className="row">
                <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                    <div className="card" style={{width: '24rem'}}>
                        <div className="card-body">
                            <h5 class="card-title">Register</h5>
                            <ul>
                                {Object.keys(errors).map((error, index) => (
                                    <Error
                                    message={errors[error][0]}
                                    // key={shortid.generate()}
                                    />
                                ))}
                            </ul>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Name</label>
                                    <input type="text" className="form-control" placeholder="Full Name" name="name" onChange={event => setName(event.target.value)} value={name} />
                                    {nameError && name.length === 0 && <span className="text-danger">{nameError}</span>}
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" placeholder="Email Address" name="email" onChange={event => setEmail(event.target.value)} value={email} />
                                    {emailError && email.length === 0 && <span className="text-danger">{emailError}</span>}
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={event => setPassword(event.target.value)} value={password} />
                                    {passwordError && password.length === 0 && <span className="text-danger">Password is required</span>}
                                    {passwordLenghError && password.length < 6 && <span className="text-danger">{passwordLenghError}</span>}
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Confirm Password</label>
                                    <input type="password" className="form-control" placeholder="Confirm Password" name="confirm_password" onChange={event => setConfirmPassword(event.target.value)} value={confirmPassword} />
                                    {confirmPasswordError && confirmPassword.length === 0 && <span className="text-danger">{confirmPasswordError}</span>}
                                    {confirmPasswordLenghError && confirmPassword.length < 6 && <span className="text-danger">{confirmPasswordLenghError}</span>}
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
