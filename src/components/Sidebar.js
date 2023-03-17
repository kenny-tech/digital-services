import React from "react";

const Sidebar = () => {

    return (
        <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-unstyled mt-1" id="menu">
                <div>
                    <li className="nav-item mb-2">
                        <a href="#" className="nav-link align-middle linkText">
                            {/* <Icon.UserIcon className={sidebarStyles.iconStyle}/> */}
                            <span className="ms-1 d-sm-inline">My Account</span>
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a href="#" className="nav-link align-middle linkText">
                            {/* <Icon.UserIcon className={sidebarStyles.iconStyle}/> */}
                            <span className="ms-1 d-sm-inline">Airtime</span>
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a href="#" className="nav-link align-middle linkText">
                            {/* <Icon.UserIcon className={sidebarStyles.iconStyle}/> */}
                            <span className="ms-1 d-sm-inline">TV Subscription</span>
                        </a>
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default Sidebar;