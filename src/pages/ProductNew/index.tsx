import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import './styles.css';

function ProductNew() {
    const history = useHistory();

    const [sku, setSku] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');

    function newProduct(e: FormEvent) {
        e.preventDefault();

        api.post('productSave', {
            sku,
            nome,
            descricao,
            preco: preco.replace(',','').replace('.',''),
            quantidade
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/product');
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
                    title="NOVO PRODUTO"
                    urlBack="/product"
                />
                <form onSubmit={newProduct}>
                    <Input
                        label="Sku"
                        name="sku"
                        value={sku}
                        onChange={(e) => { setSku(e.target.value) }}
                    />
                    <Input
                        label="Nome"
                        name="nome"
                        value={nome}
                        onChange={(e) => { setNome(e.target.value) }}
                    />
                    <Input
                        label="Descrição"
                        name="descricao"
                        value={descricao}
                        onChange={(e) => { setDescricao(e.target.value) }}
                    />
                    <Input
                        label="Preço"
                        name="preco"
                        value={preco}
                        onChange={(e) => { setPreco(e.target.value) }}
                    />
                    <Input
                        label="Quantidade"
                        name="quantidade"
                        value={quantidade}
                        onChange={(e) => { setQuantidade(e.target.value) }}
                    />
                    <div className="form-button">
                        <button className="save" type="submit">
                            <p>Salvar</p>
                        </button>
                        <Link to="/product" className="cancel">
                            <p>Cancelar</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ProductNew;