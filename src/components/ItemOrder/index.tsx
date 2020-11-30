import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export interface OrderItem {
    id: number;
    cliente: string;
    totalCompra: number;
    dataCompra: string;
    produtos: string;
}

interface ItemOrderProsp {
    order: OrderItem;
}

const ItemOrder: React.FC<ItemOrderProsp> = ({ order }) => {

    const valorReais = order.totalCompra / 100;

    return (
        <Link to={`/orderView/${order.id}`}>
            <div className="orderItem">
                <div className="orderName">
                    <strong>{order.cliente}</strong>
                </div>
                <div className="orderData">
                    <p className="cpf"><strong>Data: </strong>{order.dataCompra}</p>
                    <p className="data">{valorReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            </div>
        </Link>
    )
};

export default ItemOrder;