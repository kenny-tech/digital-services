import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { errorAlert } from "../services/alert";
import { Link } from "react-router-dom";

import Navigation from "../components/Navigation";
import { BASE_API_ROUTE, VERIFY_EMAIL_RESET_PASSWORD_API_ROUTE, RESET_PASSWORD_API_ROUTE } from "../Route";
import Error from "../components/Error";

const ResetPassword = () => {

    const { id, token } = useParams();
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordLenghError, setPasswordLengthError] = useState('');
    const [confirmPasswordLenghError, setConfirmPasswordLengthError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const [errors, setErrors] = useState('');

    useEffect(() => {
        resetPassword(id, token);
    }, []);  

    const resetPassword = (id, token) => {
        axios.get(`${BASE_API_ROUTE}${VERIFY_EMAIL_RESET_PASSWORD_API_ROUTE}/${id}/${token}`)
        .then(function (response) {
          if(response.data.success === true) {
            //   console.log(response.data.data.email);
              setEmail(response.data.data.email);
          } else {
              errorAlert('Expired link. Please try resetting your password again.');
          }
        })
        .catch(function (error) {
          console.log('error: ',error);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password.length === 0) {
            setPasswordError('Password is required');
        } else if(password.length < 6) {
            setPasswordLengthError('Password length must be 6 characters or more');
        } else if(confirmPassword.length === 0) {
            setConfirmPasswordError('Confirm Password is required');
        }  else if(confirmPassword.length < 6) {
            setConfirmPasswordLengthError('Confirm Password length must be 6 characters or more');
        }  else if(password !== confirmPassword ) {
            setPasswordMatchError('Password and Confirm Password must match');
        } else {
            setLoading(true);

            let data = {
                email: email,
                password: password,
                confirm_password: confirmPassword
            }

            axios.post(`${BASE_API_ROUTE}${RESET_PASSWORD_API_ROUTE}`, data)
              .then(function (response) {
                    if(response.data.success === true) {
                        Swal.fire({
                            title: 'Good job!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonColor: '#3949AB'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/login";
                            }
                        })
                    } else {
                    Swal.fire(
                            'Error!',
                            'Unable to change password. Please try again.',
                            'error'
                        )
                    }          
                })
              .catch(function (error) {
                setLoading(false);
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
                            <h5 className="card-title">Reset Password</h5>
                            <ul>
                                {Object.keys(errors).map((error, index) => (
                                    <Error
                                        message={errors[error][0]}
                                    />
                                ))}
                            </ul>
                            {
                                email === '' ? (<div><p>The link you clicked has expired. <br/><br/>Please click on Forgot Password link below to reset your password.</p>
                                <Link to="/forgot-password">
                                    <p className="text-center mt-3 cursor-pointer">Forgot Password?</p>
                                </Link></div>) : null
                            }
                            {
                                email !== '' ? ( 
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={event => setPassword(event.target.value)} value={password} />
                                        {passwordError && password.length === 0 && <span className="text-danger">Password is required</span>}
                                        {passwordLenghError && password.length < 6 && <span className="text-danger">{passwordLenghError}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Confirm Password</label>
                                        <input type="password" className="form-control" placeholder="Confirm Password" name="confirm_password" onChange={event => setConfirmPassword(event.target.value)} value={confirmPassword} />
                                        {confirmPasswordError && confirmPassword.length === 0 && <span className="text-danger">{confirmPasswordError}<br/></span>}
                                        {confirmPasswordLenghError && confirmPassword.length < 6 && <span className="text-danger">{confirmPasswordLenghError}</span>}
                                        {passwordMatchError && password !== confirmPassword && <span className="text-danger">{passwordMatchError}<br/></span>}
                                    </div>
                                    {
                                        loading ? (<button type="submit" disabled={true} className="btn btn-primary btn-block">Submitting...</button>) : (<button type="submit" className="btn btn-primary btn-block">Submit</button>)
                                    }
                                    
                                </form>) : null
                            } 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
