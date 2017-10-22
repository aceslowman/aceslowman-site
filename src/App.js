import React, { Component } from 'react';
import Navigation from './Navigation';
import Home from './Home/Home';
import './App.css';

class App extends Component {
  render() {
    return (
        <div>
            <header>
                <h1>aceslowman</h1>
            </header>
            <Navigation />
            <Home />
        </div>
    )
  }
}

export default App;
