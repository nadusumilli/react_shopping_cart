import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import "../../assets/css/Login.scss";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: "",
        password: "",
        touched: {
            username: false,
            password: false
        },
        setPropsErrors: false,
        errors: {}
    };

    static propTypes = {
        user: PropTypes.object.isRequired,
        loginUser: PropTypes.func.isRequired
    };

    usernameChange = e => {
        e.preventDefault();
        this.setState({ username: e.target.value });
    };

    passwordChange = e => {
        e.preventDefault();
        this.setState({ password: e.target.value });
    };

    handleLogin = e => {
        e.preventDefault();
        let { username, password } = this.state;
        let { loginUser } = this.props;
        this.setState({
            touched: {
                ...this.state.touched,
                ["username"]: true,
                ["password"]: true
            }
        });
        loginUser({ username, password });
    };

    componentDidMount() {
        if (this.props.user.error) {
            this.setState({ setPropsErrors: true });
        }
    }

    validateData = data => {
        const { username, password } = data;
        let errors;
        errors = {
            username: false,
            password: false
        };
        if (username.length === 0) errors.username = "This field is required.";
        else errors.username = false;
        if (password.length === 0) errors.password = "This field is required.";
        else errors.password = false;
        return errors;
    };

    shouldShowError = (prop, errors) => {
        const hasError = errors[prop];
        const showError = this.state.touched[prop];
        return showError ? (hasError ? "is-invalid" : "is-valid") : false;
    };

    handleFocus = prop => evt => {
        this.setState({ touched: { ...this.state.touched, [prop]: true } });
    };

    render() {
        const { user, history } = this.props;
        let errors = this.validateData(this.state);
        const username_class = this.shouldShowError("username", errors);
        const password_class = this.shouldShowError("password", errors);
        const isEnabled = false; //Object.keys(errors).some(x => errors[x]);
        if (user.is_authenticated) {
            history.push("/home");
        }
        return (
            <div className="container">
                <div className="col-md-6 offset-md-3 p-3 mb-5">
                    <div className="card mb-3">
                        <div className="card-header text-center">Login</div>
                        <div className="card-body">
                            {this.props.user.error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {Object.keys(this.props.user.error).map(
                                        prop => (
                                            <div>
                                                {prop}:{" "}
                                                {Array.isArray(
                                                    this.props.user.error
                                                )
                                                    ? this.props.user.error[
                                                          prop
                                                      ][0]
                                                    : this.props.user.error[
                                                          prop
                                                      ]}
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                            <form className="is-validated" />
                            <div className="form-group">
                                <label className="form-label">Username: </label>
                                <div className="wrapper-login">
                                    <input
                                        type="text"
                                        onFocus={this.handleFocus("username")}
                                        className={
                                            username_class
                                                ? `form-control ${username_class}`
                                                : "form-control"
                                        }
                                        placeholder="Please enter your username"
                                        onChange={this.usernameChange}
                                        value={this.state.username}
                                    />
                                    <span className="valid-feedback">
                                        <i className="fas fa-check" />
                                    </span>
                                    <span className="invalid-feedback">
                                        <i className="fas fa-times" />
                                        Username: {errors.username}
                                    </span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password: </label>
                                <div className="wrapper-login">
                                    <input
                                        type="password"
                                        onFocus={this.handleFocus("password")}
                                        className={
                                            password_class
                                                ? `form-control ${password_class}`
                                                : "form-control"
                                        }
                                        placeholder="Please enter your password"
                                        onChange={this.passwordChange}
                                        value={this.state.password}
                                    />
                                    <span className="valid-feedback">
                                        <i className="fas fa-check" />
                                    </span>
                                    <span className="invalid-feedback">
                                        <i className="fas fa-times" />
                                        Password: {errors.password}
                                    </span>
                                </div>
                            </div>
                            <Link to="/register">Not a user?</Link>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary form-control"
                                    onClick={this.handleLogin}
                                    // disabled={isEnabled}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
