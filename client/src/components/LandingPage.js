import React, { Component } from 'react';
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll'

class LandingPage extends Component {

    //these two component functions will initialize the scrolling package
    componentDidMount() {
        Events.scrollEvent.register('begin', function (to, element) {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            console.log("end", arguments);
        });
        scrollSpy.update();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }


    render() {
        return (
            <div className="landing-page">
                <div className="landing-page__header">
                    <div className="landing-page__header-text">
                        <h1>Study Session</h1>
                        <p>
                            Lorem ipsum,
                            dolor sit amet consectetur
                            adipisicing elit. Rem iure
                            quos consequuntur alias
                            officia itaque, placeat,
                            quis corrupti quibusdam,
                            odit harum explicabo. Adipisci
                            eos possimus nulla repellendus
                            labore esse corporis!
                        </p>

                        <i
                            class="fa fa-arrow-circle-down landing-page__header-scroll"
                            onClick={() => scroll.scrollTo(350)}
                        >
                        </i>
                    </div>
                </div>

                <div className="landing-page__details">
                    <div className="landing-page__details-footerIntro">
                        <h1>Features</h1>
                        <div className="feature_list">
                            <div className="feature_list-item">
                                <h4>Schedule with our built in calendar</h4>
                                <p>
                                    Using the calendar, users can schedule a study Session
                                    any day of the year.
                                </p>
                            </div>
                            <div className="feature_list-item">
                                <h4>Starting the timed study session</h4>
                                <p>
                                    You can only access the study session they scheduled
                                    on that specific date. Just click on start session
                                    and you'll be able to see the remaining subjects needed
                                    to be completed. Once you start a session for a subject
                                    on a particular day, you will have to complete it without pausing.
                                    Once a session for a particular subject has been completed,
                                    it will be marked completed, and you will have the option to
                                    move on to start the next subject or just take a break.
                                </p>
                            </div>
                            <div className="feature_list-item">
                                <h4>User Dashboard</h4>
                                <p>
                                    See your progress, like how many sessions you've completed.
                                    View past sessions and set goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;