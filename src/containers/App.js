import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import withAuthentication from '../containers/withAuthentication';
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/dashboard" component={withAuthentication(Dashboard)}/>
            </Switch>
        </Router>
    );
}

export default App;
