import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import Tabs from './layout/Tabs';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Error404 from './pages/error404';
import Avatar from './pages/avatar';
import Feed from './pages/Feed';

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/avatar' element={<Avatar />} />
          <Route path='/*' element={<Error404 />} />
          <Route path='/feed' element={<Feed />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
