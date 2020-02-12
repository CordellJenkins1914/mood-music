import axios from 'axios';

const addTracksToPlaylist = (client_token, playlistId, trackUris, userId) => {
    let data = {
        uris: trackUris
    }

    
    return axios({
        method: 'post',
        url: `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks?`,
        data: data,
        headers: {
            'Authorization': 'Bearer ' + client_token,
            'Content-Type': 'application/json'
        }
    })
}

export default addTracksToPlaylist;

