import React, { Component } from 'react';
import getTrackAttributes from '../Utils/getTrackAttributes';
import CreatePlaylist from './CreatePlaylist';


class Mood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackInfo: [],
            mood: 'excited',
            moodArray: [],
            moodArrayReady: false,
            userId: ""
        };

        this.findMood.bind(this);
    }

    componentDidMount() {
        let trackData = {};
        let mood = "";
        
        this.props.tracks.map(track => getTrackAttributes(this.props.token, track)
            .then(({ data }) => {
                trackData = { ...data, ...track, mood };
                this.setState({ trackInfo: [...this.state.trackInfo, trackData] });
                if (this.state.trackInfo[49] !== undefined) {
                    console.log(this.state.trackInfo);
                }       
            })
        );
    }

    findMood = () => {
        let happy = 0;
        let sad = 0;
        let angry = 0;
        let excited = 0;
        let counter = 0;
        let trackData = this.state.moodArray.slice();
        let moodCounter = 0;
        
        this.state.trackInfo.map(track => {

            if (track.danceability >= .5) {
                happy = happy + 1;
                excited = excited + 1;
            }
            if (track.danceability < .5) {
                angry= angry + 1;
                sad = sad + 1;
            }
            if (track.danceability >= .8) {
                excited = excited + 3;
            }
            if (track.danceability < .2) {
                sad = sad + 3;
            }
            if (track.energy >= .5) {
                excited = excited + 1;
                angry = angry + 1;
            }
            if (track.energy < .5) {
                happy = happy + 1;
                sad = sad + 1;
            }
            if (track.valence >= .5) {
                happy = happy + 2;
                excited = excited + 2;
            }
            if (track.valence < .5) {
                sad = sad + 2;
                angry = angry + 2;
            }
            if (track.loudness >= -7.5) {
                angry = angry + 2;
                excited = excited + 2;
            }
            if (track.loudness < -7.5) {
                happy = happy + 2;
                sad = sad + 2;
            }
            if (track.loudness >= -10.0) {
                angry = angry + 1;
                excited = excited + 1;
            }
            if (track.loudness < -5.0) {
                happy = happy + 2;
                sad = sad + 2;
            }
            if (track.tempo >= 130) {
                excited = excited + 1;
                angry = angry + 1;
            }
            if (track.tempo < 60) {
                sad = sad + 2;
            }

            if (track.tempo >= 110) {
                happy = happy + 1;
                excited = excited + 1;
                angry = angry + 1;
            }
            if (track.tempo < 110) {
                sad = sad + 1;
            }

            if (track.mode === 1) {
                happy = happy + 1;
                excited = excited + 1;

            }


            if (track.mode === 0) {
                sad = sad+ 1;
                angry = angry + 1;
            }

            if (track.valence >= .80) {
                sad = sad - 1;
                angry = angry - 1;
            }
            if (track.valence <= .30) {
                happy = happy - 1;
                excited = excited - 1;
            }
            console.log(track.name);
            console.log('happy = ' + happy);
            console.log('sad = ' + sad);
            console.log('anger = ' + angry);
            console.log('excite = ' + excited);
            

            let maxVal = Math.max(angry, happy, sad, excited);
            if (angry === maxVal) {
                track.mood = 'angry';
            }
            else if(happy === maxVal){
                track.mood = 'happy';
            }
            else if(sad === maxVal){
                track.mood = 'sad';
            }
            else if(excited === maxVal){
                track.mood = 'excited';
            }
            if (maxVal === happy && happy === excited) {
                track.mood = 'excited';
            }
            if (maxVal === sad && sad === angry) {
                track.mood = 'angry';
            }
            if (maxVal === happy && happy === sad) {
                track.mood = 'sad';
            }
            if (maxVal === angry && excited === angry && happy > sad) {
                track.mood = 'excited';
            }
            if (maxVal === excited && excited === angry && happy < sad) {
                track.mood = 'anger';
            }
            console.log('mood = ' + track.mood);
            if (track.mood === this.state.mood) {
                console.log("Into mood array");
                trackData[moodCounter] = this.state.trackInfo[counter].uri;
                this.setState({ moodArray: trackData })
                moodCounter = moodCounter + 1;
            }
            console.log(counter);
            console.log("");
            happy = 0;
            sad = 0;
            angry = 0;
            excited = 0;
            counter = counter + 1;
            
        });
        this.setState({ moodArrayReady: true });
    }
    
    render() {
        
        if (this.state.trackInfo === undefined) {
            return <div> no work </div>
        }
        if (!this.state.moodArrayReady) {
            return (

                <div>
                    <button text="Press" onClick={this.findMood}></button>
                    
                </div>
            );
        }
        else {
            return (

                <div>
                    <p>Song moods found</p>
                    <CreatePlaylist token={this.props.token} mood={this.state.mood} songList={this.state.moodArray} user={this.props.user} /> 
                </div>
            );
        }
    }
}

export default Mood;