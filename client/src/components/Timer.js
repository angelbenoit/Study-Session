import React, { Component } from 'react';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';

class Timer extends Component {
    constructor(props){
        super(props);

        this.state = {
            incompleteSubjects: [],
            currentSubject: {},
            finishedSubjects: []
        }

        this.getTodaysSession = this.getTodaysSession.bind(this);
    }

    componentDidMount(){
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

        for(let i = 0; i < data.length; i++){
            if(data[i].date === totalDate){
                if(data[i].complete)
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

    render() {
        console.log(this.state)
        return (
            <div>
                <div>
                    <Countdown date={Date.now() + 60000}/>
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Timer);