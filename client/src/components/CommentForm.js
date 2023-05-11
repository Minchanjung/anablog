import React from "react";
import { useState } from "react";
import axios from "axios";


const CommentForm = (props) => {


    const [content, setContent] = useState("");
    const userId = JSON.parse(localStorage.getItem("user")).user._id;

    const submitHandler = (e) => {
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
        <div className="container w-50 border border-dark my-5 p-5">
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="content">Write Youre Comment here </label>
                    <textarea className="form-control my-2" row="1" name="content" onChange={(e) => {setContent(e.target.value)}} required></textarea>
                </div>
                <button className="btn btn-dark" type="submit">Post</button>
            </form>
        </div>
    )
}

export default CommentForm;