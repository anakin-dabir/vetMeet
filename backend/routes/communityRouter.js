const express=require( "express" );

const {
    getAllCommunities,
    getCommunity,
    deleteCommunity,
    updateMe,
    deleteMe,
}=require( `./../controllers/communityController` );


const {
    signUpCommunity,
    logInCommunity,
    protect,
    restrictTo
}=require( "../controllers/authController" );






const communityRouter=express.Router();

//Optimize:                    ************** Routes ***************

//! Below routes are for Non-logged-in communities
communityRouter.post( '/signup', signUpCommunity );
communityRouter.post( '/login', logInCommunity );


//! Below routes are for logged-in communities
communityRouter.use( protect ); // protecting routes
// communityRouter.patch( '/updateme', updateMe );
// communityRouter.delete( '/deleteme', deleteMe );
communityRouter.get( '/me', getCommunity )
communityRouter.route( "/:id" )
    .get( getCommunity )
communityRouter.route( "/" )
    .get( getAllCommunities )


communityRouter.route( "/:id" )
    .delete( deleteCommunity )
    
module.exports=communityRouter;