import axios from 'axios';

const getTrackAttributes = (client_token, track) => {

    return axios.get('https://api.spotify.com/v1/audio-features/' + track.id, {
        headers: {
            Authorization: 'Bearer ' + client_token,
            "Content-Type": "text/plain"
        }
    });
}

export default getTrackAttributes;