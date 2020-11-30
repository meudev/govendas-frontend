import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import './styles.css';

function ClientView() {
    const history = useHistory();
    const idClient = useParams<{ id: string; }>();
    const [client, setClient] = useState([]);

    useEffect(() => {
        api.get('clientFindById', {
            params: {
                id: idClient.id,
            }
        }).then(response => {

            setClient(response.data.data);
        })
    }, [idClient]);

    console.log(client);

    function clientDelete(e: FormEvent) {
        e.preventDefault();

        api.delete('clientDelete', {
            params: {
                id: idClient.id,
            }
        }).then(() => {
            alert('Cadastro deletado com sucesso!');
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
                        <strong></strong>
                    </div>
                    <div className="clientNewData">
                        <p className="cpfNew"><strong>CPF: </strong></p>
                        <p className="dateNew"><strong>Datas Nasc.: </strong></p>
                    </div>
                </div>
                <div className="clientNewButtons">
                    <Link to="/clientEdit" className="edit">
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