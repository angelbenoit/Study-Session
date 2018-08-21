import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardOverview extends Component {

  getTotalPercentageCompleted(data){
    if(data){
      let completedSubjects;
      if(data.totalSubjectsCompleted)
        completedSubjects = data.totalSubjectsCompleted;
      else
        completedSubjects = 0;

      const percentageCompleted = completedSubjects/data.sessions.length;
      const overviewLook = `${completedSubjects}/${data.sessions.length}`;
      console.log(percentageCompleted, overviewLook);
      return(
        <div>
          <h4>You've Completed {percentageCompleted}% of subjects in your study sessions</h4>
          <h4>{overviewLook}</h4>
        </div>
      )
    }
  }

  render() {
    const overview = this.getTotalPercentageCompleted(this.props.auth)
    return (
      <div>
        {overview}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth : state.auth }
}

export default connect(mapStateToProps)(DashboardOverview);