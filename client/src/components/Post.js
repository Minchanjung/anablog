import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const Post = (props) => {

    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        fetchData();
        fetchComments();
    }, [])

    const fetchData = () => {
        axios.get(`http://localhost:1234/api/posts/${id}`).then((res) => {
            setPost(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const fetchComments = () => {
        axios.get(`http://localhost:1234/api/posts/${id}/comments`).then((res) => {
            console.log(res)
            setComments(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }


    console.log(comments)

    return (
        <div>
            <div>thumbnail image</div>
            <h1>{post.title}</h1>
            <div>this is where body of post will go</div>
            {localStorage.getItem("user") ? <CommentForm postId={post._id}/> : <div>You must sign in to write a comment</div>}
            
            {comments.length && comments.map((comment) => (
                <Comment comment={comment.comment} username={comment.author.username} time={comment.timeStamp}/>
            ))}
        </div>
    )
}

export default Post;