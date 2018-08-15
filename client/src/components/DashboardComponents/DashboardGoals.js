import React, { Component } from 'react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../Actions';
import { connect } from 'react-redux';

class DashboardGoals extends Component {
  display(handleSubmit) {
    if (this.hasGoal())
      return <h3>You have a goal</h3>
    else
      return this.renderGoalForm(handleSubmit);
  }

  hasGoal() {
    if (this.props.auth.goalSessionNumber > 0)
      return true;
    else
      return false;
  }

  //render form with correct fields
  renderField(field) {
    const { meta: { touched, error } } = field;
    return (
      <div className="sessionItems">
        <label className="formLabel">{field.label}</label>
        <input className="formInput" type="text" {...field.input} />
        <div className="formError">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderGoalForm(handleSubmit) {
    return (
      <form className="sessionForm" onSubmit={handleSubmit(this.submitForm)}>
        <Field
          name="goalSet"
          component={this.renderField}
          label="Set the length of your goal in days"
          className="formInput"
        />
      </form>
    )
  }

  submitForm(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    const test = this.display(handleSubmit);
    return (
      <div>
        {test}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

function validate(values) {
  const errors = {};

  if (!values.goalDays)
    errors.goalDays = "Enter number of days";

  if (!Number(values.goalDays))
    errors.goalDays = "Enter a valid number"

  return errors;
}

export default reduxForm({
  form: "goalSet",
  fields: ['goalSet'],
  validate,
})(connect(mapStateToProps, actions)(DashboardGoals));