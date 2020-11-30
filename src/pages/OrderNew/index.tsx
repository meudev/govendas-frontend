import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import './styles.css';

function OrderNew() {
    const history = useHistory();

    const [cliente, setCliente] = useState('');
    const [totalCompra, setTotalCompra] = useState('');
    const [dataCompra, setDataCompra] = useState('');
    const [produtos, setProdutos] = useState('');

    function newOrder(e: FormEvent) {
        e.preventDefault();

        api.post('orderSave', {
            cliente,
            totalCompra: totalCompra.replace(',', '').replace('.', ''),
            dataCompra,
            produtos
        }).then(() => {
            alert('Pedido realizado com sucesso!');
            history.push('/order');
        }).catch(() => {
            alert('Erro no cadastro!');
            console.log(e);
        });
    }

    return (
        <div id="content">
            <Logo />
            <div className="page">
                <PageHeader
                    title="NOVO PEDIDO"
                    urlBack="/order"
                />
                <form onSubmit={newOrder}>
                    <Input
                        label="Cliente"
                        name="cliente"
                        value={cliente}
                        onChange={(e) => { setCliente(e.target.value) }}
                    />
                    <Input
                        label="Total Compra"
                        name="totalCompra"
                        value={totalCompra}
                        onChange={(e) => { setTotalCompra(e.target.value) }}
                    />
                    <Input
                        label="Data da Compra"
                        name="dataCompra"
                        value={dataCompra}
                        onChange={(e) => { setDataCompra(e.target.value) }}
                    />
                    <Input
                        label="Produtos"
                        name="produtos"
                        value={produtos}
                        onChange={(e) => { setProdutos(e.target.value) }}
                    />
                    <div className="form-button">
                        <button className="save" type="submit">
                            <p>Salvar</p>
                        </button>
                        <Link to="/order" className="cancel">
                            <p>Cancelar</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default OrderNew;