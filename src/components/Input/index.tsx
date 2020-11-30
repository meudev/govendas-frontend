import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProsp extends InputHTMLAttributes<HTMLInputElement>  {
    name: string;
    label: string;
    value: string;
}

const Input: React.FC<InputProsp> = ({ name, label, ...rest}) => {
    return (
                <div className="input">
                    <p>{label}</p>
                    <input type="text" id={name} {...rest} />
                </div>
    )
};

export default Input;