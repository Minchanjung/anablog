import React from "react";
import { DateTime } from "luxon"

const Comment = (props) => {

    const comment = props.comment;
    const user = props.username;
    const time = props.time

    return (
        <div className="container w-50">
            <div className="row">
                <h5 className="col">{user}</h5>
            </div>
            <div className="row">
                <div className="col">{DateTime.fromISO(time.toLocaleString()).toFormat("LLL dd yyyy")}</div>
            </div>
            <div className="row">
                <div className="col">{comment}</div>
            </div>
            <div className="border my-5"></div>
        </div>
    )
}

export default Comment;