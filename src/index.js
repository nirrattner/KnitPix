import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './js/App';
import registerServiceWorker from './registerServiceWorker';

import './css/index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
