import React, {useEffect, useState} from 'react';
import {FormControl, Input} from "@material-ui/core";
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import {IconButton} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import Message from "./Message";
import '../containers/App.css';

import {db} from "../firebase/db";

function Messages() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        db.collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})));
            });
    }, []);

    useEffect(() => {
        setUsername(prompt("Please enter your name"));
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        db.collection('messages').add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('');
    };

    return (
        <div className="App">
            <h2>Welcome {username}</h2>
            <div class="app__messageBoxWrapper">
                <div class="app__messageBox">
                    <FlipMove>
                        {
                            messages.map(({id, message}) => (
                                <Message key={id} message={message} username={username}/>
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

export default Messages;