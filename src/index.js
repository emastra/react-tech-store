import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
import { CtxProvider } from './context';

ReactDOM.render(
    <CtxProvider>
        <Router>
            <App />
        </Router>
    </CtxProvider>,

    document.getElementById('root')
);

serviceWorker.unregister();
