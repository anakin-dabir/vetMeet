import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import User from "./user.png"
import { Form } from 'antd';
import { useRef } from "react";
import { useContext, useState } from "react";
import AppContext from "../../context/appState/AppContext";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useCreatePostMutation } from "../../services/nodeAPI";
import { VariantType, useSnackbar } from 'notistack';


const Input=styled( 'input' )( {
  display: 'none',
} );
export default function Share() {


  const formRef=useRef( null );
  const { enqueueSnackbar }=useSnackbar();

  const [ createPost ]=useCreatePostMutation();



  const user=JSON.parse( localStorage.getItem( 'user' ) )

  const [ creds, setCreds ]=useState( { description: "", veteran: user._id } );
  const { onChangeGeneric }=useContext( AppContext );


  const onChange=onChangeGeneric( creds, setCreds );


  const handleSubmit=async ( e ) => {

    e.preventDefault();




    let fData=new FormData();


    fData.append( 'description', creds.description )
    fData.append( 'images', e.target.uploadFile.files[ 0 ] )

    const res=await createPost( fData );


    console.log( res );

    if ( res.data.status==='success' ) {
      setCreds( { description: "" } );
      enqueueSnackbar( "Post has been created!", { variant: 'success' } );
      formRef.current.reset();


    }
    else {
      enqueueSnackbar( "something went wrong!", { variant: 'error' } );

    }



  }


  return (
    <form ref={formRef} onSubmit={handleSubmit}>

      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img className="shareProfileImg" src={User} alt="" />

            <input
              placeholder="What's in your mind?"
              className="shareInput"
              name="description"
              onChange={onChange}
            />
          </div>
          <hr className="shareHr" />
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>

                <label htmlFor="contained-button-file" className="inputFieldFile" >
                  <Input accept="image/*" name="uploadFile" id="contained-button-file" multiple type="file" />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>


              </div>
            </div>
            <button className="shareButton" type="submit">Post</button>
          </div>
        </div>
      </div>

    </form>

  );
}