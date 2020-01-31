import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter, withRouter } from "react-router-dom"

const AppWithRouter = withRouter(App);


ReactDOM.render(
  <HashRouter>
    <AppWithRouter />
  </HashRouter>
, document.getElementById('root'));