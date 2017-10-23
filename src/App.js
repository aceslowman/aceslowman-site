import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Notebook from './components/Notebook';
import './App.css';

import { Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div>
            <div className="top">
                <header>
                    <Link to="/"><h1>aceslowman</h1></Link>
                </header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/projects">Projects</Link>
                        </li>
                        <li>
                            <Link to="/notebook">Notebook</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="content">
                <Route path="/" component={Home} exact="true"/>
                <Route path="/about" component={About}/>
                <Route path="/projects" component={Projects}/>
                <Route path="/notebook" component={Notebook}/>
            </div>
        </div>
    )
  }
}

export default App;
