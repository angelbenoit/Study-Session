import React, { Component } from 'react';
import CalendarDayForm from './CalendarDayForm';
import { getMonthName, daysInMonth } from '../getDates';
import { withRouter } from 'react-router-dom';

class SpecifiedDay extends Component {
    componentDidMount() {
        if (this.validateMonth() && this.validateDays())
            console.log("VALID DATE");
        else
            this.props.history.push("/");
    }

    redirectToCalendar() {
        this.props.history.push("/calendar");
    }

    validateDays() {
        const month = Number(this.props.match.params.month);
        const year = Number(this.props.match.params.year);
        const days = Number(this.props.match.params.day);
        const dayCount = daysInMonth(month, year);
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
        if (Number(this.props.match.params.month) - 1 > 12 || Number(this.props.match.params.month) - 1 < 1)
            return false;

        const monthName = getMonthName(Number(this.props.match.params.month) - 1);
        for (let i = 0; i < months.length; i++) {
            if (months[i] === monthName.toLowerCase())
                return true;
        }
        return false;
    }

    render() {
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
                    <CalendarDayForm />
                </div>
            </div>
        );
    }
}

export default withRouter(SpecifiedDay);