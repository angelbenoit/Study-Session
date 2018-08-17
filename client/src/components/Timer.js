import React, { Component } from 'react';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';
import { Progress, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incompleteSubjects: [],
            currentSubject: {},
            finishedSubjects: []
        }

        this.getSessionList = this.getSessionList.bind(this);
        this.getTodaysSession = this.getTodaysSession.bind(this);
    }

    componentDidMount() {
        this.getTodaysSession(this.props.auth.sessions)
    }

    getTodaysSession(data) {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const totalDate = `${month}/${day}/${year}`;
        const complete = [];
        const incomplete = [];

        for (let i = 0; i < data.length; i++) {
            if (data[i].date === totalDate) {
                if (data[i].complete)
                    complete.push(data[i])
                else
                    incomplete.push(data[i])
            }
        }

        this.setState({
            incompleteSubjects: incomplete,
            finishedSubjects: complete
        })
    }

    getSessionList(type) {
        let listType;
        if (type === "incomplete")
            listType = this.state.incompleteSubjects;
        else
            listType = this.state.finishedSubjects;

        const list = listType.map(item => {
            return (
                <li>
                    {item.subject} for {item.minutes} minutes
                </li>
            );
        })
        return list;
    }

    render() {

        return (
            <div>
                <div className="subject_lists">
                    <div className="incomplete_subjects">
                        <h1>Incomplete</h1>
                        <ul>
                            {this.getSessionList("incomplete")}
                        </ul>
                    </div>
                    <div className="complete_subjects">
                        <h1>Completed</h1>
                        <ul>
                            {this.getSessionList("complete")}
                        </ul>
                    </div>
                </div>


                <div className="timer_display">
                    <Segment inverted>
                        <Progress percent={34} inverted color='red' progress />
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