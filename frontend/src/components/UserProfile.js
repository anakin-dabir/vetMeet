import React from "react";
import user from "../img/user.png";
import "../css/userprofile.css";
import { Divider } from "antd";
import { Button } from "antd";
import MessageIcon from "@mui/icons-material/Message";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
const Profile = () => {
  return (
    <>
      <div className="row top-marg ml-4">
        <div className="col-md-4">
          <img src={user} alt="user" className="profile-image" />
          <Divider orientation="left" plain>
            hobbies
          </Divider>
          <ul className="list-st">
            <li>Sky Diving</li>
            <li>Swimming</li>
            <li>Cricket</li>
            <li>Football</li>
          </ul>
        </div>
        <div className="col-md-8">
          <h2 className="name">
            Numan Anees <AddLocationAltIcon className="icon-clr" />
            <small className="city">Lahore</small>
          </h2>
          <small className="profession">Software Engineer</small>
          <h5 className="mt-4">0 ⭐</h5>
          <h5>
            <SupervisedUserCircleOutlinedIcon /> 0 followers 0 following
          </h5>
          <div className="d-flex">
            <Button type="primary" shape="round" icon={<PersonAddIcon size="large" />}>
              <span className="follow">Follow</span>
            </Button>
            <Button
              type="danger"
              shape="round"
              icon={<MessageIcon size="large" />}
              className="message"
            >
              <span className="follow">Message</span>
            </Button>
          </div>
          <Divider plain>About</Divider>
          <small className="Contact-info">Contact Information</small>
          <h6 className="mt-2 font-12">
            Phone: <span className="clr-blue">+923310145083</span>
          </h6>
          <h6 className="mt-4 font-12">
            Email: <span className="clr-email">user44@gmail.com</span>
          </h6>
          <div className="mt-4"></div>
          <small className="Personal-info">Personal Information</small>
          <h6 className="mt-2 font-12">
            Birthday: <span className="clr-birthday">July 14, 2001</span>
          </h6>
          <h6 className="mt-2 font-12">
            Gender: <span className="clr-gender">Male</span>
          </h6>
        </div>
      </div>
    </>
  );
};

export default Profile;
