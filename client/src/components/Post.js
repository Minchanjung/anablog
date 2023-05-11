import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HtmlReactParser from "html-react-parser"
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
            setComments(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className="container">
            <div className="row">
                <img className="col img-fluid" src={post.thumbnail} alt="thumbnail"></img>
            </div>
            <div className="row">
                <h2 className="col py-4">{post.title}</h2>
            </div>
            <div className="py-3 content">
                {HtmlReactParser(String(post.content))}
            </div>
            {localStorage.getItem("user") ? <CommentForm postId={post._id}/> : <div>You must sign in to write a comment</div>}
            
            {comments.map((comment) => (
                <div className="row">
                    <div className="col">
                        <Comment comment={comment.comment} username={comment.author.username} time={comment.timeStamp}/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Post;