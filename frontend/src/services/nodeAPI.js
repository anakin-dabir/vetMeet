import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';



export const nodeAPI=createApi( {
  reducerPath: "nodeAPI",
  baseQuery: fetchBaseQuery( { baseUrl: "http://127.0.0.1:3001/api/v1" } ),

  // Entities of API
  tagTypes: [ "Veteran", "Post","Event","Community" ],



  endpoints: ( builder ) => ( {

    //Optimize:  ************************** Veterans Authentication ******************************


    //********** Login query
    veteranLogin: builder.mutation( {
      query: ( body ) => ( {
        url: '/veterans/login',
        method: 'POST',
        body,
      } ),
      invalidatesTags: [ 'Veteran' ],
    } ),

    //********** Sign up query
    veteranSignup: builder.mutation( {
      query: ( body ) => ( {
        url: '/veterans/signup',
        method: 'POST',
        body,
      } ),
      invalidatesTags: [ 'Veteran' ],
    } ),

    //********** get all veterans
    getAllVeterans: builder.query( {
      query: ( body ) => ( {
        url: '/veterans/',
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Veteran' ],
    } ),
    //********** get all veterans
    getSingleVeteran: builder.query( {
      query: ( id ) => ( {
        url: `/veterans/veteranBy/ID/${id}`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Veteran' ],
    } ),
    //********** get veterans
    getVeteran: builder.query( {
      query: (  ) => ( {
        url: `/veterans/me`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Veteran' ],
    } ),
    followPerson: builder.mutation( {
      query: ( id ) => ( {
        url: `/veterans/followperson/${id}`,
        method: 'PATCH',
        body: {},
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      invalidatesTags: [ 'Veteran' ],
    } ),

    //Optimize:  ************************** Organization/community Authentication ******************************


    //********** Login query
    communityLogin: builder.mutation( {
      query: ( body ) => ( {
        url: '/community/login',
        method: 'POST',
        body,
      } ),
      invalidatesTags: [ 'Community' ],
    } ),

    //********** Sign up query
    communitySignup: builder.mutation( {
      query: ( body ) => ( {
        url: '/community/signup',
        method: 'POST',
        body,
      } ),
      invalidatesTags: [ 'Community' ],
    } ),
    getcommunities: builder.query( {
      query: () => ( {
        url: '/community/',
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Community' ],
    } ),
    getSingleCommunity: builder.query( {
      query: ( id ) => ( {
        url: `/community/${id}`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Community' ],
    } ),


    //Optimize:  ************************** post Authentication ******************************


    //********** create post query
    createPost: builder.mutation( {
      query: ( body ) => ( {
        url: '/posts/',
        method: 'POST',
        body,
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      invalidatesTags: [ 'Post' ],
    } ),

    //********** create post query
    getFollowedPosts: builder.query( {
      query: () => ( {
        url: '/veterans/post/followed/',
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Post' ],
    } ),
    suggestedEvents: builder.query( {
      query: ( id ) => ( {
        url: `/events/suggestedEvents/${id}`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Event' ],
    } ),

    createEvent: builder.mutation( {
      query: ( body ) => ( {
        url: '/events/',
        method: 'POST',
        body,
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Post' ],
    } ),


    getEvent: builder.query( {
      query: ( id ) => ( {
        url: `/events/${id}`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Event' ],
    } ),


    sendInvitation: builder.mutation( {
      query: ( body ) => ( {
        url: `/invitations/`,
        method: 'POST',
        body,
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Event' ],
    } ),

    getAllEvents: builder.query( {
      query: () => ( {
        url: `/events/`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Event' ],
    } ),

    
    increaseStars: builder.mutation( {
      query: (body) => ( {
        url: `/veterans/increaseStars`,
        method: 'PATCH',
        body,
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }
      } ),
      providesTags: [ 'Veteran' ],
    } ),

    


    //Optimize:  ************************** Roles and permission ******************************
    //******** Get All roles query
    getFollowedVetrens: builder.query( {
      query: ( body ) => ( {
        url: `veterans/current/getfollowedpersons/`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }

      } ),
      providesTags: [ 'Veteran' ],

    } ),
    //Optimize:  ************************** Roles and permission ******************************
    //******** Get All roles query
    getvetrensMatchingHobbbies: builder.query( {
      query: ( body ) => ( {
        url: `veterans/matchinghobbies/${body}`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${Cookies.get( 'jwt' )}`,
        }

      } ),
      invalidatesTags: [ 'Veteran' ],

    } ),

  } )

} );

export const { useVeteranSignupMutation, useVeteranLoginMutation, useCommunityLoginMutation, useCommunitySignupMutation, useCreatePostMutation, useGetFollowedPostsQuery, useGetAllVeteransQuery, useGetSingleVeteranQuery, useFollowPersonMutation, useGetcommunitiesQuery, useGetSingleCommunityQuery, useCreateEventMutation,useGetVeteranQuery,useSuggestedEventsQuery ,useGetEventQuery,useSendInvitationMutation,useGetAllEventsQuery,useIncreaseStarsMutation,useGetFollowedVetrensQuery,useGetvetrensMatchingHobbbiesQuery}=nodeAPI;

