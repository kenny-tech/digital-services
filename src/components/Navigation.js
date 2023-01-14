import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Cakamba Digital Service
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-lg-end" id="navbarText">
                <Link to="/login">
                    <span className="navbar-text">
                        Login
                    </span>
                </Link>
            </div>
        </nav>
    )
}

export default Navigation;
