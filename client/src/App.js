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

function App() {

  const [user, setUser] = useState(undefined);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log(user);
    axios.get("http://localhost:1234/api/posts").then((res) => {
        console.log(res)
        setPosts(res)
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Header setUser={setUser} />
        <Routes>
          <Route exact path="/" element={<Home posts={posts} user={user}/>}></Route>
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
