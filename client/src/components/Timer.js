import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import * as actions from '../Actions';
import axios from 'axios';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPercentageCompleted: 0,
            timeDisplay: "",
            timerActive: false
        }

        this.countDown = this.countDown.bind(this);
        this.getSessionList = this.getSessionList.bind(this);
        this.nextSubject = this.nextSubject.bind(this);
    }

    componentWillMount() {
        this.props.fetchUser();
        this.props.getTodaysSession();
    }

    //when user clicks on a different link in the dashboard, the timer will reset
    //since the timer will keep going on if this unmount isn't added
    componentWillUnmount(){
        clearInterval(this.state.testTimer)
    }

    countDown(minute){
        let seconds = 0;
        //secondCounter is only used to get the percentage
        let secondCounter = 0;
        let percentage = 0;
        this.setState({ timerActive: true });
        const totalSeconds = minute*60;
        let timer = setInterval(() => {
            //hold interval in the state, so if user goes to another page in
            //the dashboard, it'll be cleared
            this.setState({ timerInterval: timer })

            let display = `${minute}:${seconds}`;
            //get percentage completed
            percentage = ((secondCounter/totalSeconds)*100).toFixed(0);
            //update the percentage to be displayed within the state and add the time display
            this.setState({ currentPercentageCompleted: percentage, timeDisplay: display });

            //when timer is done
            if(seconds === 0 && minute === 0){
              clearInterval(timer);
              this.nextSubject();
              this.setState({ timerActive: false, currentPercentageCompleted: 0 });

            }

            console.log(minute, seconds, secondCounter);
            secondCounter++;
            --seconds;

            if (seconds < 0) {
                minute--;
                seconds = 59;

            }
        }, 1000);
    }

    //this function will return list of subjects depending on what type gets passed in the parameter
    getSessionList(type) {
        let listType;
        //listType will be equal to incompletesubjects or finishedsubjects in the state depending on type
        if (type === "incomplete")
            listType = this.props.today.incompleted;
        else
            listType = this.props.today.completed;

        //will return list items
        const list = listType.map(item => {
            return (
                <li>
                    {item.subject} for {item.minutes} minutes
                </li>
            );
        })
        return list;
    }

    //when user finishes the current subject, it will check to see if they can move on
    nextSubject(){
        console.log(this.props.today.current);
        this.updateCurrent(this.props.today.current);
        this.props.getTodaysSession();
    }

    //axios post will set the current subject's finished property to true
    //and will then update the api
    updateCurrent(current){
        axios.post('/api/updateSubject', current)
             .then(this.props.fetchUser())
             .then(this.props.getTodaysSession());
    }

    render() {
        let perc = this.state.currentPercentageCompleted;
        return (
                this.props.today.current !== null && JSON.stringify(this.props.today.current) !== "{}" ?
                (<div>
                    <div className="subject_list">
                        <div className="incomplete_subjects">
                            <h1>Incomplete</h1>
                            <ul>
                                {this.getSessionList("incomplete")}
                            </ul>
                        </div>
                        <div className="current_subject">
                            <h1>Current Subject</h1>
                                <p>
                                    Now studying {this.props.today.current.subject}
                                    &nbsp;for {this.props.today.current.minutes} minutes
                                </p>
                        </div>
                        <div className="complete_subjects">
                            <h1>Completed</h1>
                            <ul>
                                {this.getSessionList("complete")}
                            </ul>
                        </div>
                    </div>

                    <div className="timer_display">
                        <button disabled={this.state.timerActive} className="startTimer" onClick={() => this.countDown(this.props.today.current.minutes)}>Start</button>
                        <h4 className="timer_display__clockCountdown">{this.state.timeDisplay}</h4>
                        <Segment inverted>
                            <Progress percent={perc} inverted color='violet' progress />
                        </Segment>
                    </div>
                </div>) :
                <div className="dashboard-overview">
                    <h1 className="overview-header">You've have no more subjects to study</h1>
                    <p className="overview-instructions">
                        Click on the calendar to schedule something
                        on today's date.
                    </p>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        today: state.today
     }
}

export default connect(mapStateToProps, actions)(Timer);