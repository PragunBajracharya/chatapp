import React from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import './Header.css';

const Header = ({currentUser}) => {
    return (
        <div class="header">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/messages">Messages</Link></li>
            </ul>
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);