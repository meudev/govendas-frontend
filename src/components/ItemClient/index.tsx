import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export interface ClientItem {
    cpf: string;
    dataNascimento: string;
    id: number;
    nome: string;
}

interface ItemClientProsp {
    client: ClientItem;
}

const ItemClient: React.FC<ItemClientProsp> = ({ client }) => {
    return (
        <Link to={`/clientView/${client.id}`}>
            <div className="clientItem">
                <div className="clientName">
                    <strong>{client.nome}</strong>
                </div>
                <div className="clientData">
                    <p className="cpf"><strong>CPF: </strong>{client.cpf}</p>
                    <p className="date"><strong>Datas Nasc.: </strong>{client.dataNascimento}</p>
                </div>
            </div>
        </Link>
    )
};

export default ItemClient;