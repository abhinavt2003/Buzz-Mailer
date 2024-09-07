import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmail from "../utils/validateEmail";
const FIELD = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "REcipient List", name: "recipents" },
];
class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELD, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type='text'
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div class='col s3 m7'>
        <div class='card horizontal'>
          <div class='card-stacked'>
            <div class='card-content'>
              <form
                onSubmit={this.props.handleSubmit(() =>
                  this.props.onSurveySubmit()
                )}
              >
                {this.renderFields()}
                <button
                  type='submit'
                  className='teal btn-flat right white-text'
                >
                  Submit
                  <i className='right material-icons'>done</i>
                </button>

                <Link to='/surveys' className='red btn-flat left white-text'>
                  cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELD, ({ name }) => {
    if (!values[name]) {
      errors[name] = "*  value reuired";
    }
  });
  errors.recipents = validateEmail(values.recipents || "");
  return errors;
}
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
