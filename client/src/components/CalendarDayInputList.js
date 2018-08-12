import React, { Component } from 'react';
import { connect } from 'react-redux';

class CalendarDayInputList extends Component {
    displayData(data){
        const test = data.map(item => {
            return (
                <li className="userInputListItem">
                    Subject: {item.subject} - Minutes: {item.minutes}
                </li>
            )
        });
        return test;
    }

    render() {
        let displayList;
        if(this.props.auth)
            displayList = this.displayData(this.props.auth.sessions);

        return (
            <div>
                <ul>
                    {displayList}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { auth: state.auth }
}

export default connect(mapStateToProps, null)(CalendarDayInputList);