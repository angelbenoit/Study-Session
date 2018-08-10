import React, { Component } from 'react';
import Overview from './DashboardOverview';
import Upcoming from './DashboardUpcoming';
import Past from './DashboardPast';
import Goals from './DashboardGoals';

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
        this.displaySelected = this.displaySelected.bind(this);
        this.getSelected = this.getSelected.bind(this);
    }

    getSelected(selection) {
        if (this.state[selection])
            return { 'backgroundColor': 'rgb(197, 199, 255)' }
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

    displaySelected(){
        if(this.state.overview)
            return <Overview />;
        else if(this.state.upcoming)
            return <Upcoming />;
        else if(this.state.past)
            return <Past />;
        else
            return <Goals />;
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
                    {this.displaySelected()}
                </div>
            </div>
        );
    }
}

export default Dashboard;