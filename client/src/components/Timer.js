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
            incompleteSubjects: [],
            currentSubject: {},
            currentPercentageCompleted: 0,
            finishedSubjects: [],
            timeDisplay: "",
            completedTodaysSession: false
        }

        this.checkCompleted = this.checkCompleted.bind(this);
        this.countDown = this.countDown.bind(this);
        this.getSessionList = this.getSessionList.bind(this);
        this.nextSubject = this.nextSubject.bind(this);
    }

    componentWillMount() {
        this.props.fetchUser();
        this.props.getTodaysSession();
    }

    componentDidMount(){
        this.checkCompleted();
    }

    checkCompleted(){
        this.props.fetchUser();
        this.props.getTodaysSession()
        //console.log(JSON.stringify(this.props.today.current))
        if(this.props.today.incompleted.length === 0 && JSON.stringify(this.props.today.current) === "{}"){
            this.setState({ completedTodaysSession: true });
            console.log(this.props.today.incompleted)
        }
        else{
            this.setState({ completedTodaysSession: false });
            console.log(JSON.stringify(this.props.today.current))
        }
    }

    countDown(minute){
        let seconds = 0;
        let secondCounter = 0;
        let percentage = 0;
        const totalSeconds = minute*60;
        let timer = setInterval(() => {
            let display = `${minute}:${seconds}`;
            percentage = ((secondCounter/totalSeconds)*100).toFixed(0);
            this.setState({ currentPercentageCompleted: percentage, timeDisplay: display });

            if(seconds === 0 && minute === 0){
              clearInterval(timer);
              this.nextSubject();
              //this.checkCompleted();
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

    nextSubject(){
        this.updateCurrent(this.props.today.current);
        this.props.getTodaysSession();
    }

    updateCurrent(current){
        axios.post('/api/updateSubject', current)
             .then(this.props.fetchUser())
             .then(this.props.getTodaysSession())
             .then(this.checkCompleted());
    }

    render() {
        let perc = this.state.currentPercentageCompleted;
        return (
                JSON.stringify(this.props.today.current) !== "{}" ?
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
                        <button className="startTimer" onClick={() => this.countDown(1)}>Start</button>
                        <h4>{this.state.timeDisplay}</h4>
                        <Segment inverted>
                            <Progress percent={perc} inverted color='violet' progress />
                        </Segment>
                    </div>
                </div>) : <h1>You've finished your session</h1>
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