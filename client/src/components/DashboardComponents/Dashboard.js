import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <div className="dashboard__sideNav">
                    <a className="dashboard__sideNav-item">Overview</a>
                    <a className="dashboard__sideNav-item">Upcoming Sessions</a>
                    <a className="dashboard__sideNav-item">Past Sessions</a>
                    <a className="dashboard__sideNav-item">Set Goals</a>
                </div>
                <div className="dashboard__data">
                    DATA TO BE SHOWN BASED ON USER
                </div>
            </div>
        );
    }
}

export default Dashboard;