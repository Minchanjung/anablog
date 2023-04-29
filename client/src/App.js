import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/post" element={<Home />}></Route>
          <Route exact path="/post/:id" element={<Post/>}/>
          <Route exact path="/user/sign-up" element={<Signup/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
