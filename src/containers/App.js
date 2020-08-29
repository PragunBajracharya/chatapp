import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Login from '../components/login/Login';
import Profile from '../components/profile/Profile';
import Messages from '../components/message/Messages';
import './App.css';
import withAuthentication from "./withAuthentication";
import db, {auth} from "../firebase/firebase";
import {setCurrentUser} from "../redux/user/user-action";


function App(props) {
    const {setCurrentUser} = props;
    const [hasUser, setHasUser] = useState([]);


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user);
            }
        });
    }, [props.currentUser]);

    useEffect(() => {
        const cUser = props.currentUser;
        if (cUser) {
            db.collection('users').where("email", "==", cUser?.email).limit(1)
                .onSnapshot(snapshot => (
                    setHasUser(snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })
                    ))
                ));
        }
    }, [props.currentUser]);

    useEffect(() => {
        if (hasUser.length === 0 && props.currentUser) {
            db.collection('users').add({
                id: props.currentUser.uid,
                name: props.currentUser.displayName,
                email: props.currentUser.email,
                photoURL: props.currentUser.photoURL
            });
        }
    }, [hasUser]);

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/messages" component={withAuthentication(Messages)}/>
                    <Route path="/profile" exact component={withAuthentication(Profile)}/>
                    <Route path="*">
                        <Redirect to="/messages"/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
