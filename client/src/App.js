import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Home from './components/Home';
import Post from './components/Post';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import CreatePost from './components/CreatePost';
import Dashboard from './components/Dashboard';

function App(props) {

  const [user, setUser] = useState(undefined);

  return (
    <div className="App">
      <Router>
        <Header setUser={setUser} user={user}/>
        <Routes>
          <Route exact path="/" element={<Home user={user}/>}></Route>
          <Route exact path="/post/:id" element={<Post/>}/>
          <Route exact path="/sign-up" element={<Signup/>}/>
          <Route exact path="/log-in" element={<Login setUser={setUser}/>}/>
          <Route exact path="/create-post" element={<CreatePost user={user}/>}/>
          <Route exact path="/dashboard" element={<Dashboard />}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
