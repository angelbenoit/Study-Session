import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Profile extends React.Component {
    renderContent(){
        console.log(this.props.auth);
        switch (this.props.auth){
            case null:
                return;

            case false:
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            default:
                return[
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ]
        }
    }
    render() {
        return ( 
            <div>
                {
                    this.props.auth ?
                        <h1>Hello {this.props.auth.username}</h1> :
                        <h1>Hello</h1>
                }
                {this.renderContent()}
            </div>
         );
    }
}

function mapStateToProps(state){
    return { auth: state.auth }
}
 
export default connect(mapStateToProps)(Profile);