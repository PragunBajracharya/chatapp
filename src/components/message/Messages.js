import React from "react";
import {Route} from "react-router-dom";

import './Messages.css';
import Sidebar from "../siderbar/Sidebar";
import Chat from "../chat/Chat";

const Messages = () => {
    return (
        <div className="chatApp">
            <div className="chatApp__body">
                <Sidebar/>
                <Route path="/messages/:roomId">
                    <Chat/>
                </Route>
            </div>
        </div>
    );
};

export default Messages;