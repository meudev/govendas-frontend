import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import './styles.css';

function OrderView() {
    const history = useHistory();
    const idOrder = useParams<{ id: string; }>();
    const [order, setOrder] = useState([]);

    useEffect(() => {
        api.get('orderFindById', {
            params: {
                id: idOrder.id,
            }
        }).then(response => {

            setOrder(response.data.data);
        })
    }, [idOrder]);

    function orderDelete(e: FormEvent) {
        e.preventDefault();

        api.delete('orderDelete', {
            params: {
                id: idOrder.id,
            }
        }).then(() => {
            alert('Pedido deletado com sucesso!');
            history.push('/product');
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
                    title="PEDIDO"
                    urlBack="/order"
                />
                <div className="orderNewItem">
                    <div className="orderNewName">
                        <strong></strong>
                    </div>
                    <div className="orderNewData">
                        <p className="skuNew"><strong>Total da Compra: </strong></p>
                        <p className="skuNew"><strong>Data da Compra: </strong></p>
                        <p className="skuNew"><strong>Produtos: </strong></p>
                    </div>
                </div>
                <div className="orderNewButtons">
                    <Link to="/orderEdit" className="edit">
                        <p>Editar</p>
                    </Link>
                    <button onClick={orderDelete} className="delete">
                        <p>Excluir</p>
                    </button>
                </div>

            </div>
        </div>
    )
};

export default OrderView;