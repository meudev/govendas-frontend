import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import './styles.css';

interface ProductViewProps {
    id: number;
    nome: string;
    sku: string;
    descricao: string;
    preco: number;
    quantidade: number;
}

function ProductView() {
    const history = useHistory();
    const { id } = useParams<{ id: string; }>();
    const [product, setProduct] = useState<ProductViewProps>();

    useEffect(() => {
        api.get('productFindById', {
            params: {
                id: id,
            }
        }).then(response => {
            setProduct(response.data.data);
        });
    }, [id]);

    function productDelete(e: FormEvent) {
        e.preventDefault();

        api.delete('productDelete', {
            params: {
                id
            }
        }).then(() => {
            alert('Cadastro deletado com sucesso!');
            history.push('/product');
        }).catch(() => {
            alert('Erro ao deletar!');
            console.log(e);
        });
    }

    const valorReais = parseFloat(`${product?.preco}`) / 100;

    return (
        <div id="content">
            <Logo />
            <div className="page">
                <PageHeader
                    title="PRODUTO"
                    urlBack="/product"
                />
                <div className="productNewItem">
                    <div className="productNewName">
                        <strong>{product?.nome}</strong>
                    </div>
                    <div className="productNewData">
                        <p className="skuNew"><strong>SKU: </strong>{product?.sku}</p>
                        <p className="skuNew"><strong>Descrição: </strong>{product?.descricao}</p>
                        <p className="skuNew"><strong>Preço: </strong>{valorReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <p className="skuNew"><strong>Quantidade: </strong>{product?.quantidade}</p>
                    </div>
                </div>
                <div className="productNewButtons">
                    <Link to={`/productEdit/${id}`} className="edit">
                        <p>Editar</p>
                    </Link>
                    <button onClick={productDelete} className="delete">
                        <p>Excluir</p>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ProductView;