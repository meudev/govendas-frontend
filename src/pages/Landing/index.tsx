import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../components/Logo';

import iconClient from '../../assets/images/icons/icone-cliente.png';
import iconProduct from '../../assets/images/icons/icone-produto.png';
import iconOrder from '../../assets/images/icons/icone-pedido.png';

import './styles.css';

function Landing() {
    return (
        <div id="content" className="content-header">
            <Logo/>
            <div className="page">
                <div className="body">
                    <div className="buttons-container">
                        <Link to="/client" className="button-menu">
                            <img src={iconClient} alt="Clientes" />
                            <p>Cliente</p>
                        </Link>

                        <Link to="/product" className="button-menu">
                            <img src={iconProduct} alt="Produtos" />
                            <p>Produto</p>
                        </Link>

                        <Link to="/order" className="button-menu">
                            <img src={iconOrder} alt="Pedidos" />
                            <p>Pedido</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;