import React from 'react';
import AppContext from './AppContext';
// let CryptoJS=require( "crypto-js" );
import Cook from 'js-cookie';



const AppState=( props ) => {



  // const encryptData=( data ) => {
  //   // Encrypt
  //   let ciphertext=CryptoJS.AES.encrypt( JSON.stringify( data ), 'my-secret-key@123' ).toString();
  //   console.log( ciphertext, "DATA HAS BEEN ENCRYPTED" )
  //   return ciphertext;

  // }

  // const decryptData=( encryptedData ) => {
  //   // Decrypt
  //   let bytes=CryptoJS.AES.decrypt( encryptedData, 'my-secret-key@123' );
  //   let decryptedData=JSON.parse( bytes.toString( CryptoJS.enc.Utf8 ) );

  //   return decryptedData;

  // }




  const onChangeGeneric=( stateVar, stateModifier ) => {

    return (
      ( event ) => {
        stateModifier( { ...stateVar, [ event.target.name ]: event.target.value } )
      }
    )

  }


  const Cookies=Cook.withAttributes( {
    path: '/', sameSite: 'Strict', secure: true, expires: 7
  } )




  return (

    <AppContext.Provider value={{ onChangeGeneric, Cookies }}>
      {props.children}
    </AppContext.Provider>

  )
}

export default AppState