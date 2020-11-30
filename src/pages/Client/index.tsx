import React, { FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import ButtonHeaderNew from '../../components/ButtonHeaderNew';
import ItemClient, { ClientItem } from '../../components/ItemClient';

import Logo from '../../components/Logo';
import iconLupa from '../../assets/images/icons/icone-lupa.png';


import './styles.css';

function Client() {

    const [clientes, setClientes] = useState([]);

    const [parametroBusca, setparametroBusca] = useState('');

    useEffect(() => {
        api.get('clientFindAll'
        ).then(response => {

            setClientes(response.data.data);
        })
    }, []);

    async function searchClient(e: FormEvent) {
        e.preventDefault();

        const searchType = parametroBusca === '' ? 'clientFindAll' : 'clientFindByName';

        await api.get(`${searchType}`, {
            params: {
                nome: parametroBusca,
            }
        }).then(function (response) {
            setClientes(response.data.data);
        })["catch"](function (error) {
            alert('Nenhum cliente encontrado!');
            setClientes([]);
        });

    }

    return (
        <div id="content">
            <Logo />
            <div className="page">
                <PageHeader
                    title="CLIENTE"
                    urlBack="/"
                />
                <ButtonHeaderNew
                    label="Novo Cliente"
                    url="clientNew"
                />
                <form id="search-item" onSubmit={searchClient} >
                    <div className="search-input">
                        <input
                            type="text"
                            id="search"
                            value={parametroBusca}
                            onChange={(e) => { setparametroBusca(e.target.value) }}
                            placeholder="Pesquisar Cliente"
                        />
                        <button type="submit" className="search-button">
                            <img src={iconLupa} alt="" />
                        </button>
                    </div>
                </form>

                <div className="hr" />

                <main>
                    {clientes.map((cliente: ClientItem) => {
                        return <ItemClient key={cliente.id} client={cliente} />
                    })}
                </main>
            </div>
        </div>
    )
};

export default Client;