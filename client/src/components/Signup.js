import React from "react"
import axios from "axios";
import { useState } from "react";

const Signup = (props) => {

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
            props.history.push("/log-in");
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="username">Username:</label>
                <input name="username" type="text" onChange={(e) => {setUsername(e.target.value)}} required></input>
                <label htmlFor="password">Password:</label>
                <input name="password" type="text" onChange={(e) => {setPassword(e.target.value)}} required></input>
                <label htmlFor="passwordConfirm">Confirm Password:</label>
                <input name="passwordConfirm" type="text" onChange={(e) => {setConfirmPassword(e.target.value)}} required></input>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;