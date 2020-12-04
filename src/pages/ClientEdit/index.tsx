import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import api from '../../services/api';

import './styles.css';

function ClientEdit() {
    const history = useHistory();

    const { id } = useParams<{ id: string; }>();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setdataNascimento] = useState('');

    useEffect(() => {
        api.get('clientFindById', {
            params: {
                id,
            }
        }).then(response => {
            setNome(response.data.data.nome);
            setCpf(response.data.data.cpf);
            setdataNascimento(response.data.data.dataNascimento);
        });
    }, [id]);
    

    function update(e: FormEvent) {
        e.preventDefault();

        api.patch('clientUpdate', {
            id: id,
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento
        }).then(() => {
            alert('Cliente atualizado com sucesso!');
            history.push(`/clientView/${id}`);
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
                    title="EDITAR CLIENTE"
                    urlBack={`/clientView/${id}`}
                />
                <form onSubmit={update}>
                    <Input
                        type="text"
                        label="Nome Completo"
                        name="nome"
                        value={nome}
                        onChange={(e) => { setNome(e.target.value) }}
                    />
                    <Input
                        type="text"
                        label="CPF"
                        name="cpf"
                        value={cpf}
                        onChange={(e) => { setCpf(e.target.value) }}
                    />
                    <Input
                        type="text"
                        label="Data Nascimento"
                        name="dataNascimento"
                        value={dataNascimento}
                        onChange={(e) => { setdataNascimento(e.target.value) }}
                    />
                    <div className="form-button">
                        <button className="save" type="submit">
                            <p>Salvar</p>
                        </button>
                        <Link to={`/clientView/${id}`} className="cancel">
                            <p>Cancelar</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ClientEdit;