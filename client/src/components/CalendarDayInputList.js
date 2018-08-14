import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import axios from 'axios';

class CalendarDayInputList extends Component {
    //displayData will create list items that include the subject, minutes, and a remove button
    displayData(data){
        const test = data.map(item => {
            if(item.date === this.props.datePicked){
                return (
                    <li className="userInputListItem">
                        <p>Subject: {item.subject}</p> <p>Minutes: {item.minutes}</p> <a className="removeButton" onClick={() => this.removeItem(item.itemID)}>Remove</a>
                    </li>
                )
            }
        });
        return test;
    }

    //route for removing item is '/api/removeItem'
    removeItem(id){
        //we pass in the object {itemID: id} to be used in the router
        //and then update using fetchUser to get latest user data
        axios.post('/api/removeItem', {itemID: id})
             .then(this.props.fetchUser());
             this.props.fetchUser();
    }

    render() {
        let displayList;
        let validList;
        if(this.props.auth)
            displayList = this.displayData(this.props.auth.sessions);

        if(displayList){
            if(displayList[0] && displayList.length > 0)
                validList = true;
        }
        else
            validList = false;

        return (
                <div>
                    {
                        validList ?
                        <ul>{displayList}</ul> :
                        <h4>You have not scheduled anything for today</h4>
                    }
                </div>
        );
    }
}

function mapStateToProps(state){
    return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(CalendarDayInputList);