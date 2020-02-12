import axios from 'axios'


const getUserInfo = (client_token) => {

    return axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + client_token,
            "Content-Type": "text/plain"
        }
    });
}

export default getUserInfo;