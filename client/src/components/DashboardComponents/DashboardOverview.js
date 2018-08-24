import React, { Component } from 'react';
import * as actions from '../../Actions';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

class DashboardOverview extends Component {
  componentWillMount(){
    this.props.fetchUser();
  }

  displayContent(data){
    if(data && data.sessions.length)
      return this.getTotalPercentageCompleted(data);
    else
      return this.getDefaultOverview();
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
          backgroundColor: ['#ABAEF7', 'purple'],
          data: [subjectsComplete.length, subjectsIncomplete.length],
        }]
      }

      return(
        <div className="graph-page">
          <h4>You've Completed {percentageCompleted}% of subjects in your study sessions</h4>
          <h4>{overviewLook}</h4>
          <Doughnut
            data={datas}
          />
        </div>
      )
    }
  }

  getDefaultOverview(){
    return(
      <div>
          <h3 className="overview-header">You don't have anything scheduled</h3>
          <div className="overview-instructions">
            <p>
                To schedule any subject, pick a date in the calendar
                and type in a subject and the time you'll study for.
            </p>
            <p>
                Afterwards, a graph will appear on this page showing
                the percentage of subjects you've completed studying.
            </p>
            <p>
                To finish studying a subject, you will have to click on
                "Start Session" and go through the entire time to finish
                it. After that, it will be marked complete.
            </p>
          </div>
      </div>
    )
  }

  render() {
    const overview = this.displayContent(this.props.auth);
    return (
      <div className="dashboard-overview">
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