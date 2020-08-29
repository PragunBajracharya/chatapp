import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Avatar, IconButton} from "@material-ui/core";
import firebase from "firebase";
import ScrollToBottom from 'react-scroll-to-bottom';

import "./Chat.css";
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import db from "../../firebase/firebase";
import {connect} from "react-redux";


function Chat({currentUser}) {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
                setRoomName(snapshot.data().name)
            );
            db.collection('rooms').doc(roomId)
                .collection('messages').orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc =>
                        doc.data()
                    ))
                ))
        }
    }, [roomId]);

    const sendMessage = (event) => {
        event.preventDefault();
        db.collection('rooms').doc(roomId)
            .collection('messages').add({
            message: input,
            name: currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            senderId: currentUser.uid
        });
        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <ScrollToBottom className="chat__body">
                {messages.map((message, index) => (
                    <p key={index}
                       className={`chat__message ${message.senderId === currentUser.uid ? "chat__receiver" : ''}`}>
                            <span className="chat__name">
                                {message.name}
                            </span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </ScrollToBottom>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input placeholder="Enter a message" value={input} onChange={e => setInput(e.target.value)}/>
                    <IconButton variant="contained" color="primary" disabled={!input}
                                type="submit" onClick={sendMessage}>
                        <SendIcon color="disabled"/>
                    </IconButton>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Chat);