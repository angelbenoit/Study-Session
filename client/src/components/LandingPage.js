import React, { Component } from 'react';

class LandingPage extends Component {
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

                        <i class="fa fa-arrow-circle-down landing-page__header-scroll">
                        </i>
                    </div>

                </div>
            </div>
        );
    }
}

export default LandingPage;