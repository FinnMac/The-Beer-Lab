// /src/App.js

// v 1.0
// Finn McCarthy

// This file contains the routes for the application

import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import useDocumentTitle from './useDocumentTitle';
import store from './store';
import Alert from './components/layouts/Alert';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

import Home from "./components/pages/Home";

import Brews from './components/brews/Brews';
import AddBrew from './components/brews/AddBrew';
import EditBrew from './components/brews/EditBrew';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import NotFound from './components/layouts/NotFound';
import Contact from './components/pages/Contact';
import MainHead from './components/layouts/MainHead';
import Profile from './components/auth/Profile';

const App = () => {

//useDocumentTitle(`AppName 🤠 | ${state.title}`);
  return (
    <Provider store={store}>

      <Router >
        <header>
          <Routes>
            <Route element={(
              <>
                <Header />
                <MainHead />
                <main role="main">
                  <div className="container-fluid">
                    <Alert/>
                    <Outlet />
                  </div>
                </main>
                <Footer />
              </>
            )} >
              <Route path="/" element={<Home/>} />
            </Route>
            <Route element={(
              <>
                <Header />
                <main role="main">
                  <div className="container-fluid">
                    <Alert />
                    <Outlet />
                  </div>
                </main>
                <Footer />
              </>
            )} >
              <Route path='/contact' element={<Contact />} />

              <Route path='/brews' element={<Brews />} />
              <Route path='/brews/add' element={<AddBrew />} />
              <Route path='/brews/edit/:id' element={<EditBrew />} />

              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />

              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </header>
      </Router>
    </Provider>
  );
}

export default App;
