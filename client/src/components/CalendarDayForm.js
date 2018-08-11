import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

class CalendarDayForm extends Component {
    render() {
        const { submitForm } = this.props;
        return (
            <form className="sessionForm" onSubmit={submitForm}>
                <div>
                    <label htmlFor="subject" className="formInput">Subject</label>
                    <Field name="subject" component="input" type="text" className="formInput"/>
                </div>
                <div>
                    <label htmlFor="minutes" className="formInput">Minutes</label>
                    <Field name="minutes" component="input" type="text" className="formInput"/>
                </div>
                <button type='submit' className="formSubmit">Submit</button>
            </form>
        );
    }
}

CalendarDayForm = reduxForm({
    // a unique name for the form
    form: 'contact'
})(CalendarDayForm)

export default CalendarDayForm;