import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = (props) => {

    const navigate = useNavigate();

    const logOut = () => {
        console.log("clicked")
        localStorage.removeItem("user");
        props.setUser(undefined);
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="align-items-center">
                <h1 className="navbar-brand mx-4">Anablog</h1>
            </div>
            {/*<ul className="navbar-nav">
                
            </ul>*/}
            <button className="navbar-toggler mx-4" type="button" data-toggle="collapse" data-target="#navBarCollapse" aria-controls="navbarNav" aria-expanded="false" aria-label="navbar toggle">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mx-4 justify-content-end" id="navBarCollapse">
                {localStorage.getItem("user") ? (
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create-post">Create New Post</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={logOut}>Sign Out</div>
                        </li>
                    </ul>
                    
                ) : (
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>    
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/log-in">Log In</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/sign-up">Sign Up</NavLink>
                        </li>
                    </ul>
                )}
            </div>
            
            
        </nav>
    )
}

export default Header;