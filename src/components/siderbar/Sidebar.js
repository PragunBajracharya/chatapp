import React, {useEffect, useState} from "react";
import {Avatar, IconButton} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import {connect} from 'react-redux';

import "./Sidebar.css";
import SidebarChat from "./sidebarChat/SidebarChat";
import {Link} from "react-router-dom";
import db from "../../firebase/firebase";

function Sidebar({currentUser}) {
    const [rooms, setRooms] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
            ))
        ));
    }, []);

    useEffect(() => {
        if (searchInput) {
            db.collection('users')
                .where("name", "==", searchInput)
                .onSnapshot(snapshot =>
                    setSearchResult(snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })
                    ))
                )
            console.log(searchInput);
        }
    }, [searchInput]);

    useEffect(() => {
        if (searchResult.length > 0) {
            console.log(searchResult);
        }
    }, [searchResult]);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Link to="/profile">
                    <Avatar src={currentUser?.photoURL} alt={currentUser?.displayName}
                            title={currentUser?.displayName}/>
                </Link>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon/>
                    <input type="text" placeholder="Search or start new chat" value={searchInput}
                           onChange={e => setSearchInput(e.target.value)}/>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat="true"/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Sidebar);
