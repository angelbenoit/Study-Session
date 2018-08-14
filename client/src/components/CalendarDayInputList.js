import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import axios from 'axios';

class CalendarDayInputList extends Component {
    //displayData will create list items that include the subject, minutes, and a remove button
    displayData(data) {
        const userInput = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === this.props.datePicked) {
                userInput.push(
                    <li className="userInputListItem">
                        <p>Subject: {data[i].subject}</p> <p>Minutes: {data[i].minutes}</p> <a className="removeButton" onClick={() => this.removeItem(data[i].itemID)}>Remove</a>
                    </li>
                );
            }
        }

        return userInput;
    }

    //route for removing item is '/api/removeItem'
    removeItem(id) {
        //we pass in the object {itemID: id} to be used in the router
        //and then update using fetchUser to get latest user data
        axios.post('/api/removeItem', { itemID: id })
            .then(this.props.fetchUser());
        this.props.fetchUser();
    }

    render() {
        let displayList;
        let validList = false;
        if (this.props.auth)
            displayList = this.displayData(this.props.auth.sessions);

        if (displayList) {
            if (displayList[0] && displayList.length > 0)
                validList = true;
        }
        else
            validList = false;

        return (
            <div>
                {
                    validList ?
                        <ul>{displayList}</ul> :
                        <h4 className="userInputListItem">You have not scheduled anything for today</h4>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(CalendarDayInputList);