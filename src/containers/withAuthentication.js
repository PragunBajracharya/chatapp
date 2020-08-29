import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router";
import Delay from 'react-delay';

import {auth} from "../firebase/firebase";

export default WrappedComponent => {
    const WithAuthentication = (props) => {
        const [providerData, setProviderData] = useState([]);
        const history = useHistory();

        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setProviderData(user.providerData);
                } else {
                    console.info('Must be authenticated');
                    history.push('/');
                }
            });
        });

        return (
            providerData.length > 0 ? (
                <WrappedComponent
                    {...props}
                    providerData={providerData}
                />
            ) : (
                <Delay wait={250}>
                    <div className="center">
                        <h1>Loading...</h1>
                    </div>
                </Delay>
            )
        );
    }

    return WithAuthentication;
}