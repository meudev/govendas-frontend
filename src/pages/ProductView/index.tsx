import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import './styles.css';

function ProductView() {
    const history = useHistory();
    const idProduct = useParams<{ id: string; }>();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        api.get('productFindById', {
            params: {
                id: idProduct.id,
            }
        }).then(response => {

            setProduct(response.data.data);
        })
    }, [idProduct]);

    function productDelete(e: FormEvent) {
        e.preventDefault();

        api.delete('productDelete', {
            params: {
                id: idProduct.id,
            }
        }).then(() => {
            alert('Cadastro deletado com sucesso!');
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
                    title="PRODUTO"
                    urlBack="/product"
                />
                <div className="productNewItem">
                    <div className="productNewName">
                        <strong></strong>
                    </div>
                    <div className="productNewData">
                        <p className="skuNew"><strong>SKU: </strong></p>
                        <p className="skuNew"><strong>Descrição: </strong></p>
                        <p className="skuNew"><strong>Preço: </strong></p>
                        <p className="skuNew"><strong>Quantidade: </strong></p>
                    </div>
                </div>
                <div className="productNewButtons">
                    <Link to="/productEdit" className="edit">
                        <p>Editar</p>
                    </Link>
                    <button onClick={productDelete} className="delete">
                        <p>Excluir</p>
                    </button>
                </div>

            </div>
        </div>
    )
};

export default ProductView;