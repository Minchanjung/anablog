import React from "react";
import { useState, useEffect } from "react";
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
            navigate("/dashboard")
        }).catch((err) => {
            console.log(err)
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
        <div className="container">
            <div className="row my-5">
                <form className="col" onSubmit={formHandler}>
                    <div classname="form-group">
                        <label htmlFor="title">Title</label>
                        <input className="form-control" name="title" type="text" onChange={(e) => setTitle(e.target.value)} required/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="thumbnail">Thumbnail</label>
                        <input className="form-control" name="thumbnail" type="text" onChange={(e) => setThumbnail(e.target.value)} placeholder="Must be a Url ie. http://image.com"/>
                    </div>
                    <div className="form-group">
                        <Editor 
                            apiKey={process.env.REACT_APP_TINYMCE_APIKEY}
                            init={{
                                height: 400,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image",
                                    "charmap print preview anchor help",
                                    "searchreplace visualblocks code",
                                    "insertdatetime media table paste wordcount",
                                ],
                                toolbar:
                                    // prettier-ignore
                                    "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
                            }}
                            value={textArea}
                            onEditorChange={(content, editor) => {
                                setTextArea(content)
                                }}
                            initialValue="Write the body of youre blog here"
                        />
                    </div>
                    
                    <button className="btn btn-dark my-3" type="submit">Save Draft</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;