import React, { Component } from 'react';
import Overview from './DashboardOverview';
import Upcoming from './DashboardUpcoming';
import Past from './DashboardPast';
import Goals from './DashboardGoals';
import SideNav from '../SideNav';
import Timer from '../Timer';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            overview: true,
            upcoming: false,
            past: false,
            goals: false,
            timer: false
        }
        this.changeSelection = this.changeSelection.bind(this);
        this.displaySelected = this.displaySelected.bind(this);
        this.getSelected = this.getSelected.bind(this);
    }

    componentDidMount(){
        document.title = "Dashboard";
    }

    getSelected(selection) {
        if (this.state[selection])
            return { 'backgroundColor': 'rgb(197, 199, 255)' }
    }

    changeSelection(selection) {
        switch (selection) {
            case "overview":
                this.setState({ overview: true, upcoming: false, past: false, goals: false, timer: false });
                break;
            case "upcoming":
                this.setState({ overview: false, upcoming: true, past: false, goals: false, timer: false });
                break;
            case "past":
                this.setState({ overview: false, upcoming: false, past: true, goals: false, timer: false });
                break;
            case "goals":
                this.setState({ overview: false, upcoming: false, past: false, goals: true, timer: false });
                break;
            case "timer":
                this.setState({ overview: false, upcoming: false, past: false, goals: false, timer: true });
                break;
        }
    }

    displaySelected() {
        if (this.state.overview)
            return <Overview />;
        else if (this.state.upcoming)
            return <Upcoming />;
        else if (this.state.past)
            return <Past />;
        else if(this.state.goals)
            return <Goals />;
        else
            return <Timer />;
    }

    render() {
        return (
            <div className="dashboard">
                <SideNav
                    getSelected={this.getSelected}
                    changeSelection={this.changeSelection}
                    redirectCalendar={() => this.props.history.push("/calendar")}
                />
                <div className="dashboard__data">
                    {this.displaySelected()}
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);