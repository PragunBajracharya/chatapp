import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Messages from '../components/MessageArea';
import withAuthentication from '../containers/withAuthentication';
import './App.css';
import {auth} from "../firebase";
import {setCurrentUser} from "../redux/user/user-action";

function App(props) {
    const {setCurrentUser} = props;

    auth.getAuth().onAuthStateChanged(user => {
        if (user) {
            setCurrentUser({userId: user.uid, userName: user.displayName, userEmail: user.email, userPhoto: user.photoURL});
        }
    });

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/messages" exact component={withAuthentication(Messages)}/>
                <Route path="/dashboard" component={withAuthentication(Dashboard)}/>
            </Switch>
        </Router>
    );
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
