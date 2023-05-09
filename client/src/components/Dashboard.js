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
        <div>
            {myPosts.map(post => (
                <div>
                    <h1>{post.title}</h1>
                    {post.published ? <button onClick={() => {unpublishPost(post._id)}}>unpublish</button> : <button onClick={() => {publishPost(post._id)}}>publish</button>}
                    <div>edit post</div>
                </div>
            ))}
        </div>
    )
}

export default Dashboard;