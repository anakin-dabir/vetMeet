import React from 'react'
import ur from "../img/user.png"
import "../css/profile.css"
import { Divider } from 'antd';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
const Profile=() => {


  const user=JSON.parse( localStorage.getItem( "user" ) );

  return (
    <>
    <div className='row top-marg ml-4'>
    <div className="col-md-4">
          <img src={ur} alt="user" className="profile-image" />   
           <Divider orientation="left" plain>
            Hobbies
      </Divider>
          <ul className='list-st'>
            {
              user.hobbies.map( el => {
                return <li>{el}</li>
              } )
            }
        </ul>
    </div>
    <div className='col-md-8 mt-4'> 
          <h2 className='name'>{user.firstName+" "+user.lastName} <AddLocationAltIcon className='icon-clr' /><small className="city">Lahore</small></h2>
          <small className='profession'>{user.profession}</small>
          <h5 className='mt-4'>{user.stars} ⭐</h5>
          {/* <h5><SupervisedUserCircleOutlinedIcon/> 0 followers  0 following</h5> */}
          <h5><SupervisedUserCircleOutlinedIcon /> {user.followed.length} following</h5>
        <div>
            {/* btns */}
        </div>
          <Divider plain >About</Divider>
        <small className='Contact-info'>Contact Information</small>
          <h6 className='mt-2 font-12'>Phone:  <span className="clr-blue">{user.phone}</span></h6>
          <h6 className='font-12'>Address:<span className="clr-black">{user.address}</span></h6>
          <h6 className=' font-12'>Email:  <span className="clr-email">{user.email}</span></h6>
        <div className='mt-4'>

        </div>
        <small className='Personal-info'>Personal Information</small>
          <h6 className='mt-2 font-12'>Gender:  <span className="clr-gender">{"Male"}</span></h6>

    
    </div>
    </div>
  
    </>
  )
}

export default Profile