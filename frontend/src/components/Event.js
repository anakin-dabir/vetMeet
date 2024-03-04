import React from "react";
import user from "../img/even.jpg";
import "../css/eventprofile.css";
import { Button } from "antd";
import MessageIcon from "@mui/icons-material/Message";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Divider } from "antd";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import LeftBar from "./LeftBar/LeftBar";
import LeftbarCommunity from "./LeftBar/LeftBarCommunity";
import { useGetEventQuery, useIncreaseStarsMutation } from "../services/nodeAPI";

const Event = () => {
  const [increaseStars] = useIncreaseStarsMutation();

  const eID = localStorage.getItem("eventID");

  const { data, isLoading, isError } = useGetEventQuery(eID);

  console.log(!isLoading && data);

  const handleJoin = async () => {
    const etype = localStorage.getItem("eventType");
    if (etype !== "cv") {
      const res = await increaseStars({
        stars: data.data.eventStars,
      });

      console.log(res);

      if (res.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(res.data.data));
      }
    }
  };

  return (
    <>
      {!isLoading && (
        <div className='row top-marg ml-4'>
          {localStorage.getItem("eventType") === "cv" ? (
            <div className='col-md-4'>
              <img src={user} alt='user' className='profile-image' />
              <Divider orientation='mid' plain>
                Invite People
              </Divider>
              {localStorage.getItem("userType") === "veteran" ? (
                <LeftBar />
              ) : (
                <LeftbarCommunity data={data?.data} />
              )}
            </div>
          ) : (
            <div className='col-md-4'>
              <img src={user} alt='user' className='profile-image' />
            </div>
          )}

          <div className='col-md-8'>
            <h2 className='name'>
              {data?.data.name} <AddLocationAltIcon className='icon-clr' />
              <small className='city'>{"Lahore"}</small>
            </h2>
            <small className='profession'>{data?.data.eventType}</small>
            <h5 className='mt-4'>{data?.data.eventStars} ⭐</h5>

            <div>
              <p className='lorem'>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate tenetur itaque
                similique optio soluta! Doloribus iste sed odit quod incidunt earum! Quam beatae
                eligendi dignissimos quis voluptatem impedit! Ducimus, tenetur?
              </p>
              <Button type='primary' shape='round' icon={<PersonAddIcon size='large' />}>
                <a
                  href={data?.data.eventLink}
                  disabled={localStorage.getItem("userType") == "community" ? true : false}
                  target='_blank'
                  className='follow text-white'
                  onClick={handleJoin}
                >
                  Join
                </a>
              </Button>
            </div>
            {/* <div className='d-flex mt-4'>
    <Button type="primary" shape="round" icon={<PersonAddIcon  size="large"/>}>
      <span className='follow'>Follow</span>
      </Button>
       <Button type="danger" shape="round" icon={<MessageIcon  size="large"/>} className="message">
      <span className='follow'>Message</span>
      </Button>
        </div> */}
            <Divider plain>About</Divider>
            <small className='Contact-info'>Event Information</small>
            <h6 className='mt-2 font-12'>
              Time: <span className='clr-blue'>{data?.data.eventTime}</span>
            </h6>
            <h6 className='font-12'>
              EventLink:
              <span className='clr-black'>
                <a href={data?.data.eventLink} target='_blank' rel='noopener noreferrer'></a>
                {data?.data.eventLink}
              </span>
            </h6>
            <h6 className='mt-4 font-12'>
              location: <span className='clr-email'>lahore</span>
            </h6>
          </div>
        </div>
      )}
    </>
  );
};

export default Event;
