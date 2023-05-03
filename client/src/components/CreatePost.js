import React from "react";
import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = (props) => {

    const navigate = useNavigate();
    const [textArea, setTextArea] = useState("");
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    let headers = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
    };

    useEffect(() => {
        console.log(props.user)
    }, []);

    const formHandler = (e) => {
        e.preventDefault()
        console.log(headers)
        axios.post("http://localhost:1234/api/posts/create", {
            title: title, 
            content: textArea, 
            thumbnail: thumbnail, 
            author: localStorage.getItem("user").user, 
            published: false,
        }, headers).then((res) => {
            console.log(res);
            //navigate("/dashboard")
        })
    }

    const parseEditorData = (content, editor) => {
        const { targetElm } = editor;
        const { name } = targetElm;
    
        return {
            target: {
                name,
                value: content,
            },
        };
    };

    return (
        <div>
            <form onSubmit={formHandler}>
                <label htmlFor="title">Title</label>
                <input name="title" type="text" onChange={(e) => setTitle(e.target.value)} required/>
                <label htmlFor="thumbnail">Thumbnail</label>
                <input name="thumbnail" type="text" onChange={(e) => setThumbnail(e.target.value)} placeholder="Must be a Url ie. http://image.com"/>
                <Editor 
                    apiKey={process.env.REACT_APP_TINYMCE_APIKEY}
                    onEditorChange={(content, editor) => {
                        setTextArea(content)
                        }}
                    initialValue="Write the body of youre blog here"
                />
                <button type="submit">Save Draft</button>
            </form>
        </div>
    )
}

export default CreatePost;