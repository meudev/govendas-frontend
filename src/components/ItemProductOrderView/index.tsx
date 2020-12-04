import React from 'react';

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

const ItemProductOrderView: React.FC<ItemProductProsp> = ({ product }) => {

    const valorReais = product.preco / 100;

    return (
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
    )
};

export default ItemProductOrderView;