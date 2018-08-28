import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../Actions';

class DashboardPast extends Component {
  clearPastSessions(data){
    axios.post('/api/clearPast', data)
         .then(this.props.fetchUser());
  }

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
    const pastSessionArray = this.getPastMonthSessions(this.props.auth.sessions);
    const past = this.displayPastSessions(pastSessionArray);
    return (
      <div className="dashboard_list">
          <h2>Past Sessions</h2>
          <button className="formSubmit" onClick={() => this.clearPastSessions(pastSessionArray)}>Clear Past Sessions</button>
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

export default connect(mapStateToProps, actions)(DashboardPast);