import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Welcome} />
        </Switch>
    </BrowserRouter>
);

export default Routes;