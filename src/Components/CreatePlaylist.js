import React, { Component } from 'react';
import createPlaylist from '../Utils/createPlaylist';
import addTracksToPlaylist from '../Utils/addTracksToPlaylist';

class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistId: [],
            playlistURI: ""
        };
    }
    componentDidMount() {
        createPlaylist(this.props.token, this.props.user, this.props.mood).then(({ data }) => {
            this.setState({ playlistId: data.id });
            this.setState({ playlistURI: data.uri });
            addTracksToPlaylist(this.props.token, this.state.playlistId, this.props.songList, this.props.user);
        });;
        
    }



    render() {

        // size may also be a plain string using the presets 'large' or 'compact'
        const size = {
            width: '100%',
            height: 300,
        };
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'
        
        return (

            <div>
                <p>Playlist Created and tracks added</p>
                
            </div>
        );
    }
}
export default CreatePlaylist;
