import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SocialButtonList from '../social-button-list/SocialButtonList';
import SocialProfileList from '../social-profile-list/SocialProfileList';
import {auth} from '../../firebase/firebase';

import './Profile.css';
import {setCurrentUser} from "../../redux/user/user-action";
import {connect} from "react-redux";

class Dashboard extends Component {
    static propTypes = {
        providerData: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    static defaultProps = {
        providerData: []
    };

    state = {
        buttonList: {
            github: {
                visible: true,
                provider: () => {
                    const provider = auth.githubOAuth();
                    provider.addScope('user');
                    return provider;
                }
            },
            facebook: {
                visible: true,
                provider: () => auth.facebookOAuth()
            },
            google: {
                visible: true,
                provider: () => auth.googleOAuth()
            }
        },
        providerData: this.props.providerData
    };

    componentDidMount() {
        this.updateProviders(this.state.providerData);
    }

    handleCurrentProviders = providerData => {
        this.updateProviders(providerData);
    };

    updateProviders = providerData => {
        let buttonList = {...this.state.buttonList};

        providerData.forEach(provider => {
            const providerName = provider.providerId.split('.')[0];
            buttonList = this.updateButtonList(buttonList, providerName, false);
        });

        this.setState({buttonList, providerData});
    };

    handleUnliknedProvider = (providerName, providerData) => {
        if (providerData.length < 1) {
            auth
                .getAuth()
                .currentUser.delete()
                .then(() => console.log('User Deleted'))
                .catch(() => console.error('Error deleting user'));
        }

        let buttonList = {...this.state.buttonList};
        buttonList = this.updateButtonList(buttonList, providerName, true);

        this.setState({buttonList, providerData});
    };

    updateButtonList = (buttonList, providerName, visible) => ({
        ...buttonList,
        [providerName]: {
            ...buttonList[providerName],
            visible
        }
    });

    render() {
        return (
            <div>
                <SocialProfileList
                    auth={auth.getAuth}
                    providerData={this.state.providerData}
                    unlinkedProvider={this.handleUnliknedProvider}
                />
                <p style={{textAlign: 'center'}}>
                    <strong>Connect Other Social Accounts</strong>
                </p>
                <SocialButtonList
                    buttonList={this.state.buttonList}
                    auth={auth.getAuth}
                    currentProviders={this.handleCurrentProviders}
                />
                <button
                    className="btn__logout"
                    onClick={() => {
                        auth.signOut();
                        this.props.setCurrentUser(null);
                    }}
                >
                    Logout
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(Dashboard);