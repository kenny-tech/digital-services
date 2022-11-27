import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Navigation from "../components/Navigation";
import { BASE_API_ROUTE, ACTIVATE_ACCOUNT_API_ROUTE } from "../Route";

const ActivateAccount = () => {

    const { id, token } = useParams();
    // console.log(id, token);

    useEffect(() => {
        activateAccount(id, token);
    }, []);  

    const activateAccount = (id, token) => {
        axios.get(`${BASE_API_ROUTE}${ACTIVATE_ACCOUNT_API_ROUTE}/${id}/${token}`)
        .then(function (response) {
        //   console.log('active: ',response.data.data.active);
        // console.log('active: ',response.data);

          if(response.data.success === true) {
              Swal.fire(
                  'Good job!',
                  response.data.message,
                  'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/login";
                    }
                })
          } else {
            Swal.fire(
                'Error!',
                'Unable to activate your account. Please try again.',
                'error'
              )
          }
        })
        .catch(function (error) {
          console.log('error: ',error);
        });
    }

    return (
        <div className="container-fluid">
            <Navigation />
            <div className="row no-gutters mt-4">
                <div className="col-12 ml-3">
                    <h3>Activate Account</h3>
                </div>
            </div>
        </div>
    )
}

export default ActivateAccount;
