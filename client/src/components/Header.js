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
        <div>
            <div className="leftSideContainer">
                <h1 className="logo">Anablog</h1>
                <ul>
                    <NavLink to="/">Home</NavLink>
                </ul>
            </div>
            {localStorage.getItem("user") ? (
                <div className="rightSideContainer">
                    <div>Profile Picture</div>
                    <div className="dropdown">
                        <NavLink to="/create-post">Create New Post</NavLink>
                        <div>Dashboard</div>
                        <div onClick={logOut}>Sign Out</div>
                    </div>
                </div>
            ) : (
                <div className="rightSideContainer">
                    <div className="logInButton">
                        <NavLink to="/log-in">Log In</NavLink>
                    </div>
                    <div className="SignUpButton">
                        <NavLink to="/sign-up">Sign Up</NavLink>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header;