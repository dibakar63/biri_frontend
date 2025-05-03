import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const initialState = {
    userName: '',
    email: '',
    token: '',
    loading: false,
    error: null
  };
 

 export const loginUser=createAsyncThunk('auth/loginUser',async(credintials,{rejectWithValue})=>{
    try {
        const response=await axios.post('https://apibiri.eazydevz.in/api/login',credintials);
        return {
            userName:response.data.user.userName,
            email:response.data.user.email,
            token:response.data.token
        }
        

    } catch (error) {
        return rejectWithValue(err.response.data.message || "Login failed");
    }
 }) 

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.userName='';
            state.email='';
            state.token='';
            
            state.error=null;
            Cookies.remove('token');
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.userName=action.payload.userName;
            state.email=action.payload.email;
            state.token=action.payload.token;
            state.error=null;
            Cookies.set('token',action.payload.token);
           
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }

})
export const { logout } = authSlice.actions;
export default authSlice.reducer;