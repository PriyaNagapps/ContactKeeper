import './App.css';
import React, { Fragment } from 'react';
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute'

const App =() => {
  return ( 
    <AuthState>
    <ContactState>
      <AlertState>
        <BrowserRouter>
          <Fragment>
            <Navbar/>
            <div className="container">
              <Alerts/>
              <Routes>
                <Route path="/" element={<PrivateRoute component = {Home} />}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
              </Routes>
            </div>
          </Fragment>
        </BrowserRouter>
      </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
