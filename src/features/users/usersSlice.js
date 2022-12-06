import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:undefined,
    accessToken:undefined
}
const usersSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       
    }
});

export default usersSlice.reducer;
export const {userLoggedIn,userLoggedOut} = usersSlice.actions;