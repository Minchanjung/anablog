import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        console.log(username)
        e.preventDefault();
        axios.post("http://localhost:1234/api/user/log-in", {
            username, 
            password, 
        }).then((res) => {
            console.log(res)
            localStorage.setItem("user", JSON.stringify(res.data));
            props.setUser(res.data.user);
            navigate("/");
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="username">Username</label>
                <input name="username" type="text" onChange={(e) => {setUsername(e.target.value)}} required></input>
                <label htmlFor="password">Password</label>
                <input name="password" type="text" onChange={(e) => {setPassword(e.target.value)}} required></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;;