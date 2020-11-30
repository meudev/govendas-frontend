import React from 'react';
import { Link } from 'react-router-dom';

import iconNewBlank from '../../assets/images/icons/icone-adicionar.png';

import './styles.css';

interface ButtonHeaderNewProsp {
    label: string;
    url: string;
}

const ButtonHeaderNew: React.FC<ButtonHeaderNewProsp> = (prosp) => {
    return (
        <Link to={prosp.url}>
            <div className="buttonNew">
                <img src={iconNewBlank} alt="{prosp.label}" />
                <p>{prosp.label}</p>
            </div>
        </Link>
    )
};

export default ButtonHeaderNew;