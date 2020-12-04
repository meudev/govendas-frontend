import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProsp extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    value: string;
    type: string;
}

const Input: React.FC<InputProsp> = ({ name, label, type, ...rest }) => {

    return (
        <div className="input">
            <p>{label}</p>
            <input type={type} id={name} {...rest} />
        </div>
    )


};

export default Input;