import React, { FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import ButtonHeaderNew from '../../components/ButtonHeaderNew';
import ItemProduct, { ProductItem } from '../../components/ItemProduct';

import Logo from '../../components/Logo';
import iconLupa from '../../assets/images/icons/icone-lupa.png';


import './styles.css';

function Product() {

    const [produtos, setProdutos] = useState([]);

    const [parametroBusca, setparametroBusca] = useState('');

    useEffect(() => {
        api.get('productFindAll'
        ).then(response => {

            setProdutos(response.data.data);
        })
    }, []);

    async function searchProduct(e: FormEvent) {
        e.preventDefault();

        const searchType = parametroBusca === '' ? 'productFindAll' : 'productFindByName';

        await api.get(`${searchType}`, {
            params: {
                nome: parametroBusca,
            }
        }).then(function (response) {
            setProdutos(response.data.data);
        })["catch"](function (error) {
            alert('Nenhum cliente encontrado!');
            setProdutos([]);
        });

    }

    return (
        <div id="content">
            <Logo />
            <div className="page">
                <PageHeader
                    title="PRODUTO"
                    urlBack="/"
                />
                <ButtonHeaderNew
                    label="Novo Produto"
                    url="productNew"
                />
                <form id="search-item" onSubmit={searchProduct} >
                    <div className="search-input">
                        <input
                            type="text"
                            id="search"
                            value={parametroBusca}
                            onChange={(e) => { setparametroBusca(e.target.value) }}
                            placeholder="Pesquisar Produto"
                        />
                        <button type="submit" className="search-button">
                            <img src={iconLupa} alt="" />
                        </button>
                    </div>
                </form>

                <div className="hr" />

                <main>
                    {produtos.map((produto: ProductItem) => {
                        return <ItemProduct key={produto.id} product={produto} />
                    })}
                </main>
            </div>
        </div>
    )
};

export default Product;