import "./post.css";
import User from "./user.png"
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useState } from "react";
import PostPic from "./background.jpg"

export default function Post( { post, name } ) {


  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              // src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              src={User}
              alt=""
            />
            <span className="postUsername">
              {name}
            </span>
            <span className="postDate">{"Few minutes ago"}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img className="postImg"
            // src={post.photo}
            src={post.file}
            alt="" />
        </div>
      </div>
    </div>
  );
}