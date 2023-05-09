import React from "react";

const Comment = (props) => {

    const comment = props.comment;
    const user = props.username;
    const time = props.time

    return (
        <div>
            <h1>i am in comments</h1>
            {comment}
        </div>
    )
}

export default Comment;