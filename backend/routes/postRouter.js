const express=require( "express" );
const { protect }=require( "../controllers/authController" );
const { uploadPostPhoto, resizePostPhoto, createPost }=require( "../controllers/postController" );






const Router=express.Router();

//Optimize:   ************** Routes ***************


Router.post( '/',protect,uploadPostPhoto,resizePostPhoto,createPost );
// Router.post( '/',protect,createPost );





// Router.route( "/:id" )
  // .get( getData )
  // .delete( deleteData )
  // .patch( updateData )



module.exports=Router;