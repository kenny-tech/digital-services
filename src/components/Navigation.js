import React from "react";

const Navigation = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Logo</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-lg-end" id="navbarText">
                <span class="navbar-text">
                    Register
                </span>
                <span>  / </span>
                <span class="navbar-text">
                    Login
                </span>
            </div>
        </nav>
    )
}

export default Navigation;
