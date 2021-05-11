import axios from "axios";
import React from "react";
// import { useHistory } from "react-router";
import { BrowserRouter, NavLink, useHistory } from "react-router-dom";
import Login from "./Login";

type RegisterState = {
    email: any;
    name: any;
    password: any;
    conformpassword: any;
};
class Register extends React.Component {
    state: RegisterState = {
        email: "",
        name: "",
        password: "",
        conformpassword: "",
    };

    submitting = (e: any) => {
        e.preventDefault();

        if (this.state.conformpassword === this.state.password) {
            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            };
            axios.post("http://localhost:5000/auth/register", user).then(
                (response) =>
                    // this.setState({ user: response.data.id })
                    // alert("Login Success")
                    console.log(response)
                // history.state("/login")
            );
        }
    };

    change = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className="container register-form">
                <div className="form">
                    <div className="note">
                        <p>Register</p>
                    </div>

                    <div className="form-content">
                        <form onSubmit={this.submitting}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Name *"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.change}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email Id *"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.change}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Your Password *"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.change}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm Password *"
                                            name="conformpassword"
                                            value={this.state.conformpassword}
                                            onChange={this.change}
                                        />

                                        {this.state.conformpassword ===
                                        this.state.password ? null : (
                                            <p>Password is not Matching</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <NavLink to="/login">
                                <button className="btnSubmit">Submit</button>
                            </NavLink>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
