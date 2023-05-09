import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


const CommentForm = (props) => {


    const [content, setContent] = useState("");
    const userId = JSON.parse(localStorage.getItem("user")).user._id;

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:1234/api/posts/${props.postId}/comments`, {
            content, 
            author: userId, 
            postId: props.postId
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="content">Write Youre Comment here </label>
                <input name="content" type="text" onChange={(e) => {setContent(e.target.value)}} required></input>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default CommentForm;