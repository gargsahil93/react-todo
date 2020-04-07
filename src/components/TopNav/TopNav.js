import React from 'react';
import { Link } from "react-router-dom";

import './topNav.css';

function TopNav () {
    return (
        <div className="top-nav" style={topNavStyle}>
            <h2 className="header">ToDos</h2>
            <div className="right-options">
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/about" style={linkStyle}>About</Link>
            </div>
        </div>
    );
}

const topNavStyle = {
    display: 'flex',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
};
const linkStyle = {
    padding: '5px',
    cursor: 'pointer',
    color: 'white'
};

export default TopNav;