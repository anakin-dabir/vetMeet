import React from 'react'
import "../css/invitations.css"
import TableComp from "../components/TableComp/TableComp"
import {  Space } from 'antd';
import { PageHeader } from './PageHeader';


const handleAccept=()=>{

};


const invitations = () => {
     const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: 150,
  },
  {
    title: 'Event Type',
    dataIndex: 'eventType',
    width:200,
  },{
    title: 'Stars',
    dataIndex: 'stars',
    width:150,
  },
  {
    title: 'Action',
    key: 'action',
    width:150,
    render: (text, record) => (
      <Space size="middle">
        <a onClick={handleAccept}><span className="action-clr">Accept</span></a>
        <a><span className='action-clr'>Reject</span></a>
      </Space>
    ),
  },
];



const user = JSON.parse(localStorage.getItem("user"))
const invitations = user.invitations;


let data;

data = invitations.map((el,i)=>{

  return {
    key: i,
    name: el.eventID.name,
    time: el.eventID.eventTime,
    eventType: el.eventID.eventType,
    stars: "⭐ "+el.eventID.eventStars,
  }


})







  return (
    <>
    <div>
        <div>
    <PageHeader subHeading='You can view all the invites of events here.' heading='All Invitations' />
            <div className="padding-Table">
            <TableComp data={data} columns={columns} />
            </div>
        </div>
    </div>
    </>
  )
}

export default invitations