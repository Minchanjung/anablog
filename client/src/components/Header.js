import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <div>
            <div className="leftSideContainer">
                <h1 className="logo">Anablog</h1>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                </ul>
            </div>
            <div className="authButtonsContainer">
                <div className="logInButton">
                    <Link to="/user/log-in">Log In</Link>
                </div>
                <div className="SignUpButton">
                    <Link to="/user/sign-up">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;