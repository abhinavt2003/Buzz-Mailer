import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import "./SurveyReview.css";
// import { withRouter } from "react-router";
// import { useLinkClickHandler, useNavigate } from "react-router-dom";
import * as actions from "../actions";
const FIELD = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "REcipient List", name: "recipents" },
];
const SurveyReview = ({ onCancel, submitSurvey, formValues, navigate }) => {
  console.log(formValues);
  const reviewfield = _.map(FIELD, (field) => {
    // console.log(.name);
    return (
      <div key={field.name}>
        <label className='black'>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });
  return (
    <div className='cont'>
      <h5> please conform</h5>
      {reviewfield}
      <button className='yellow darken-3 btn-flat' onClick={onCancel}>
        back
      </button>
      <button
        className='green btn-flat right'
        onClick={() => submitSurvey(formValues, navigate)}
      >
        Send Survey
        <i className='right material-icons'>send</i>
      </button>
    </div>
  );
};
function mapState(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapState, actions)(SurveyReview);
