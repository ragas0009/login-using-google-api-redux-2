import React, { Component } from "react";
import { connect } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css";
class Instagram extends Component {
    render() {
        const instaData = this.props.instaData;
        console.log("insjs");
        console.log(instaData);
        return (
            <div class="container-fluid mt-40" style={{ marginTop: "40px" }}>
                <div class="row">
                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                        <div className="col-md-6 col-md-offset-3">
                            {(instaData === undefined || instaData === null) ? "You are accessing unauthorized page, Please do insta login on login page"
                                : instaData.map((u, index) => (
                                    <div key={index}>
                                        <p>
                                            {u.caption === null ? (
                                                <p>Test</p>
                                            ) : (
                                                    <p> {u.caption.text} </p>
                                                )}
                                        </p>
                                        <p>
                                            <img src={u.images.thumbnail.url} />
                                        </p>
                                        <p>Links:{u.likes.count}</p>
                                    </div>
                                ))}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        instaData: state.instaData
    }
}

export default connect(mapStateToProps)(Instagram);