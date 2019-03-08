import React, { Component } from "react";
import { connect } from 'react-redux';
class Google extends Component {
    render() {
        const contacts = this.props.googleData.feed;
        console.log(contacts);
        return (
            <div className="container" style={{ "margin": "70px" }}>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div className="col-md-6 col-md-offset-3">
                        {(contacts === undefined || contacts === null) ? "You are accessing unauthorized page, Please do google login on login page" :
                            <div>
                                <h2>Google Contacts Page</h2>
                                <h3>
                                    {contacts.title.$t} registered with email {this.props.googleData.email}
                                </h3>
                                {contacts.entry.map((e, index) => (
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <img src="https://img.icons8.com/plasticine/300/000000/contacts.png"></img>
                                            </div>
                                            <div className="flip-card-back">
                                                <div key={index}>
                                                    <h1>{e.title.$t ? e.title.$t : "No Name"}</h1>
                                                </div>
                                                <div>
                                                    {e.gd$phoneNumber ? (
                                                        e.gd$phoneNumber.map((phone, indexPhone) => (
                                                            <div>
                                                                <div key={indexPhone}><p>phone: {phone.$t}</p></div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                            <p></p>
                                                        )}
                                                </div>
                                                <div>
                                                    {e.gd$email ? (
                                                        e.gd$email.map((email, indexEmail) => (
                                                            <div>
                                                                <div key={indexEmail}>
                                                                    <p>email: {email.address}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                            <p></p>
                                                        )}
                                                </div>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        googleData: state.googleReducer
    }
}

export default connect(mapStateToProps)(Google);