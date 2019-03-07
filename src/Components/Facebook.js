import React, { Component } from "react";
import { connect } from 'react-redux';
class Facebook extends Component {
    render() {
        const user = this.props.fbData;
        console.log(user);
        return (
            <div class="container-fluid mt-40" style={{ marginTop: "40px" }}>
                <div class="row">
                    <div className="container" style={{ "margin": "70px" }}>
                        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                            <div className="col-md-6 col-md-offset-3">
                                {(user === undefined || user === null) ? "You are accessing unauthorized page, Please do fb login on login page" :
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <img src={user.picture.data.url} height="300" width="300"></img>
                                            </div>
                                            <div className="flip-card-back">
                                                <ul>
                                                    <li>{user.name}</li>
                                                    <li>{user.email}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fbData: state.fbData
    }
}

export default connect(mapStateToProps)(Facebook);