import React, { Component } from 'react';
import { Login, Home } from './Pages';

import './App.css';

class App extends Component {
    render() {
        const token = window.localStorage.getItem('token');
        return (
                <div>
                {token ? <Home token={this.props.value}/> : <Login />}
                </div>
        );
    }
}
export default App;
