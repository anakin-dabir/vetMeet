import React from "react";
import user from "../img/org.png";
import "../css/orgprofile.css";
import { Divider } from "antd";
import TableComp from "./TableComp/TableComp";
import { Space } from "antd";
import { Button } from "antd";
import MessageIcon from "@mui/icons-material/Message";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
const OrgProfile = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Time",
      dataIndex: "time",
      width: 150,
    },
    {
      title: "Event Type",
      dataIndex: "eventType",
      width: 200,
    },
    {
      title: "Stars",
      dataIndex: "stars",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          <a>
            <span className="action-clr">View Event</span>
          </a>
        </Space>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      time: "13 july 2020",
      eventType: `London Park`,
      stars: "⭐ 2200",
    });
  }
  return (
    <>
      <div className="row top-marg ml-4">
        <div className="col-md-4">
          <img src={user} alt="user" className="profile-image" />
        </div>
        <div className="col-md-8">
          <h2 className="name">
            Hilab Ladees <AddLocationAltIcon className="icon-clr" />
            <small className="city">Kiranchi</small>
          </h2>
          <small className="profession">Organization type</small>
          <div>
            <p className="lorem">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate tenetur itaque
              similique optio soluta! Doloribus iste sed odit quod incidunt earum! Quam beatae
              eligendi dignissimos quis voluptatem impedit! Ducimus, tenetur?
            </p>
          </div>

          <Divider plain>About</Divider>
          <small className="Contact-info">Contact Information</small>
          <h6 className="mt-2 font-12">
            Phone: <span className="clr-blue">+xxs1923131313</span>
          </h6>
          <h6 className="mt-4 font-12">
            Email: <span className="clr-email">mariko@gmail.com</span>
          </h6>
          <div className="mt-4"></div>
          <div className="mb-4"></div>
          <Divider plain>Organization 's Events</Divider>
          <div className="padding-Table">
            <TableComp data={data} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgProfile;
