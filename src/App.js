import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Instagram from "./Components/Instagram";
import Google from "./Components/Google";
import Header from "./Components/Layout/Header";
import SideNavbar from "./Components/Layout/SideNavbar";
import Facebook from './Components/Facebook';
import Dashboard from './Components/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <SideNavbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Instagram" component={Instagram} />
            <Route exact path="/Facebook" component={Facebook} />
            <Route exact path="/Google" component={Google} />
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
