import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import './styles.css';

function ClientNew() {
    const history = useHistory();

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setdataNascimento] = useState('');

    function newClient(e: FormEvent) {
        e.preventDefault();

        api.post('clientSave', {
            nome,
            cpf,
            dataNascimento
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/client');
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
                    title="NOVO CLIENTE"
                    urlBack="/client"
                />
                <form onSubmit={newClient}>
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
                        <Link to="/client" className="cancel">
                            <p>Cancelar</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ClientNew;