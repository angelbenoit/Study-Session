import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardUpcoming extends Component {
  //this function fills an array with only the sessions occuring
  //on current day or any ahead of the month
  getCurrentMonthSessions(data) {
    const currentMonthSession = [];
    const date = new Date();
    const monthIndex = date.getMonth();
    const dayIndex = date.getDate();
    //we use the date object to get the current month number
    data.forEach(item => {
        //the date in the object is formatted as month/day/year
        //so splitting it by "/" will give us month in 0th element
        let temp = item.date.split("/");
        //add 1 to monthIndex because it originally gives month 0 based
        //also make sure the it only gets days that are on the current day
        //and any days up until the end of the month
        if(Number(temp[0]) === monthIndex+1 && Number(temp[1] >= dayIndex)){
          //push the whole object if it's on current month
          currentMonthSession.push(item);
        }
    })

    //sort the data by date
    currentMonthSession.sort(function(a, b){
      //because the format is month/day/year, so
      //at index 1 will hold the dayIndex
      const day1 = a.date.split("/")[1];
      const day2 = b.date.split("/")[1];
      return day1 - day2;
    })

    return currentMonthSession;
  }

  displayUpcommingSessions(data){
    const display = data.map(item => {
      return (
        <li className="upcomming_session">
            <span>{item.date}</span>
            <span>{item.subject}</span>
            <span>{item.minutes}</span>
        </li>
      );
    })
    return display;
  }

  render() {
    const list = this.displayUpcommingSessions(this.getCurrentMonthSessions(this.props.auth.sessions));
    return (
      <div>
          <h2>Upcomming study sessions</h2>
          <ul>
            {list}
          </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(DashboardUpcoming);
