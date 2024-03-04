import React, { useContext, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import UsersContext from "../context/users/UsersContext";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import AppContext from "../context/appState/AppContext";

const ProtectedRoute=( {
  redirectPath='/login',
  children,
  role
} ) => {

  // Check user token here

  const { Cookies }=useContext( UsersContext )
  const { decryptData }=useContext( AppContext )


  const jwt=Cookies.get( 'jwt' );

  let user;

  // const UR=Cookies.get( 'UR' );
  const UR=window.localStorage.getItem( 'UR' );
  console.log( UR )

  if ( UR ) {
    user=decryptData( UR )
  }


  if ( !jwt||!user ) {
    return <Navigate to={redirectPath} replace />;
  }
  
  if ( role && !role.includes( user.role ) ) {
    return <Navigate to={'/error'} replace />;
  }

  return children;
};


export default ProtectedRoute;