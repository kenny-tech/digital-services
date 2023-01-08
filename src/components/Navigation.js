import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link class="navbar-brand" to="/">
                Cakamba Digital Service
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-lg-end" id="navbarText">
                <Link to="/login">
                    <span class="navbar-text">
                        Login
                    </span>
                </Link>
            </div>
        </nav>
    )
}

export default Navigation;
