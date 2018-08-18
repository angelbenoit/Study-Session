import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incompleteSubjects: [],
            currentSubject: {},
            currentPercentageCompleted: 0,
            finishedSubjects: []
        }

        this.countDown = this.countDown.bind(this);
        this.getSessionList = this.getSessionList.bind(this);
        this.getTodaysSession = this.getTodaysSession.bind(this);
        this.initializeCurrentSubject = this.initializeCurrentSubject.bind(this);
        this.nextSubject = this.nextSubject.bind(this);
    }

    componentWillMount() {
        this.getTodaysSession(this.props.auth.sessions)
    }

    componentDidMount(){
        this.initializeCurrentSubject();
    }

    countDown(minute){
        let seconds = 0;
        let secondCounter = 0;
        let percentage = 0;
        const totalSeconds = minute*60;
        let timer = setInterval(() => {
            percentage = ((secondCounter/totalSeconds)*100).toFixed(0);
            this.setState({ currentPercentageCompleted: percentage});
            //console.log(`percentage is ${((secondCounter/totalSeconds)*100).toFixed(0)}`);
            if(seconds === 0 && minute === 0){
              clearInterval(timer);
              this.nextSubject();
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

    //this function will get only today's data from user api
    getTodaysSession(data) {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        /*
            totalDate will create a string in mm/dd/yyyy to compare all the dates in
            the api(which are strings). The api has sessions array which is made up of objects.
            each one contains the information about the session, which includes date
        */
        const totalDate = `${month}/${day}/${year}`;

        //fill out complete and incomplete array to include in the state
        const complete = [];
        const incomplete = [];

        //this for loop compares the dates, and inside the if state,
        //fill in the complete and incomplete array
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === totalDate) {
                if (data[i].complete)
                    complete.push(data[i])
                else
                    incomplete.push(data[i])
            }
        }

        //finally set the state with the filled in arrays
        this.setState({
            incompleteSubjects: incomplete,
            finishedSubjects: complete
        })
    }

    //this function will return list of subjects depending on what type gets passed in the parameter
    getSessionList(type) {
        let listType;
        //listType will be equal to incompletesubjects or finishedsubjects in the state depending on type
        if (type === "incomplete")
            listType = this.state.incompleteSubjects;
        else
            listType = this.state.finishedSubjects;

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

    initializeCurrentSubject(){
        //get index of last item in incompleted subjects list
        const lastSubjectIndex = this.state.incompleteSubjects.length-1;
        console.log(lastSubjectIndex, this.state.incompleteSubjects);
        //if the incomplete array exists, then remove the last one and set state
        //for current subject to that last subject in incomplete list and update the
        //incomplete list with the removed item
        if(this.state.incompleteSubjects && this.state.incompleteSubjects[lastSubjectIndex]){
            const lastSubject = this.state.incompleteSubjects.pop();
            //updating state without the last item
            const filterIncomplete = this.state.incompleteSubjects;
            this.setState({
                currentSubject: lastSubject,
                incompleteSubjects: filterIncomplete
            });
        }
    }

    nextSubject(){
        if(this.state.currentSubject){
            if(this.state.incompleteSubjects){
                const current = this.state.currentSubject;
                const incomplete = this.state.incompleteSubjects;
                const newCurrent = incomplete.pop();
                this.setState({
                    incompleteSubjects: incomplete,
                    currentSubject: newCurrent,
                    finishedSubjects: this.state.finishedSubjects.concat(current)
                });
            }
        }
    }

    render() {
        let perc = this.state.currentPercentageCompleted;
        return (
            <div>
                <div className="subject_list">
                    <div className="incomplete_subjects">
                        <h1>Incomplete</h1>
                        <ul>
                            {this.getSessionList("incomplete")}
                        </ul>
                    </div>
                    <div className="current_subject">
                        <h1>Current Subject</h1>
                        {
                            this.state.currentSubject ?
                            <p>
                                Now studying {this.state.currentSubject.subject}
                                &nbsp;for {this.state.currentSubject.minutes} minutes
                            </p> : ""
                        }

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
                    <Segment inverted>
                        <Progress percent={perc} inverted color='violet' progress />
                    </Segment>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Timer);