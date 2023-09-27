import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HeaderPrueba from './layout/prueba';
import About from './pages/about';
import Login from './pages/login';
import Home from './pages/home';
import Error404 from './pages/error404';
import Avatar from './pages/avatar';

function App() {

  return (
    <>
      <HeaderPrueba />
      <main>
        <h2>LINKED LIFE</h2>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/avatar' element={<Avatar />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
