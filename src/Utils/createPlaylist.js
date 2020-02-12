import axios from 'axios';

const createPlaylist = (client_token, userId, name) => {

    return axios.post('https://api.spotify.com/v1/users/' + userId + '/playlists',
        {
            name: name,
            public: false,
            description: "Mood based playlist from MoodMusic"
        },

        {
        headers: {
            Authorization: 'Bearer ' + client_token,
            "Content-Type": "text/plain"
        },
    });
}

export default createPlaylist;
