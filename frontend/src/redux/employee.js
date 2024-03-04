import { createSlice } from '@reduxjs/toolkit'

//******* Declare your state variable here
const initialState={
  userData:{},
}

export const userSlice=createSlice( {
  name: 'User',

  initialState,

  reducers: {
    setUserData: ( state, action ) => {
      state.userData=action.payload
    },

  },

} )


// Action creators are generated for each case reducer function
export const { setUserData }=userSlice.actions

export default userSlice.reducer;


