import axios from 'axios';

const getSavedTracks = (client_token) => {
    return axios.get('https://api.spotify.com/v1/me/tracks' + '?limit=50', {
        headers: {
            Authorization: 'Bearer ' + client_token,
            "Content-Type": "text/plain"
        }
    });
}
export default getSavedTracks;
