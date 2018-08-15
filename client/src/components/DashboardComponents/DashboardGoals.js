import React, { Component } from 'react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../Actions';
import { connect } from 'react-redux';

class DashboardGoals extends Component {
  display(handleSubmit, reset) {
    if (this.hasGoal())
      return <h3>You have a goal</h3>
    else
      return this.renderGoalForm(handleSubmit, reset);
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

  renderGoalForm(handleSubmit, reset) {
    return (
      <form className="sessionForm" onSubmit={handleSubmit(val => {
        this.submitForm(val);
        reset();
      })}>
        <Field
          name="goalSet"
          component={this.renderField}
          label="Set the length of your goal in days"
          className="formInput"
        />
        <button type='submit' className="formSubmit">Submit</button>
      </form>
    )
  }

  submitForm(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit, reset } = this.props;
    const test = this.display(handleSubmit, reset);
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

  if (!Number(values.goalSet))
    errors.goalSet = "Enter a valid number"

  return errors;
}

export default reduxForm({
  form: "goalSet",
  fields: ['goalSet'],
  validate,
})(connect(mapStateToProps, actions)(DashboardGoals));