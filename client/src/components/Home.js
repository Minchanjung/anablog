import React from "react";
import { useState, useEffect } from "react";

const Home = (props) => {

    const [published, setPublished] = useState([])

    useEffect(() => {
        
        //setPublished(() => {props.posts.filter((post) => post.publish)});
    }, [])



    return (
        <div>
            <h1>this is the home page</h1>
            <h1>{props.user}</h1>
        </div>
    )
}

export default Home;