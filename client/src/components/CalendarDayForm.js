import React, { Component } from 'react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'
import * as actions from '../Actions';
import { connect } from 'react-redux';
import uuid from 'uuid';

class CalendarDayForm extends Component {
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

    render() {
        const { handleSubmit, reset, fetchUser } = this.props;
        const date = this.props.datePicked;

        function submitForm(values){
            //turn the user input into object format
            const data = {date: date, subject: values.subject, minutes: Number(values.minutes), itemID: uuid()};
            console.log(data);
            //then pass that object to be added to the database and update user data afterwards
            axios.post('/api/addToDatabase', data)
                 .then(fetchUser());

            fetchUser();
            //reset fields when user clicks submit
            reset();
        }

        return (
            <form className="sessionForm" onSubmit={handleSubmit(submitForm)}>
                <Field
                    name="subject"
                    component={this.renderField}
                    label="Subject"
                    className="formInput"
                />
                <Field
                    name="minutes"
                    component={this.renderField}
                    label="Minutes"
                    className="formInput"
                />
                <button type='submit' className="formSubmit">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.subject)
        errors.subject = "Enter a subject";

    if(!values.minutes)
        errors.minutes = "Enter minutes";

    if(!Number(values.minutes))
        errors.minutes = "Enter a valid number for minutes"

    return errors;
}

export default reduxForm({
    form: "PostsNew",
    fields: ['subject', 'minutes'],
    validate,
})(connect(null, actions)(CalendarDayForm));