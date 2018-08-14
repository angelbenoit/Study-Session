import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardPast extends Component {

  checkDate(itemDate) {
    const date = new Date();
    const monthIndex = date.getMonth();
    const dayIndex = date.getDate();
    const currentYear = date.getFullYear();
    const dateFormat = itemDate.split("/");
    //console.log(dateFormat, monthIndex, dayIndex, currentYear)
    //if the year passed in is less than the current year, then it means its from the past
    if (dateFormat[2] < currentYear)
      return true;

    //if it's the current year but a previous month
    else if (Number(dateFormat[2]) === currentYear && Number(dateFormat[0]) < monthIndex + 1)
      return true;

    //if it's the current year and month, check if the day is from earlier in the month
    else if ((Number(dateFormat[2]) === currentYear && Number(dateFormat[0]) === monthIndex + 1) && Number(dateFormat[1]) < dayIndex)
      return true;

    //otherwise return false, meaning not from the past
    else
      return false;
  }

  getPastMonthSessions(data) {
    const pastSessions = [];

    data.forEach(item => {
      if (this.checkDate(item.date)) {
        //push the whole object if it's from the past
        pastSessions.push(item);
      }
    })

    //sort the data by date
    pastSessions.sort(function (a, b) {
      //because the format is month/day/year, so
      //at index 1 will hold the dayIndex
      const day1 = a.date.split("/")[1];
      const day2 = b.date.split("/")[1];
      return day1 - day2;
    })
    return pastSessions;
  }

  displayPastSessions(data){
    const display = data.map(item => {
      return (
        <li className="session_display">
            <span>{item.date}</span>
            <span>{item.subject}</span>
            <span>{item.minutes}</span>
        </li>
      );
    })
    return display;
  }

  render() {
    const past = this.displayPastSessions(this.getPastMonthSessions(this.props.auth.sessions))
    return (
      <div>
          <h2>Past Sessions</h2>
          <ul>
            {past}
          </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(DashboardPast);