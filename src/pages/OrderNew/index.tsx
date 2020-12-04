/* eslint-disable react-hooks/rules-of-hooks */
import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';

import iconLupa from '../../assets/images/icons/icone-lupa.png';
import iconDelete from '../../assets/images/icons/icone-remover.png';

import './styles.css';

interface ClientViewProps {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
}

function OrderNew() {
    const { id } = useParams<{ id: string; }>();
    const [parametroBusca, setParametroBusca] = useState('');
    const [cliente, setCliente] = useState<ClientViewProps>();

    if (id !== undefined) {

        console.log(id)

        useEffect(() => {
            api.get('clientFindById', {
                params: {
                    id,
                }
            }).then(response => {

                setCliente(response.data.data);

            })["catch"](function (error) {
                alert('Nenhum cliente encontrado!');
            })
        }, [id]);
    
    }

    async function searchClient(e: FormEvent) {
        e.preventDefault();

        await api.get('clientFindByCpf', {
            params: {
                cpf: parametroBusca,
            }
        }).then(function (response) {
            setCliente(response.data.data);
        })["catch"](function (error) {
            alert('Nenhum cliente encontrado!');
        });

    }

    return (
        <div id="content">
            <Logo />
            <div className="page">
                <PageHeader
                    title="NOVO PEDIDO"
                    urlBack="/order"
                />
                <div className="headerClient">
                    {cliente === undefined ? (

                        <form id="search-item" onSubmit={searchClient} >
                            <div className="search-input">
                                <input
                                    type="text"
                                    id="search"
                                    value={parametroBusca}
                                    onChange={(e) => { setParametroBusca(e.target.value) }}
                                    placeholder="Buscar cliente por CPF"
                                />
                                <button type="submit" className="search-button">
                                    <img src={iconLupa} alt="" />
                                </button>
                            </div>
                        </form>

                    ) : (
                            <div className="clientNewOrder">
                                <div className="clientNewName">
                                    <strong>{cliente?.nome}</strong>
                                </div>
                                <div className="clientNewData">
                                    <p className="cpfNew"><strong>CPF: </strong>{cliente?.cpf}</p>
                                    <p className="dateNew"><strong>Datas Nasc.: </strong>{cliente?.dataNascimento}</p>
                                </div>
                                <div className="clientDeletButton">
                                    <img src={iconDelete} alt="Remover Cliente" />
                                </div>
                            </div>

                        )}
                </div>
                <main>
                    {/*produtos.map((produto: ProductItem) => {
                        return <ItemProductOrderView key={produto.id} product={produto} />
                    })*/}
                </main>
                <div className="formButtonOrder">
                    <Link to="/orderNewProduct" className="newProduct">
                        <p>Adicionar Produto</p>
                    </Link>
                    <Link to="/order" className="saveOrder">
                        <p>Finalizar</p>
                    </Link>
                    <Link to="/order" className="cancelOrder">
                        <p>Cancelar</p>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default OrderNew;