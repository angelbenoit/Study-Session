import React, { Component } from 'react';
import * as actions from '../../Actions';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

class DashboardOverview extends Component {
  componentWillMount(){
    this.props.fetchUser();
  }

  getTotalPercentageCompleted(data){
    if(data){
      let completedSubjects;

      if(data.totalSubjectsCompleted)
        completedSubjects = data.totalSubjectsCompleted;
      else
        completedSubjects = 0;

      const percentageCompleted = completedSubjects/data.sessions.length;
      const overviewLook = `${completedSubjects}/${data.sessions.length}`;

      const subjectsComplete = [];
      const subjectsIncomplete = [];
      data.sessions.map(item => {
        if(item.complete)
          subjectsComplete.push(item.subject);
        else
          subjectsIncomplete.push(item.subject);
      });

      const datas = {
        labels: ["Completed", "Incompleted"],
        datasets: [{
          label: "completed/incompleted",
          backgroundColor: ['#ABAEF7', 'violet'],
          data: [subjectsComplete.length, subjectsIncomplete.length],
        }]
      }

      return(
        <div>
          <h4>You've Completed {percentageCompleted}% of subjects in your study sessions</h4>
          <h4>{overviewLook}</h4>
          <Doughnut
            data={datas}
          />
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
  return {
    auth : state.auth,
   }
}

export default connect(mapStateToProps, actions)(DashboardOverview);