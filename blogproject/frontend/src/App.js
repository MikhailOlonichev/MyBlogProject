import './App.css';
import React from 'react';

import Login from "./pages/Login";
import Nav from "./components/Nav";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <main className="form-signin w-100 m-auto">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

