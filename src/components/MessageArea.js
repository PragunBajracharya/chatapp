import React, {useEffect, useState} from 'react';
import {FormControl, Input} from "@material-ui/core";
import firebase from 'firebase';
import $ from "jquery";
import FlipMove from 'react-flip-move';
import {IconButton} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {connect} from 'react-redux';

import Message from "./Message";
import '../containers/App.css';

import {db} from "../firebase/db";

const Messages = ({currentUser}) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        db.collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})));
            });
    }, []);

    useEffect(() => {
        setUsername(currentUser.userName);
    },[currentUser.userName]);

    useEffect(() => {
        $(document).ready(() => {
            let windowHeight = $(window).innerHeight();
            let messageField = $('.app__form').outerHeight();
            $('.app__messageBoxWrapper').height(windowHeight - messageField - 75);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        db.collection('messages').add({
            message: input,
            username: username,
            senderId: currentUser.userId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('');
        let h = $('.app__messageBox')[0].scrollHeight;
        $('.app__messageBox').scrollTop(h);
    };

    return (
        <div className="App">
            <h2>Welcome {username}</h2>
            <div className="app__messageBoxWrapper">
                <div className="app__messageBox">
                    <FlipMove>
                        {
                            messages.map(({id, message}) => (
                                <Message key={id} message={message} senderId={currentUser.userId}/>
                            ))
                        }
                    </FlipMove>
                </div>
            </div>
            <form className="app__form">
                <FormControl className="app__formControl">
                    <Input className="app__input" value={input} onChange={event => setInput(event.target.value)}
                           placeholder="Enter a message"/>
                    <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary"
                                type="submit"
                                onClick={sendMessage}>
                        <SendIcon/>
                    </IconButton>
                </FormControl>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Messages);