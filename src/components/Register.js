import React, { Component } from "react";
import PropsTypes from "prop-types";
import "../../assets/css/Register.scss";

class Register extends Component {
    state = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        touched: {
            first_name: false,
            last_name: false,
            username: false,
            email: false,
            password: false,
            confirm_password: false
        }
    };

    static propTypes = {
        registerUser: PropsTypes.func.isRequired
    };

    handleFirstName = e => {
        this.setState({ first_name: e.target.value });
    };

    handleLastName = e => {
        this.setState({ last_name: e.target.value });
    };

    handleUsername = e => {
        this.setState({ username: e.target.value });
    };

    handleEmail = e => {
        this.setState({ email: e.target.value });
    };

    handlePassword = e => {
        this.setState({ password: e.target.value });
    };

    handleConfirmPassword = e => {
        this.setState({ confirm_password: e.target.value });
    };

    validateData = data => {
        const {
            first_name,
            last_name,
            username,
            password,
            email,
            confirm_password
        } = data;
        let errors = {};
        if (first_name.length === 0) errors.first_name = false;
        else errors.first_name = false;
        if (last_name.length === 0) errors.last_name = false;
        else errors.last_name = false;
        if (username.length === 0) errors.username = "This field is required.";
        else errors.username = this.props.user.error.username || false;
        if (password.length === 0) errors.password = "This field is required.";
        else if (
            !password.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/
            )
        )
            errors.password =
                "The password must contain atleast 8 characters with one uppercase letter, one lowercase letter, one number and a special character";
        else errors.password = false;
        if (email.length === 0) errors.email = "This field is required.";
        else if (!email.match(/.*@.*\.[a-zA-Z]{3}$/))
            errors.email = "Please enter a valid email address";
        else errors.email = false;
        if (confirm_password.length === 0)
            errors.confirm_password = "This field is required.";
        else if (password !== confirm_password)
            errors.confirm_password = "This field needs to match the password";
        else errors.confirm_password = false;
        return errors;
    };

    handleRegister = e => {
        e.preventDefault();
        const { registerUser } = this.props;
        const {
            first_name,
            last_name,
            username,
            email,
            password,
            confirm_password
        } = this.state;
        this.setState({
            touched: {
                ...this.state.touched,
                ["username"]: true,
                ["password"]: true,
                ["confirm_password"]: true,
                ["first_name"]: true,
                ["last_name"]: true,
                ["email"]: true
            }
        });
        registerUser({
            first_name,
            last_name,
            username,
            email,
            password,
            confirm_password
        });
    };

    shouldShowError = (prop, errors) => {
        const hasError = errors[prop];
        const showError = this.state.touched[prop];
        return showError ? (hasError ? "is-invalid" : "is-valid") : false;
    };

    handleFocus = prop => evt => {
        this.setState({ touched: { ...this.state.touched, [prop]: true } });
    };

    closeAlert = e => {
        e.preventDefault();
        this.setState({ display_error: "none" });
    };

    render() {
        const { user, history } = this.props;
        const errors = this.validateData(this.state);
        const first_name_class = this.shouldShowError("first_name", errors);
        const last_name_class = this.shouldShowError("last_name", errors);
        const username_class = this.shouldShowError("username", errors);
        const email_class = this.shouldShowError("email", errors);
        const password_class = this.shouldShowError("password", errors);
        const confirm_password_class = this.shouldShowError(
            "confirm_password",
            errors
        );
        if (user.is_authenticated) history.push("/todo");
        return (
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header text-center">
                            <strong className="h5">User Registration</strong>
                        </div>
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
                            <form
                                class="needs-validation"
                                novalidate
                                onSubmit={this.handleRegister}
                            >
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="first_name">
                                            First Name
                                        </label>
                                        <div className="wrapper">
                                            <input
                                                onFocus={this.handleFocus(
                                                    "first_name"
                                                )}
                                                type="text"
                                                className={
                                                    first_name_class
                                                        ? `form-control ${first_name_class}`
                                                        : "form-control"
                                                }
                                                placeholder="Enter a First Name"
                                                id="first_name"
                                                value={this.state.first_name}
                                                onChange={this.handleFirstName}
                                            />
                                            <span className="valid-feedback">
                                                <i class="fas fa-check" />
                                            </span>
                                            <span className="invalid-feedback">
                                                <i class="fas fa-times" />
                                                First Name:{" "}
                                                {Array.isArray(
                                                    errors.first_name
                                                )
                                                    ? errors.first_name[0]
                                                    : errors.first_name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="last_name">
                                            Last Name
                                        </label>
                                        <div className="wrapper">
                                            <input
                                                onFocus={this.handleFocus(
                                                    "last_name"
                                                )}
                                                type="text"
                                                className={
                                                    last_name_class
                                                        ? `form-control ${last_name_class}`
                                                        : "form-control"
                                                }
                                                placeholder="Enter a Last Name"
                                                id="last_name"
                                                value={this.state.last_name}
                                                onChange={this.handleLastName}
                                            />
                                            <span className="valid-feedback">
                                                <i class="fas fa-check" />
                                            </span>
                                            <span className="invalid-feedback">
                                                <i class="fas fa-times" />
                                                Last Name:{" "}
                                                {Array.isArray(errors.last_name)
                                                    ? errors.last_name[0]
                                                    : errors.last_name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="username">
                                            Username
                                        </label>
                                        <div className="wrapper">
                                            <input
                                                onFocus={this.handleFocus(
                                                    "username"
                                                )}
                                                type="text"
                                                className={
                                                    username_class
                                                        ? `form-control ${username_class}`
                                                        : "form-control"
                                                }
                                                placeholder="Enter a username"
                                                id="username"
                                                value={this.state.username}
                                                onChange={this.handleUsername}
                                            />
                                            <span className="valid-feedback">
                                                <i class="fas fa-check" />
                                            </span>
                                            <span className="invalid-feedback">
                                                <i class="fas fa-times" />
                                                Username:{" "}
                                                {Array.isArray(errors.username)
                                                    ? errors.username[0]
                                                    : errors.username}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Email</label>
                                        <div className="wrapper">
                                            <input
                                                onFocus={this.handleFocus(
                                                    "email"
                                                )}
                                                type="text"
                                                className={
                                                    email_class
                                                        ? `form-control ${email_class}`
                                                        : "form-control"
                                                }
                                                placeholder="Please enter an email"
                                                id="email"
                                                value={this.state.email}
                                                onChange={this.handleEmail}
                                            />
                                            <span className="valid-feedback">
                                                <i class="fas fa-check" />
                                            </span>
                                            <span className="invalid-feedback">
                                                <i class="fas fa-times" />
                                                Email:{" "}
                                                {Array.isArray(errors.email)
                                                    ? errors.email[0]
                                                    : errors.email}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <div className="wrapper">
                                            <input
                                                onFocus={this.handleFocus(
                                                    "password"
                                                )}
                                                className={
                                                    password_class
                                                        ? `form-control ${password_class}`
                                                        : "form-control"
                                                }
                                                type="password"
                                                placeholder="Enter a password"
                                                id="password"
                                                value={this.state.password}
                                                onChange={this.handlePassword}
                                            />
                                            <span className="valid-feedback">
                                                <i class="fas fa-check" />
                                            </span>
                                            <span className="invalid-feedback">
                                                <i class="fas fa-times" />
                                                Password:{" "}
                                                {Array.isArray(errors.password)
                                                    ? errors.password[0]
                                                    : errors.password}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="confirm_password">
                                            Confirm Password
                                        </label>
                                        <div className="wrapper">
                                            <input
                                                onFocus={this.handleFocus(
                                                    "confirm_password"
                                                )}
                                                type="password"
                                                className={
                                                    confirm_password_class
                                                        ? `form-control ${confirm_password_class}`
                                                        : "form-control"
                                                }
                                                placeholder="Enter a Password"
                                                id="confirm_password"
                                                value={
                                                    this.state.confirm_password
                                                }
                                                onChange={
                                                    this.handleConfirmPassword
                                                }
                                            />
                                            <span className="valid-feedback">
                                                <i class="fas fa-check" />
                                            </span>
                                            <span className="invalid-feedback">
                                                <i class="fas fa-times" />
                                                Confirm Password:{" "}
                                                {Array.isArray(
                                                    errors.confirm_password
                                                )
                                                    ? errors.confirm_password[0]
                                                    : errors.confirm_password}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 offset-md-3 mt-5">
                                        <button
                                            type="submit"
                                            className="form-control btn btn-block btn-primary"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
