import React, {useReducer} from "react";
import {connect} from 'react-redux';

const Header = ({currentUser}) => {
    return (
        <div>
            <div>

            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);