import './App.css';
import React from 'react';
import { Header } from './components/header/header';
import { Results } from './components/results/results';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ItemProfile } from './components/itemProfile/itemProfile';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={<Navigate to='/books' />} />
        <Route path='/books' element={<Results />}></Route>
        <Route path='books/book/:bookId' element={<ItemProfile />} />
      </Routes>
    </div>
  );
}


export default App;
