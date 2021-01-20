import React, { Component } from "react";
import Links from './Links';
import { BrowserRouter } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import "./App.css";

import Modal from 'react-modal';

  Modal.setAppElement('#root')
class App extends Component {
        
  render() {
    return (
       <div>
         <ReactNotifications />
        <BrowserRouter>
          <Links/>
        </BrowserRouter>
       </div>
    );
  }
}
export default App;
 