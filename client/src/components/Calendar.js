import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { getMonthName, getMonthStart, checkDate } from '../getDates';

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            month: 7,
            year: 2018
        }

        this.addMonth = this.addMonth.bind(this);
        this.subtractMonth = this.subtractMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.redirectToSpecifiedDate = this.redirectToSpecifiedDate.bind(this);
    }

    addMonth(){
        if(this.state.month === 11)
            this.setState((prevState) => {
                return { year: prevState.year + 1, month: 0}
            })
        else
            this.setState((prevState) => {
                return { month: prevState.month + 1 }
            });
    }

    subtractMonth(){
        if(this.state.month === 0)
            this.setState((prevState) => {
                return { year: prevState.year - 1, month: 11}
            })
        else
            this.setState((prevState) => {
                return { month: prevState.month - 1}
            });
    }

    changeYear(direction) {
        let directionNum;

        if (direction === "forward")
            directionNum = 1;
        else
            directionNum = -1;

        this.setState((prevState) => {
            return { year: prevState.year + directionNum }
        });
    }



    displayCalendar(datesArray) {
        const renderedCalendar = [[], [], [], [], [], []];
        let calendarIndex = 0;
        for (let i = 0; i < datesArray.length; i++) {
            if ((i + 1) % 7 === 0) {
                renderedCalendar[calendarIndex].push(datesArray[i]);
                calendarIndex++;
            }
            else {
                renderedCalendar[calendarIndex].push(datesArray[i])
            }
        }

        const data = (
            <table style={{ 'width': '100%' }} cellspacing="0">
                <tr className="week-name__row">
                    <th className="week-name">Sun</th>
                    <th className="week-name">Mon</th>
                    <th className="week-name">Tue</th>
                    <th className="week-name">Wed</th>
                    <th className="week-name">Thu</th>
                    <th className="week-name">Fri</th>
                    <th className="week-name">Sat</th>
                </tr>

                <tr className="week-row">{renderedCalendar[0]}</tr>
                <tr className="week-row">{renderedCalendar[1]}</tr>
                <tr className="week-row">{renderedCalendar[2]}</tr>
                <tr className="week-row">{renderedCalendar[3]}</tr>
                <tr className="week-row">{renderedCalendar[4]}</tr>
                <tr className="week-row">{renderedCalendar[5]}</tr>
            </table>
        )

        return data;
    }

    fillCalendar(dateObject) {
        let dates = [];
        let display = [];
        for (let i = 0; i < dateObject.length; i++) {
            let splitDateObject = dateObject[i].toString().split(" ");
            let dayOfWeek = splitDateObject[0];
            let dayNumber = splitDateObject[2];
            dates.push({
                dayWeek: dayOfWeek,
                dayNum: dayNumber
            })
        }

        for (let index = 0; index < 42; index++) {
            display.push(<td className="week-blank"></td>)
        }

        //firstDayOfMonth gets the day of the week, for example monday = 1, thursday = 3, sunday = 0
        const firstDayOfMonth = getMonthStart(dates[0].dayWeek);

        //the second for loop fills in the boxes with actual dates, it will be filled in
        //with the day of the week and month number
        for (let k = 0; k < Number(dates[dates.length - 1].dayNum); k++) {
            display[k + firstDayOfMonth] = (<td
                className="week-day"
                onClick={() => this.redirectToSpecifiedDate(dates[k].dayNum)}
            >
                {Number(dates[k].dayNum)}
            </td>);
        }

        return this.displayCalendar(display);
    }

    getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    redirectToSpecifiedDate(day) {
        if(checkDate(this.state.month, this.state.year))
            this.props.history.push(`${this.state.month + 1}/${day}/${this.state.year}`)
    }

    render() {
        const test = this.getDaysInMonth(this.state.month, this.state.year);
        const cal = this.fillCalendar(test);
        const month = getMonthName(this.state.month);
        return (
            <div className="calendar">

                <div className="calendar_header">
                    <i className="fa fa-angle-double-left arrows" onClick={() => this.changeYear("backward")}></i>
                    <i className="fa fa-angle-left arrows" onClick={this.subtractMonth}></i>
                    {month} {this.state.year}
                    <i className="fa fa-angle-right arrows" onClick={this.addMonth}></i>
                    <i className="fa fa-angle-double-right arrows" onClick={() => this.changeYear("forward")}></i>

                </div>

                <div className="calendar_body">
                    {cal}
                </div>

                <div className="calendar_goBack">
                    <NavLink to="/dashboard" className="redirectDashboard">
                        <i class="fa fa-arrow-left"></i> Dashboard
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default withRouter(LandingPage);