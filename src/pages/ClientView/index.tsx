import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import './styles.css';

interface ClientViewProps {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
}

const ClientView: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<{ id: string; }>();
    const [client, setClient] = useState<ClientViewProps>();

    useEffect(() => {
        api.get('clientFindById', {
            params: {
                id,
            }
        }).then(response => {

            setClient(response.data.data);
        })
    }, [id]);

    function clientDelete(e: FormEvent) {
        e.preventDefault();

        api.delete('clientDelete', {
            params: {
                id,
            }
        }).then(() => {
            alert('Cliente deletado com sucesso!');
            history.push('/client');
        }).catch(() => {
            alert('Erro ao deletar!');
            console.log(e);
        })
    }

    return (
        <div id="content">
            <Logo />
            <div className="page">
                <PageHeader
                    title="CLIENTE"
                    urlBack="/client"
                />
                <div className="clientNewItem">
                    <div className="clientNewName">
                        <strong>{client?.nome}</strong>
                        <p className="cpfNew"><strong>CPF: </strong>{client?.cpf}</p>
                        <p className="dateNew"><strong>Datas Nasc.: </strong>{client?.dataNascimento}</p>
                    </div>
                </div>
                <div className="clientNewButtons">
                    <Link to={`/clientEdit/${client?.id}`} className="edit">
                        <p>Editar</p>
                    </Link>
                    <button onClick={clientDelete} className="delete">
                        <p>Excluir</p>
                    </button>
                    <Link to="/orderNew" className="new">
                        <p>Novo Pedido</p>
                    </Link>
                </div>

            </div>
        </div>
    )
};

export default ClientView;