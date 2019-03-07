import React, { Component } from "react";
import { connect } from 'react-redux';
import FacebookLogin from "react-facebook-login";
import InstagramLogin from "react-instagram-login";
import GoogleLogin from "react-google-login";
import "bootstrap/dist/css/bootstrap.css";

class Login extends Component {
    componentWillMount() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        script.async = true;
        document.body.appendChild(script);
        const script2 = document.createElement("script");
        script2.src =
            "http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js";
        script2.async = true;
        document.body.appendChild(script2);
        const script3 = document.createElement("script");
        script3.src =
            "https://apis.google.com/js/api.js";
        script3.async = true;
        document.body.appendChild(script3);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    submitloginForm = e => {
        e.preventDefault();

        const username = this.getUsername.value;
        const password = this.getPassword.value;

        const users = [
            {
                email: "test@gmail.com",
                password: "TestTest@123",
                phone: "123456789",
                city: "Hyderabad",
                country: "India",
                name: "Test 1"
            },
            {
                email: "test1@gmail.com",
                password: "TestTest@123",
                phone: "123456789",
                city: "Hyderabad",
                country: "India",
                name: "Test 2"
            },
            {
                email: "test2@gmail.com",
                password: "TestTest@123",
                phone: "123456789",
                city: "Hyderabad",
                country: "India",
                name: "Test 3"
            },
            {
                email: "test3@gmail.com",
                password: "TestTest@123",
                phone: "123456789",
                city: "Hyderabad",
                country: "India",
                name: "Test 4"
            }
        ];

        // stop here if form is invalid
        if (!(username && password) && !this.validateForm()) {
            return;
        }
        //fetch users through api
        let userdetails = users.map(
            u => u.email === username && u.password === password
        );
        if (userdetails != null) {
            localStorage.setItem("isAuthenticated", true);

            this.props.dispatch({
                type: 'PUT_USERDATA',
                userData: users.filter(u => u.email === username && u.password === password)
            })
            this.getUsername.value = '';
            this.getPassword.value = '';

            this.props.history.push({
                pathname: "/Dashboard"
                // ,
                // state: {
                //     user: users.filter(
                //         u => u.email === username && u.password === password
                //     )
                // }
            });
        }
    };

    validateForm = () => {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        const username = (this.getUsername) ? this.getUsername.value : undefined;
        const password = (this.getPassword) ? this.getPassword.value : undefined;
        const btnSubmit = this.getBtnSubmit;
        const emailErrors = this.getEmailErrors;
        const passwordErrors = this.getPasswordErrors;
        if (!username) {
            formIsValid = false;
            errors["emailid"] = "*Please enter your email-ID.";
        }
        if (typeof username !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(username)) {
                formIsValid = false;
                errors["emailid"] = "*Please enter valid email-ID.";
            }
        }
        if (!password) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }
        if (typeof password !== "undefined") {
            if (
                !password.match(
                    /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
                )
            ) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }
        this.errors = errors;
        if (btnSubmit) {
            btnSubmit.disabled = !formIsValid;
        }
        if (emailErrors) {
            emailErrors.innerHTML = errors.email;
        }
        if (passwordErrors) {
            passwordErrors.innerHTML = errors.password;
        }
        return formIsValid;
    };

    render() {
        const responseGoogle = response => {
            var config = {
                'client_id': '942448994086-hjup9f33s70ditnb5vf81v4resdrea2t.apps.googleusercontent.com',
                'scope': 'https://www.google.com/m8/feeds'
            };
            var token = window.gapi.auth.getToken().access_token;
            var profile = response.getBasicProfile();
            this.setState({ user: profile });
            window.gapi.auth.authorize(config, function () {
                fetch("https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=" + token)
                    .then(response => {

                        console.log("responseGoogle: " + JSON.stringify(response));
                        if (!response.ok) {
                            throw Error("Network request failed");
                        }
                        if (response.ok) {
                        }
                        return response;
                    })
                    .then(d => d.json())
                    .then(
                        d => {

                            console.log(d)
                            pushToGoogleDashboard(d);
                        },
                        error => {
                            console.log(JSON.stringify(error));
                        }
                    );
            });
        }
        const pushToGoogleDashboard = data => {
            console.log(JSON.stringify(data));
            this.props.dispatch({
                type: 'PUT_GDATA',
                googleData: data
                //googleData: { contacts: data.feed, email: this.state.user.getEmail() }
            })
            this.props.history.push({
                pathname: "/Google"
                // ,
                // state: { contacts: data.feed, email: this.state.user.getEmail() }
            });
        };
        const errorResponseGoogle = errorResponse => {
            console.log(JSON.stringify(errorResponse));
        };
        const responseInstagram = response => {
            console.log(JSON.stringify(response));
            fetch("http://api.instagram.com/v1/users/self/media/recent/?access_token=" + JSON.stringify(response))
                .then(d => { d.json(); console.log(JSON.stringify(d)) })
                .then(data => {
                    console.log(data);
                    if (data !== undefined) {
                        pushToInstagram(data);
                    }
                })
                .catch(error => console.log(error));
        };
        const pushToInstagram = instaData => {
            this.props.dispatch({
                type: 'PUT_INSTADATA',
                instaData: instaData
            })
            this.props.history.push({
                pathname: "/Instagram"
                // ,
                // state: { userData: instaData }
            });
        };
        const responseErrorInstagram = response => {
            console.log("error: " + JSON.stringify(response));
        };
        var isEnabled = this.validateForm();
        const responseFacebook = response => {
            if (response !== undefined) {
                this.props.dispatch({
                    type: 'PUT_FBDATA',
                    fbData: response
                })
                this.props.history.push({
                    pathname: "/Facebook"
                    // ,
                    // fbData: response
                });
            }
        };
        return (
            <div className="container" style={{ "margin": "70px" }}>
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form
                                    method="post"
                                    name="loginForm"
                                    onSubmit={this.submitloginForm}
                                    className="form-signin"
                                >
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            name="username"
                                            ref={(input) => this.getUsername = input}
                                            className="form-control"
                                        />
                                        <label htmlFor="inputEmail">Email address</label>
                                        <div className="errorMsg">
                                            <span ref={(span) => this.getEmailErrors = span} className="text-danger"></span>
                                            {/* {(this.errors) ? this.errors.emailid : ""} */}
                                        </div>
                                    </div>

                                    <div className="form-label-group">
                                        <input
                                            type="password"
                                            name="password"
                                            ref={(input) => this.getPassword = input}
                                            className="form-control"
                                        />

                                        <label htmlFor="inputPassword">Password</label>
                                        <div className="errorMsg">
                                            <span ref={(span) => this.getPasswordErrors = span}></span>
                                            {/* {this.errors.password} */}
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-lg btn-primary btn-block text-uppercase"
                                        type="submit"
                                        ref={(button) => this.getBtnSubmit = button}
                                    >
                                        Sign in
                    </button>
                                </form>
                                <div className="my-4">
                                    <GoogleLogin
                                        cssClass="btn btn-lg btn-facebook btn-block text-uppercase"
                                        style={{ "background-color": "#ea4335" }}
                                        clientId="942448994086-hjup9f33s70ditnb5vf81v4resdrea2t.apps.googleusercontent.com"
                                        buttonText="LOGIN WITH GOOGLE"
                                        onSuccess={responseGoogle}
                                        onFailure={errorResponseGoogle}
                                        scope="email profile openid https://www.google.com/m8/feeds/"
                                    />
                                    <FacebookLogin
                                        appId="401631383932460"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        scope="public_profile,email"
                                        callback={responseFacebook}
                                    />
                                    <InstagramLogin
                                        clientId="01995d823f354deda41e0f2342c37aae"
                                        onSuccess={responseInstagram}
                                        onFailure={responseErrorInstagram}
                                    >Login with Instagram</InstagramLogin>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default connect()(Login);