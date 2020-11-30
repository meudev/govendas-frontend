import React from 'react';

import logo from '../../assets/images/logo.png';

import './styles.css';

function Logo() {
    return (
        <div className="header">
            <div className="logo-container">
                <img
                    src={logo}
                    alt="Logo govendas"
                    className="logo"
                />
            </div>
        </div>
    )
}

export default Logo;