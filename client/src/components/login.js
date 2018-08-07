import React from 'react';
class Login extends React.Component {
    render() { 
        return ( 
            <div className="login">
                <a href="/auth/google" ><button className="login__background">Login with google</button></a>
            </div>
         )
    }
}
 
export default Login;