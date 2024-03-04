import React from 'react'
import ur from "../img/user.png"
import "../css/profile.css"
import { Divider } from 'antd';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import { useFollowPersonMutation, useGetSingleVeteranQuery } from '../services/nodeAPI';
import { Button } from 'antd';
import MessageIcon from '@mui/icons-material/Message';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { VariantType, useSnackbar } from 'notistack';




const Veteran=() => {

  const { enqueueSnackbar }=useSnackbar();

  const user=JSON.parse( localStorage.getItem( "user" ) );

  const [ followPerson ]=useFollowPersonMutation()
  
  const handleFollow=async () => {
    const decode=jwtDecode( Cookies.get( 'jwt' ) );
    const vet=localStorage.getItem( 'veteranID' );

    const res=await followPerson( vet );


console.log(res)
    if ( res.data.status==="success" ) {

      enqueueSnackbar( "Followed successfully!", { variant: 'success' } );
      localStorage.setItem("user",JSON.stringify(res.data.data))
      
    }
    else {


      enqueueSnackbar( "something went wrong!", { variant: 'error' } );

    }


  }

  const { data, isLoading, isError }=useGetSingleVeteranQuery( localStorage.getItem( 'veteranID' ) );

  console.log( !isLoading&&data );
  return (
    <>

      {!isLoading&&<div className='row top-marg ml-4'>
        <div className="col-md-4">
          <img src={ur} alt="user" className="profile-image" />
          <Divider orientation="left" plain>
            Hobbies
          </Divider>
          <ul className='list'>
            {
              data?.data.hobbies.map( el => {
                return <li>{el}</li>
              } )
            }
          </ul>
        </div>
        <div className='col-md-8 mt-4'>
          <h2 className='name'>{data?.data.firstName+" "+data?.data.lastName} <AddLocationAltIcon className='icon-clr' /><small className="city">Lahore</small></h2>
          <small className='profession'>{user.profession}</small>
          <h5 className='mt-4'>{data?.data.stars} ⭐</h5>

          {/* <h5><SupervisedUserCircleOutlinedIcon/> 0 followers  0 following</h5> */}
          <h5><SupervisedUserCircleOutlinedIcon /> {data?.data.followed.length} following</h5>
          <div>
            {/* btns */}
            <div className='d-flex'>
              <Button onClick={handleFollow} type="primary" shape="round" icon={<PersonAddIcon size="large" />}>
                <span className='follow'  >Follow</span>
              </Button>
              <Button type="danger" shape="round" icon={<MessageIcon size="large" />} className="message">
                <span className='follow'>Message</span>
              </Button>
            </div>
          </div>
          <Divider plain >About</Divider>
          <small className='Contact-info'>Contact Information</small>
          <h6 className='mt-2 font-12'>Phone:  <span className="clr-blue">{data?.data.phone}</span></h6>
          <h6 className='font-12'>Address:<span className="clr-black">{data?.data.address}</span></h6>
          <h6 className=' font-12'>Email:  <span className="clr-email">{data?.data.email}</span></h6>
          <div className='mt-4'>

          </div>
          <small className='Personal-info'>Personal Information</small>
          <h6 className='mt-2 font-12'>Gender:  <span className="clr-gender">{"Male"}</span></h6>


        </div>
      </div>}
    </>
  )
}

export default Veteran