import React from 'react';
import { Link } from 'react-router-dom';

import iconback from '../../assets/images/icons/icone-back.png';

import './styles.css';

interface PageHeaderProps {
    title: string;
    urlBack: string;
}

const PageHeader: React.FC<PageHeaderProps> = (prosp) => {
    return (
        <div className="header-client">
            <Link to={prosp.urlBack} className="button-header">
                <img src={iconback} alt="Voltar" />
                <p>{prosp.title}</p>
            </Link>
        </div>
    )
};

export default PageHeader;