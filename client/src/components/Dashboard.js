import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = (props) => {


    const [myPosts, setMyPosts] = useState([]);
    const navigate = useNavigate();
    let headers = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
    };

    useEffect(() => {
        axios.get("http://localhost:1234/api/posts").then((res) => {
            setMyPosts(res.data.filter((post) => post.author._id === JSON.parse(localStorage.getItem("user")).user._id))
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const publishPost = (id) => {
        try {
            axios.post(`http://localhost:1234/api/posts/${id}/publish`, {}, headers).then((res) => {
                console.log(res)
                navigate('/')
            })
        } catch (err) {
            console.log(err);
        }
    }

    const unpublishPost = (id) => {
        try {
            axios.post(`http://localhost:1234/api/posts/${id}/unpublish`, {}, headers).then((res) => {
                console.log(res)
                navigate("/")
            })
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div className="container">
            <div className="row my-5">
                {myPosts.map(post => (
                    <div className="col-sm border rounded m-2">
                        <img className="img-fluid" src={post.thumbnail} alt="thumbnail"></img>
                        <h2>{post.title}</h2>
                        {post.published ? <button className="btn btn-dark" onClick={() => {unpublishPost(post._id)}}>unpublish</button> : <button className="btn btn-dark" onClick={() => {publishPost(post._id)}}>publish</button>}
                        <button classname="btn btn-dark">Delete Post</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;