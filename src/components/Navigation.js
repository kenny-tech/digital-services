import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Cakamba Digital Service
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-sm-end" id="navbarNavDropdown" >
                <ul className="navbar-nav">
                {/* <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li> */}
                    <li className="nav-item">
                        <Link to="/register">
                            <a className="nav-link">Register</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login">
                            <a className="nav-link">Login</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;
