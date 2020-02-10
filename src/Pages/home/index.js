import React, { Component } from 'react';
import getSavedTracks from '../../Utils/getSavedTracks';
import Mood from '../../Components/Mood';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackInfo: [],
            isReady: false,
            csList: "",
            dataPoints: []
        };
    }
    componentDidMount() {
        let arr = [];
        getSavedTracks(this.props.token).then(response => {
            Object.keys(response.data.items).forEach(function (key) {
                arr.push(response.data.items[key].track);
            });
            this.setState({ trackInfo: arr, isReady: true });
            this.setState({ csList: arr.join(", ") });
        });
}

    render() {
        //this.forceUpdate();
        if (this.state.trackInfo[0] === undefined) {
            return <div> no work </div>
        }
        return (
            
            <div>
                <p>Working</p>
                <Mood token={this.props.token} tracks={this.state.trackInfo} />
            </div>
        );
    }
}
export default Home;
