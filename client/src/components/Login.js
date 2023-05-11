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
        <div className="container border my-5 d-flex flex-column justify-content-center align-items-center p-5">
            <div className="row">
                <h3 className="col">Login</h3>
            </div>
            <div className="row">
                <form className="col" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" name="username" type="text" onChange={(e) => {setUsername(e.target.value)}} required></input>
                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" name="password" type="text" onChange={(e) => {setPassword(e.target.value)}} required></input>
                    </div>
                    
                    <button className="btn btn-dark" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;;