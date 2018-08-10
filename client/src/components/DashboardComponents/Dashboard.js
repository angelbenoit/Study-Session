import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            overview: true,
            upcoming: false,
            past: false,
            goals: false
        }
        this.changeSelection = this.changeSelection.bind(this);
        this.getSelected = this.getSelected.bind(this);
    }

    getSelected(selection) {
        if (this.state[selection])
            return { 'backgroundColor': 'rgba(220,220,220,.4)' }
    }

    changeSelection(selection) {
        switch (selection) {
            case "overview":
                this.setState({ overview: true, upcoming: false, past: false, goals: false });
                break;
            case "upcoming":
                this.setState({ overview: false, upcoming: true, past: false, goals: false });
                break;
            case "past":
                this.setState({ overview: false, upcoming: false, past: true, goals: false });
                break;
            case "goals":
                this.setState({ overview: false, upcoming: false, past: false, goals: true });
                break;
        }
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard__sideNav">
                    <a
                        className="dashboard__sideNav-item"
                        style={this.getSelected("overview")}
                        onClick={() => this.changeSelection("overview")}
                    >
                        Overview
                    </a>
                    <a
                        className="dashboard__sideNav-item"
                        style={this.getSelected("upcoming")}
                        onClick={() => this.changeSelection("upcoming")}
                    >
                        Upcoming Sessions
                    </a>
                    <a
                        className="dashboard__sideNav-item"
                        style={this.getSelected("past")}
                        onClick={() => this.changeSelection("past")}
                    >
                        Past Sessions
                    </a>
                    <a
                        className="dashboard__sideNav-item"
                        style={this.getSelected("goals")}
                        onClick={() => this.changeSelection("goals")}
                    >
                        Set Goals
                    </a>
                </div>
                <div className="dashboard__data">
                    DATA TO BE SHOWN BASED ON USER
                </div>
            </div>
        );
    }
}

export default Dashboard;