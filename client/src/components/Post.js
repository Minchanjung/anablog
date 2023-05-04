import React from "react";
import axios from "axios";
import { useEffect, useState, useParams } from "react";

const Post = (props) => {

    const [post, setPost] = useState();
    const {id} = useParams();

    useEffect(() => {
        console.log(id)
        try {
            axios.get(`http://localhost:1234/api/posts/${id}`).then((res) => {
                setPost(res);
            })
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div>
            <div>thumbnail image</div>
            <h1>{post.title}</h1>
            <div>this is where body of post will go</div>
        </div>
    )
}

export default Post;