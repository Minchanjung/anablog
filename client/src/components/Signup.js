import React from "react"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:1234/api/user/sign-up", {
            username, 
            password, 
            confirmPassword, 
        }).then((result) => {
            console.log(result);
            navigate("/log-in");
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="container border my-5 p-5 d-flex flex-column justify-content-center align-items-center">
            <div className="row">
                <h3 className="col">Sign Up</h3>
            </div>
            <div className="row">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input className="form-control" name="username" type="text" onChange={(e) => {setUsername(e.target.value)}} required></input>
                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="password">Password:</label>
                        <input className="form-control" name="password" type="text" onChange={(e) => {setPassword(e.target.value)}} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirm Password:</label>
                        <input className="form-control" name="passwordConfirm" type="text" onChange={(e) => {setConfirmPassword(e.target.value)}} required></input>
                    </div>
                    <button className="btn btn-dark my-4" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;