import React, {forwardRef} from "react";
import {Card, CardContent, Typography} from "@material-ui/core";

import "./Message.css";

const Message = forwardRef(({message, senderId}, ref) => {
    console.log(senderId, message.senderId);
    const isUser = senderId === message.senderId;
    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={`message__card ${isUser ? "message__userCard" : "message__guestCard"}`}>
                <CardContent className="message__wrapper">
                    <Typography color="white" variant="h5" component="h2">
                        {!isUser && `${message.username || 'Unknown User'} : `}{message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
})

export default Message;