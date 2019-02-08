import React from "react";
import { Link } from "react-router-dom";

const Logout = props => (
    <div className="nav-item dropdown">
        <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            {props.username}
        </a>
        <div
            className="dropdown-menu dropdown-menu-right text-center"
            aria-labelledby="navbarDropdown"
        >
            <Link className="dropdown-item" to="/profile">
                Profile
            </Link>
            <a className="dropdown-item" onClick={props.handleLogout}>
                Logout
            </a>
        </div>
    </div>
);

export default Logout;
