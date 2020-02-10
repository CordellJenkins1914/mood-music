import axios from 'axios'


export default getUserInfo = function(client_token) {
    return axios.get({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            Authorization: client_token
        },
        json: true
    })
}

export default getSavedTracks = function(client_token){
    return axios.get('https://api.spotify.com/v1/me/tracks' + '?limit=5', {
        headers: {
            Authorization: 'Bearer ' + client_token,
            "Content-Type": "text/plain"
        }
    })
}


export default getTrackAttributes = function(client_token, idArray){
    return axios.get('https://api.spotify.com/v1/audio-features/' + idArray, {
        headers: {
            Authorization: 'Bearer ' + client_token,
            "Content-Type": "text/plain"
        }
    })
}