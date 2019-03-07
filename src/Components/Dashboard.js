import React, { Component } from "react";
import { connect } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css";
class Dashboard extends Component {
    render() {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        const user = this.props.userData;
        return (
            <div className="container" style={{ "margin": "70px" }}>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div className="col-md-6 col-md-offset-3">
                        {(isAuthenticated) ?
                            <div><p>{user.name}</p>
                                <p>{user.email}</p>
                                <p>{user.phone}</p>
                                <p>{user.city}</p>
                                <p>{user.country}</p></div>
                            : "You are accessing unauthorized page, Please login"}
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData
    }
}
export default connect(mapStateToProps)(Dashboard);