import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import 'styles/styles.scss';
import { baseAPI } from '@api/baseAPI';

baseAPI.getBuildInfo().then(x => console.log('backend build info', x));

ReactDOM.render(<App/>, document.getElementById('root'));
