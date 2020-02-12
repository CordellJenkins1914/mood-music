import React, { Component } from 'react';
import getSavedTracks from '../../Utils/getSavedTracks';
import getUserInfo from '../../Utils/getUserInfo';
import Mood from '../../Components/Mood';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackInfo: [],
            userId: ""
        };
    }
    componentDidMount() {
        let arr = [];
        getUserInfo(this.props.token)
            .then(({ data }) => {
                this.setState({ userId: data.id });
                console.log(this.state.userId);
            })
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
                <p>User info and user saved tracks collected</p>
                <Mood token={this.props.token} tracks={this.state.trackInfo} user={this.state.userId} />
            </div>
        );
    }
}
export default Home;
