import React, { Component } from 'react';
import CalendarDayForm from './CalendarDayForm';
import CalendarDayInputList from './CalendarDayInputList';
import { getMonthName, daysInMonth, checkDate } from '../getDates';
import { withRouter } from 'react-router-dom';

class SpecifiedDay extends Component {
    componentDidMount() {
        // when the page loads, we validate that the user hasn't entered an invalid date in the url parameters
        // also check that the date picked is not in the past
        if (!(this.validateMonth() && this.validateDays()))
            this.redirectToCalendar();
        else if(!(checkDate(Number(this.props.match.params.month)-1, Number(this.props.match.params.year))))
            this.redirectToCalendar();
    }

    redirectToCalendar() {
        this.props.history.push("/calendar");
    }

    validateDays() {
        const month = Number(this.props.match.params.month);
        const year = Number(this.props.match.params.year);
        const days = Number(this.props.match.params.day);
        const dayCount = daysInMonth(month, year);
        console.log(days, dayCount)
        if (dayCount < days || days < 1)
            return false;
        else
            return true;
    }

    validateMonth() {
        const months = [
            "january", "february",
            "march", "april",
            "may", "june",
            "july", "august",
            "september", "october",
            "november", "december"
        ];
        if (Number(this.props.match.params.month) > 12 || Number(this.props.match.params.month) < 1)
            return false;

        const monthName = getMonthName(Number(this.props.match.params.month) - 1);
        for (let i = 0; i < months.length; i++) {
            if (months[i] === monthName.toLowerCase())
                return true;
        }
        return false;
    }

    render() {
        const datePicked = `${this.props.match.params.month}/${this.props.match.params.day}/${this.props.match.params.year}`;
        return (
            <div>
                <div className="day-header">
                    <p className="day-header-back" onClick={() => this.redirectToCalendar()}>
                        <i class="fa fa-arrow-left"></i> Go Back
                    </p>
                    <div className="day-header-date">
                        <p className="day-header__item">{getMonthName(Number(this.props.match.params.month) - 1)}</p>
                        <p className="day-header__item">{Number(this.props.match.params.day)}</p>
                        <p className="day-header__item">{this.props.match.params.year}</p>
                    </div>
                </div>
                <div>
                    <CalendarDayForm
                        datePicked={datePicked}
                    />
                </div>
                <div>
                    <CalendarDayInputList />
                </div>
            </div>
        );
    }
}

export default withRouter(SpecifiedDay);