import React, { Component } from 'react';
import { Link } from 'react-router-dom';   

class Navigation extends Component {
    render(){
        return (
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/notebook">Notebook</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Navigation;
