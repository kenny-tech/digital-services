import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigation = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                <img src="/logo.jpeg" className="img-fluid rounded" alt="Logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-sm-end" id="navbarNavDropdown" >
                <ul className="navbar-nav">
                    {
                        sessionStorage.getItem('isLoggedIn') ? (<li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Account
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            {/* <a class="dropdown-item" style={{cursor: 'pointer'}} href="/profile">Profile</a> */}
                            <a class="dropdown-item" style={{cursor: 'pointer'}} onClick={() => handleLogout()}>Log out</a>
                        </div>
                    </li>) : (<>
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
                    </>)
                    } 
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;
