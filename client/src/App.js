import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/DashboardComponents/Dashboard';
import Calendar from './components/Calendar';
import CalendarDay from './components/CalendarDay';
import Timer from './components/Timer';
import {BrowserRouter,Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Actions';
import './css/style.css';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/calendar' component={Calendar} />
            <Route exact path="/:month/:day/:year" component={CalendarDay} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
