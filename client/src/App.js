import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react";
import Home from './components/Home';
import Post from './components/Post';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';

function App() {

  const [user, setUser] = useState(undefined);
  const [posts, setPosts] = useState([])

  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/post/:id" element={<Post/>}/>
          <Route exact path="/sign-up" element={<Signup/>}/>
          <Route exact path="/log-in" element={<Login setUser={setUser}/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
