import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

class CalendarDayForm extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className="sessionItems">
                <label className="formLabel">{field.label}</label>
                <input className="formInput" type="text" {...field.input} />
                <div className="f ormError">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }



    render() {
        const { handleSubmit, reset } = this.props;

        function submitForm(values){
            console.log(values);
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
                <div className="buttonSubmitGroup">
                    <button type='submit' className="formSubmit">Submit</button>
                    <button onClick={reset} className="formSubmit">Clear Values</button>
                </div>
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

    return errors;
}

export default reduxForm({
    form: "PostsNew",
    fields: ['subject', 'minutes'],
    validate,
})(CalendarDayForm);