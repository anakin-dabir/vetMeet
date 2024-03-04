import React, { useState } from 'react'
import "../css/events.css"
import TableComp from "../components/TableComp/TableComp"
import {  Space } from 'antd';
import { PageHeader } from './PageHeader';
import {setUserData} from '../redux/employee';
import { useDispatch } from 'react-redux';
import { useGetVeteranQuery, useSuggestedEventsQuery } from '../services/nodeAPI';
import { Link } from 'react-router-dom';




const Events = () => {


  const Dispatch= useDispatch();

  const {data:veteran,isLoading:isLoadingUser}= useGetVeteranQuery();
  !isLoadingUser && Dispatch(setUserData(veteran.data));
  

console.log(veteran?.data?.interestedEvents)

   const {data:suggestedEvents,isLoading:isLoadingSuggested}=useSuggestedEventsQuery(JSON.parse(localStorage.getItem('user'))._id);


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
    render: (text, record) => 
      {console.log(record)
     return <Space size="middle">
        <Link to="/dashboard/event"><span className="action-clr" onClick={()=>{localStorage.setItem("eventID",record.id)
         localStorage.setItem("eventType",record.type)
      }}>View Event</span></Link>
      </Space>}
    ,
  },
];

const dataa = [];

  return (
    !isLoadingUser && !isLoadingSuggested &&  <>
    {/* -----------------------------My Created Events-------------------------------------- */}
    <PageHeader subHeading='You can add new Community Service Events.' heading='Created Events' toLink="/dashboard/addnewevent" btnText='+ Add new event' />
    <div style={{margin:"1rem 2rem"}}>
        <div>
            {/* <h2 className='text-center heading-events'>My Created Events</h2> */}
            <div className="padding-Table">
          <TableComp data={veteran.data.createdEvents.map((e)=>{  return {name: e.name, time: e.eventTime,eventType: e.eventType,stars: e.eventStars,id:e._id,type:"cv"}})} columns={columns} />
            </div>
        </div>
    </div>
    {/* -----------------------------My Created Events-------------------------------------- */}
    <PageHeader subHeading='You can view interested events.' heading='Interested Events' />
     <div  style={{margin:"0rem 2rem"}}>
        <div>
            <div className="padding-Table">
            <TableComp data={veteran.data.interestedEvents.map((e)=>{  return {name: e.name, time: e.eventTime,eventType: e.eventType,stars: e.eventStars,id:e._id,type:"iv"}})} columns={columns} />
            </div>
        </div>
    </div>    
    {/* -----------------------------My Created Events-------------------------------------- */}
    <PageHeader subHeading='You can view suggested events depending on your hobbies.' heading='Suggested Events' />
    <div  style={{margin:"0rem 2rem"}}>
        <div>
            <div className="padding-Table">
            <TableComp data={suggestedEvents.data.map((e)=>{  return {name: e.name, time: e.eventTime,eventType: e.eventType,stars: e.eventStars,id:e._id,type:"sv"}})} columns={columns} />
            </div>
        </div>
    </div>
    </>
  )
}

export default Events