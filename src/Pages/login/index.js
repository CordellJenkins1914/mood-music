import React, { Component } from 'react';
import SpotifyLogin from 'react-spotify-login';
import { clientId, redirectUri } from '../../Settings';




class Login extends Component{
    
    render() {
        const onSuccess = (response) => {
            const { access_token: token } = response;
            console.log("[onSuccess]" + token);
            window.localStorage.setItem('token', token);
            window.location.reload(true);
        };
    
            const onFailure = response => console.error("[onFailure]" + response);
    
            return (
               
                <SpotifyLogin clientId={clientId}
                    redirectUri={redirectUri}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    scope="user-read-private, user-library-read, playlist-read-private, playlist-modify-public, playlist-modify-private, user-library-modify,streaming
                    ,user-read-playback-state,user-modify-playback-state"
                />
        );
    }
}
export default Login;
