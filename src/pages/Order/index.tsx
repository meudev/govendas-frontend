import React, { FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import ButtonHeaderNew from '../../components/ButtonHeaderNew';
import ItemOrder, { OrderItem } from '../../components/ItemOrder';

import Logo from '../../components/Logo';
import iconLupa from '../../assets/images/icons/icone-lupa.png';


import './styles.css';

function Order() {

    const [orders, setOrders] = useState([]);

    const [parametroBusca, setparametroBusca] = useState('');

    useEffect(() => {
        api.get('orderFindAll'
        ).then(response => {

            setOrders(response.data.data);
        })
    }, []);

    async function searchOrder(e: FormEvent) {
        e.preventDefault();

        const searchType = parametroBusca === '' ? 'orderFindAll' : 'orderFindByName';

        await api.get(`${searchType}`, {
            params: {
                nome: parametroBusca,
            }
        }).then(function (response) {
            setOrders(response.data.data);
        })["catch"](function (error) {
            alert('Nenhum pedido encontrado!');
            setOrders([]);
        });

    }

    return (
        <div id="content">
            <Logo />
            <div className="page">
                <PageHeader
                    title="PEDIDO"
                    urlBack="/"
                />
                <ButtonHeaderNew
                    label="Novo Pedido"
                    url="orderNew"
                />
                <form id="search-item" onSubmit={searchOrder} >
                    <div className="search-input">
                        <input
                            type="text"
                            id="search"
                            value={parametroBusca}
                            onChange={(e) => { setparametroBusca(e.target.value) }}
                            placeholder="Pesquisar Pedido"
                        />
                        <button type="submit" className="search-button">
                            <img src={iconLupa} alt="" />
                        </button>
                    </div>
                </form>

                <div className="hr" />

                <main>
                    {orders.map((order: OrderItem) => {
                        return <ItemOrder key={order.id} order={order} />
                    })}
                </main>
            </div>
        </div>
    )
};

export default Order;