import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = (props) => {

    const [published, setPublished] = useState([])

    useEffect(() => {
        axios.get("http://localhost:1234/api/posts").then((res) => {
            setPublished(res.data.filter((post) => post.published === true))
        }).catch((err) => {
            console.log(err);
        })
    }, [])



    return (
        <div>
            {published.map((post) => (
                <div>
                    <Link to={`/post/${post._id}`}>
                        <img src={post.thumbnail} alt="this is post thumbnail"></img>
                        <h1>{post.title}</h1>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Home;