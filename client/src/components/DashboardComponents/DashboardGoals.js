import React, { Component } from 'react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../Actions';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

class DashboardGoals extends Component {
  componentWillMount(){
    this.props.fetchUser();
  }

  //display will check to see if user has a goal and return the proper data
  display(handleSubmit, reset, fetchUser) {
    if (this.hasGoal())
      return this.ifHasGoal(fetchUser);
    else
      return this.renderGoalForm(handleSubmit, reset);
  }

  //
  currentGoal(){
    if(this.props.auth.attempedGoalNumber === this.props.auth.goalSessionNumber)
      return(
        <div>
          <h3>You've completed your goal of {this.props.auth.goalSessionNumber} subjects</h3>
        </div>
      )
    else
      return(
        <div>
          <h3>Current goal: Study {this.props.auth.goalSessionNumber} subjects</h3>
          <p>
            So far you've completed
            {this.props.auth.attempedGoalNumber}/{this.props.auth.goalSessionNumber}
          </p>
          {this.renderGoalChart()}
        </div>
      )
  }

  hasGoal() {
    if (this.props.auth.goalSessionNumber > 0)
      return true;
    else
      return false;
  }

  ifHasGoal(fetchUser){
    return (
      <div>
        {this.currentGoal()}
        <button
          type='submit'
          className="formSubmit"
          onClick={() => this.resetGoal(fetchUser)}
        >
          Reset Goal
        </button>
      </div>
    )
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

  renderGoalChart(){
    const datas = {
      labels: ["Incompleted", "Completed"],
      datasets: [{
        label: "completed/incompleted",
        backgroundColor: ['#ABAEF7', 'purple'],
        data: [this.props.auth.goalSessionNumber, this.props.auth.attempedGoalNumber],
      }]
    }
    return(
      <Doughnut
          data={datas}
      />
    )
  }

  renderGoalForm(handleSubmit, reset) {
    return (
      <form
        className="sessionForm"
        onSubmit={handleSubmit(val => {
          this.submitForm(val);
          reset();
        })}
      >
        <Field
          name="goalSet"
          component={this.renderField}
          label="Set the amount of sessions your goal is to complete"
          className="formInput"
        />
        <button type='submit' className="formSubmit">Submit</button>
      </form>
    )
  }

  resetGoal(fetchUser){
    axios.post('/api/setGoal', { goalSet: 0 })
         .then(fetchUser());
    fetchUser();
  }

  submitForm(values) {
    axios.post('/api/setGoal', values)
         .then(this.props.fetchUser());
    this.props.fetchUser();
  }

  render() {
    const { handleSubmit, reset, fetchUser } = this.props;
    const test = this.display(handleSubmit, reset, fetchUser);
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

  if (!Number(values.goalSet) || Number(values.goalSet) <= 0)
    errors.goalSet = "Enter a valid number"

  return errors;
}

export default reduxForm({
  form: "goalSet",
  fields: ['goalSet'],
  validate,
})(connect(mapStateToProps, actions)(DashboardGoals));