import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import './styles.css';

function ProductEdit() {
    const history = useHistory();

    const { id } = useParams<{ id: string; }>();
    const [sku, setSku] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');

    useEffect(() => {
        api.get('productFindById', {
            params: {
                id,
            }
        }).then(response => {
            setNome(response.data.data.nome);
            setSku(response.data.data.sku);
            setDescricao(response.data.data.descricao);
            setPreco(response.data.data.preco);
            setQuantidade(response.data.data.quantidade);
        });
    }, [id]);

    function update(e: FormEvent) {
        e.preventDefault();

        api.patch('productUpdate', {
            id,
            sku,
            nome,
            descricao,
            preco: preco.replace(',','').replace('.',''),
            quantidade
        }).then(() => {
            alert('Produto atualizado com sucesso!');
            history.push(`/productView/${id}`);
        }).catch(() => {
            alert('Erro ao atualizar!');
            console.log(e);
        });
    }

    return (
        <div id="content">
            <Logo />
            <div className="page">
                <PageHeader
                    title="EDITAR PRODUTO"
                    urlBack={`/productView/${id}`}
                />
                <form onSubmit={update}>
                    <Input
                        type="text"
                        label="Sku"
                        name="sku"
                        value={sku}
                        onChange={(e) => { setSku(e.target.value) }}
                    />
                    <Input
                        type="text"
                        label="Nome"
                        name="nome"
                        value={nome}
                        onChange={(e) => { setNome(e.target.value) }}
                    />
                    <Input
                        type="text"
                        label="Descrição"
                        name="descricao"
                        value={descricao}
                        onChange={(e) => { setDescricao(e.target.value) }}
                    />
                    <Input
                        type="text"
                        label="Preço"
                        name="preco"
                        value={preco}
                        onChange={(e) => { setPreco(e.target.value) }}
                    />
                    <Input
                        type="text"
                        label="Quantidade"
                        name="quantidade"
                        value={quantidade}
                        onChange={(e) => { setQuantidade(e.target.value) }}
                    />
                    <div className="form-button">
                        <button className="save" type="submit">
                            <p>Salvar</p>
                        </button>
                        <Link to={`/productView/${id}`} className="cancel">
                            <p>Cancelar</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ProductEdit;