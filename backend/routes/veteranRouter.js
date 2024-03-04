const express=require( "express" );

const {
    getAllVeterans,
    getVeteran,
    updateMe,
    deleteMe,
    updateVeteran, // For admins
    createVeteran,
    getVeteranByID,
    updateVeteranPass, // For adVeteran
    // uploadUserPhoto,
    // resizeUserPhoto,
    activeVeteran,
    inactiveVeteran,
    getVeteranFollowedPersons,
    FollowPerson,interestedInEvent, vetrensWithMatchingHobbies, getPostOfVeteranFollowed, increaseVeteranStars
}=require( `../controllers/veteranController` );


const {
    signUpVeteran,
    logInVeteran,
    forgotPassword,
    resetPassword,
    updatePassword,
    protect,
    restrictTo
}=require( "../controllers/authController" );






const veteranRouter=express.Router();

//Optimize:                    ************** Routes ***************

//! Below routes are for Non-logged-in users
veteranRouter.post( '/signup', signUpVeteran );
veteranRouter.post( '/login', logInVeteran );


//! Below routes are for logged-in users
veteranRouter.use( protect ); // protecting routes
// veteranRouter.patch( '/updateMe', uploadUserPhoto, resizeUserPhoto , updateMe );
veteranRouter.get( '/me', getVeteran );
veteranRouter.get( '/current/getfollowedpersons', getVeteranFollowedPersons );
veteranRouter.patch( '/increaseStars', increaseVeteranStars );
veteranRouter.get( '/post/followed/', getPostOfVeteranFollowed);
veteranRouter.get('/matchinghobbies/:hobby',vetrensWithMatchingHobbies);
veteranRouter.patch( '/followperson/:id', FollowPerson );
veteranRouter.patch( '/interestedevent/:id', interestedInEvent );
veteranRouter.get( '/', getAllVeterans );
veteranRouter.get( '/veteranBy/ID/:id', getVeteranByID );




module.exports=veteranRouter;