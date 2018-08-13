import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import axios from 'axios';

class CalendarDayInputList extends Component {
    //displayData will create list items that include the subject, minutes, and a remove button
    displayData(data){
        const test = data.map(item => {
            return (
                <li className="userInputListItem">
                    Subject: {item.subject} - Minutes: {item.minutes} <a className="removeButton" onClick={() => this.removeItem(item.itemID)}>Remove</a>
                </li>
            )
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

export default connect(mapStateToProps, actions)(CalendarDayInputList);