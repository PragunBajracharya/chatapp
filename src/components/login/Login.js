import React from 'react';
import {useHistory} from "react-router";
import {Button} from "@material-ui/core";

import "./Login.css";
import {auth, githubOAuth, facebookOAuth, googleOAuth} from "../../firebase/firebase";

function Login() {
    const history = useHistory();

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleOAuth)
            .then((result) => {

            })
            .catch(err => console.log(err));
    };

    const signInWithFacebook = () => {
        auth.signInWithPopup(facebookOAuth)
            .then((result) => {

            })
            .catch(err => console.log(err));
    };

    const signInWithGithub = () => {
        auth.signInWithPopup(githubOAuth)
            .then((result) => {

            })
            .catch(err => console.log(err));
    };

    auth.onAuthStateChanged(user => {
        if (user) {
            history.push('/messages');
        }
    });

    return (
        <div className="login">
            <div className="login__container">
                <div className="login__text">
                    <h1>Simple Chat App using React and Firebase</h1>
                    <h2>Created By- <a href="https://pragunbaj.com" target="_blank" rel="noopener noreferrer">Pragun
                        Bajracharya</a></h2>
                </div>
                <Button type="submit" onClick={signInWithGoogle} className="btn__social btn--google">
                    Google
                </Button>
                <Button type="submit" onClick={signInWithFacebook} className="btn__social btn--facebook">
                    Facebook
                </Button>
                <Button type="submit" onClick={signInWithGithub} className="btn__social btn--github">
                    Github
                </Button>
            </div>
        </div>
    );
}

export default Login;