import React from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const Header = ({currentUser}) => {
    return (
        <div>
            <Link to="/dashboard">Dashboard</Link>
            <br/>
            <Link to="/messages">Messages</Link>
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);