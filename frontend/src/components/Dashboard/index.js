import React from "react";
import "./dashboard.css";
import { useEffect } from "react";
// import CanvasJSReact from './../assets/canvasjs.react';
// const CanvasJSChart = CanvasJSReact.CanvasJSChart;
import Post from "../Posts/post";
import Share from "../share/share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useGetFollowedPostsQuery } from "../../services/nodeAPI";
import LeftBarEvents from "../LeftBarEvents/LeftBarEvents"
import { PageHeader } from '../PageHeader';


const Dashboard=() => {
 
  const { data, isLoading, isError }= useGetFollowedPostsQuery();


  console.log( !isLoading&&data )

  return (
    <>
      <div className=" px-3 pe-4 pt-3">
        <div className="feed row">
          <div className="feedWrapper col-md-8">
            <Share />
            {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}

            {

              !isLoading&&data?.data.map( ( el, i ) => {
                const { firstName, lastName, post }=el;

                return <Post key={i} post={post} name={firstName+" "+lastName} />




              } )



            }


          </div>
          <div className="col-md-4" style={{position:"fixed",right:"0",width:"26%"}}>
            <h4>Upcoming Events</h4>
            <LeftBarEvents />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
