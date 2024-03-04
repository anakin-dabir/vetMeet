const express=require( "express" );
const { protect } = require("../controllers/authController");
const { getSingleEvent, getAllEvents, updateEvent, deleteEvent, createEvent, getMatchingEvents } = require("../controllers/eventController");



const Router=express.Router();

//Optimize:   ***** Routes ******
Router.use(protect)
Router.route( '/').get(getAllEvents).post(createEvent);
Router.route("/suggestedevents/:id").get(getMatchingEvents);
Router.route( "/:id" )
  .get( getSingleEvent )
  .delete( deleteEvent )
  .patch( updateEvent )



module.exports=Router;