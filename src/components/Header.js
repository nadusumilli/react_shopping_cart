import React, { Component } from "react";
import "../../assets/css/Header.scss";
import Logout from "../pages/Logout";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

class Header extends Component {
    render() {
        return (
            <ul id="nav">
                <li data-url="">Home</li>
                <li data-url="/cart">cart</li>
            </ul>
        );
    }
}

export default Header;
