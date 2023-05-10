import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {DateTime} from "luxon";

const Home = (props) => {

    const [published, setPublished] = useState([])
    const [firstPost, setFirstPost] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:1234/api/posts").then((res) => {
            setFirstPost(res.data.filter((post) => post.published === true)[0])
            setPublished(res.data.filter((post) => post.published === true).slice(1))
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div className="container">
            <div className="row mt-5">
                <h3 className="col">Anablog</h3>
            </div>
            <div className="row">
                <h1 className="col">Made For Photographers By Photographers</h1>
            </div>
            <div className="row mb-5">
                <span className="col">All things analog photography curated for you</span>
            </div>
            <div className="row">
                <div className="col border p-4 rounded">
                    <Link className="rounded" to={`/post/${firstPost._id}`} style={{textDecoration: "none", color: "black"}}>
                        <img className="img-fluid" src={firstPost.thumbnail} alt="this is post thumbnail"></img>
                        <div>{DateTime.fromISO(firstPost.timeStamp).toFormat("LLL dd yyyy")}</div>
                        <h3 className="font-weight-light">{firstPost.title}</h3> 
                    </Link>
                </div>
                
            </div>
            <div className="row">
                {published.map((post) => (
                    <div className="col-sm border rounded p-4 m-2 my-5">
                        <Link to={`/post/${post._id}`} style={{textDecoration: "none", color: "black"}}>
                            <img className="img-fluid" src={post.thumbnail} alt="this is post thumbnail"></img>
                            <div>{DateTime.fromISO(post.timeStamp.toLocaleString()).toFormat("LLL dd yyyy")}</div>
                            <h3>{post.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Home;