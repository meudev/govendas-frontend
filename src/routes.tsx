import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Client from './pages/Client';
import ClientNew from './pages/ClientNew';
import ClientView from './pages/ClientView';
import ClientEdit from './pages/ClientEdit';
import Product from './pages/Product';
import ProductNew from './pages/ProductNew';
import ProductView from './pages/ProductView';
import ProductEdit from './pages/ProductEdit';
import Order from './pages/Order';
import OrderNew from './pages/OrderNew';
import OrderNewProduct from './pages/OrderNewProduct';
import OrderView from './pages/OrderView';
import OrderEdit from './pages/OrderEdit';

function Routes() {
    return (
        <BrowserRouter>                
            <Route path="/" exact component={Landing}/>
            <Route path="/client" exact component={Client}/>
            <Route path="/clientNew" exact component={ClientNew}/>
            <Route path="/clientView/:id" component={ClientView}/>
            <Route path="/clientEdit/:id" component={ClientEdit}/>
            <Route path="/product" exact component={Product}/>
            <Route path="/productNew" exact component={ProductNew}/>
            <Route path="/productView/:id" component={ProductView}/>
            <Route path="/productEdit/:id" component={ProductEdit}/>
            <Route path="/order" exact component={Order}/>
            <Route path="/orderNew/:id" exact component={OrderNew}/>
            <Route path="/orderNew/p/:id" exact component={OrderNew}/>
            <Route path="/orderNewProduct" exact component={OrderNewProduct}/>
            <Route path="/orderView/:id" component={OrderView}/>
            <Route path="/orderEdit/:id" component={OrderEdit}/>
        </BrowserRouter>
    )
}

export default Routes;