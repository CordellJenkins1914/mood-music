import axios from 'axios';

const getPlaylist = (client_token,user) => {
    return axios.get(`https://api.spotify.com/v1/users/${user}/playlists`, {
        headers: {
            "Content-Type": "text/plain",
            Authorization: "Bearer " + client_token
        }
    })
}

export default getPlaylist;