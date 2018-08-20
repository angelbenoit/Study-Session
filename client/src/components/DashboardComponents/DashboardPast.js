import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardPast extends Component {

  getPastMonthSessions(data) {
    const pastSessions = [];
    console.log(data)
    data.forEach(item => {
        if (item.complete) {
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
      return day2 - day1;
    })
    return pastSessions;
  }

  displayPastSessions(data){
    const display = data.map(item => {
      return (
        <li className="session_display">
            <span><strong>Date:</strong> {item.date}</span>
            <span><strong>Subject:</strong> {item.subject}</span>
            <span><strong>Minutes:</strong> {item.minutes}</span>
        </li>
      );
    })
    return display;
  }

  render() {
    const past = this.displayPastSessions(this.getPastMonthSessions(this.props.auth.sessions))
    return (
      <div className="dashboard_list">
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