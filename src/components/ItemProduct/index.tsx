import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export interface ProductItem {
    id: number;
    sku: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
}

interface ItemProductProsp {
    product: ProductItem;
}

const ItemProduct: React.FC<ItemProductProsp> = ({ product }) => {

    const valorReais = product.preco / 100;

    return (
        <Link to={`/productView/${product.id}`}>
            <div className="productItem">
                <div className="productName">
                    <strong>{product.nome}</strong>
                </div>
                <div className="productData">
                    <p className="sku"><strong>SKU: </strong>{product.sku}</p>
                    <p className="quantidade"><strong>Quant.: </strong>{product.quantidade}</p>
                    <p className="preco">{valorReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            </div>
        </Link>
    )
};

export default ItemProduct;