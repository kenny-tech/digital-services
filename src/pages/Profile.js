import React from "react";

import Navigation from "../components/Navigation";
import WithAuth from "../services/withAuth";
import Sidebar from "../components/Sidebar";
import '../css/Sidebar.css';

const Profile = () => {

    return (
        <div className="container-fluid">
             <Navigation />
            <div className="row">
                <div className="col-md-2 bg-light sidebarContainer">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-3">
                    <h3>User Profile</h3>
                </div>
            </div>
        </div>
    )
}

export default WithAuth(Profile);
