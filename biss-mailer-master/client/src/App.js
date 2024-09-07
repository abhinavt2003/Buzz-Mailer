import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { connect } from "react-redux";
import { connect } from "react-redux";
// import * as actions from "/actions";
import * as actions from "./actions";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Dashbord from "./components/Dashbord";
import { useNavigate } from "react-router-dom";
import SurveyNew from "./components/SurveyNew";
import SurveyNewcomp from "./components/SurveyNewcomp";
import "./App.css";
const Dash = () => {
  <h2>dash</h2>;
};

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className='container '>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/surveys' element={<Dashbord />} />
            <Route path='/surveys/new' element={<SurveyNewcomp />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
