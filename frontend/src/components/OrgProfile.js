import React from "react";
import user from "../img/org.png";
import "../css/orgprofile.css";
import { Divider } from "antd";
import TableComp from "../components/TableComp/TableComp";
import { Space } from "antd";
import { Button } from "antd";
import MessageIcon from "@mui/icons-material/Message";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import { useGetSingleCommunityQuery } from "../services/nodeAPI";
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

  const {
    data: queryData,
    isLoading,
    isError,
  } = useGetSingleCommunityQuery(localStorage.getItem("communityID"));

  let data;

  console.log(!isLoading && queryData);
  // for (let i = 0; i < 5; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward King ${i}`,
  //     time: "13 july 2020",
  //     eventType: `London Park`,
  //     stars: "⭐ 2200",

  //   });
  // }
  return (
    <>
      {!isLoading && (
        <div className="row top-marg ml-4">
          <div className="col-md-4">
            <img src={user} alt="user" className="profile-image" />
            {/* <Divider orientation="left" plain>
              hobbies
        </Divider>
            <ul className='list-st'>
              <li>Sky Diving</li>
              <li>Swimming</li>
              <li>Cricket</li>
              <li>Football</li>
          </ul> */}
          </div>
          <div className="col-md-8">
            <h2 className="name">
              {queryData?.data.name}
              <AddLocationAltIcon className="icon-clr" />
              <small className="city">Lahore</small>
            </h2>
            <small className="profession">{queryData?.data.type}</small>
            <div className="d-flex mt-4">
              <Button type="primary" shape="round" icon={<PersonAddIcon size="large" />}>
                <span className="follow">Follow</span>
              </Button>
              {/* <Button type="danger" shape="round" icon={<MessageIcon  size="large"/>} className="message">
        <span className='follow'>Message</span>
        </Button> */}
            </div>
            <Divider plain>About</Divider>
            <small className="Contact-info">Contact Information</small>
            <h6 className="mt-2 font-12">
              Phone: <span className="clr-blue">{queryData?.data.phone}</span>
            </h6>
            <h6 className="mt-4 font-12">
              Email: <span className="clr-email">{queryData.data.email}</span>
            </h6>
            <div className="mt-4"></div>
            <div className="mb-4"></div>
            <Divider plain>Organization 's Events</Divider>
            <div className="padding-Table">
              <TableComp data={data} columns={columns} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrgProfile;
