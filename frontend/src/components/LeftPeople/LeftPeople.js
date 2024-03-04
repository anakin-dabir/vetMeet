import "./LeftPeople.css";
import User from "./user.png"
import IosShareIcon from '@mui/icons-material/IosShare';
import { Button } from 'antd';
import { useSendInvitationMutation } from "../../services/nodeAPI";
import { useSnackbar } from 'notistack';


export default function CloseFriend({user}) {
const [sendInvitation]=useSendInvitationMutation();
const { enqueueSnackbar }=useSnackbar();

const handleClick=async ()=>{

console.log({
  veteranID:user._id,
  eventID:localStorage.getItem("eventID")
})

const res =await sendInvitation({
  veteranID:user._id,
  eventID:localStorage.getItem("eventID")
})

if(res.data.status==="success"){
  enqueueSnackbar( "Invitation has been send to "+user.firstName, { variant: 'success' } );

}else{
  enqueueSnackbar( "Something went wrong", { variant: 'error' } );
}




}


  return (
    <div>
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={User} alt="" />
      <span className="sidebarFriendName" style={{"color":"black"}}>{user.firstName+" "+user.lastName}</span>
    <Button type="primary" className="ms-auto" shape="round" icon={<IosShareIcon  size="large"/>} onClick={handleClick}>
      <span className='follow'>Invite</span>
      </Button>   
       </li>
       </div>
  );
}