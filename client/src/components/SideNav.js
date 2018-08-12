import React, { Component } from 'react';

class SideNav extends Component {
    render() {
        return (
            <div className="dashboard__sideNav">
                <a
                    className="dashboard__sideNav-item"
                    style={this.props.getSelected("overview")}
                    onClick={() => this.props.changeSelection("overview")}
                >
                    Overview
                </a>
                <a
                    className="dashboard__sideNav-item"
                    style={this.props.getSelected("upcoming")}
                    onClick={() => this.props.changeSelection("upcoming")}
                >
                    Upcoming Sessions
                </a>
                <a
                    className="dashboard__sideNav-item"
                    style={this.props.getSelected("past")}
                    onClick={() => this.props.changeSelection("past")}
                >
                    Past Sessions
                </a>
                <a
                    className="dashboard__sideNav-item"
                    style={this.props.getSelected("goals")}
                    onClick={() => this.props.changeSelection("goals")}
                >
                    Set Goals
                </a>
                <a
                    className="dashboard__sideNav-item"
                    style={this.props.getSelected("timer")}
                    onClick={() => this.props.changeSelection("timer")}
                >
                    Start Your Session
                </a>
                <a
                    className="dashboard__sideNav-item"
                    onClick={this.props.redirectCalendar}
                >
                    Calendar
                </a>
            </div>
        );
    }
}

export default SideNav;