import "./LeftEvents.css";
import User from "./even.jpg"
import IosShareIcon from '@mui/icons-material/IosShare';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

export default function CloseFriend({user}) {

  const handleClick=()=>{
    localStorage.setItem("eventID",user._id);
  }


  return (
    <div>
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={User} alt="" />
      <span className="sidebarFriendName" style={{"color":"black"}}>{user.name}</span>
    
    <Button type="primary" onClick={handleClick} className="ms-auto" shape="round" icon={<RemoveRedEyeOutlinedIcon  size="large"/>}>
    <Link to="/dashboard/event">
      <span className='follow text-white'>View</span>
    </Link>
      </Button>  
     
       </li>
       </div>
  );
}