import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { loginUser } from '../../utils/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login=()=>{
    const auth=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        userName:'',
        password:''
    })
    const token=Cookies.get('token');
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }
    // useEffect(() => {
    //     if (token) {
    //       navigate('/dashboard');
    //       window.location.reload('/dashboard');
         
    //     }
    //   }, [token]);
    const handleLogin = async () => {
        try {
          const result = await dispatch(
            loginUser({ userName: formData.userName, password: formData.password })
          );
      
          if (loginUser.fulfilled.match(result)) {
            navigate('/dashboard');
            window.location.reload(); // optional, but don't pass a path
          } else {
            // Optional: Show error message
            console.error('Login failed:', result.payload || result.error);
          }
        } catch (err) {
          console.error('Login error:', err);
        }
      };
      
      
      const handleLogout = () => {
        dispatch(logout());
      };
    return(
        <div className='w-full min-h-screen grid place-items-center gap-2'>
        <div className='flex flex-col items-center justify-center gap-2 w-[400px] p-10 bg-[#27C8DE] h-fit-content rounded-md p-10'>
        <h1 className='text-white text-2xl mb-2'>Login</h1>
        <div className='flex flex-row justify-between items-center gap-3'>
            <label className='text-white'>UserName</label>
            <input  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm" type="text" name="userName" value={formData.userName} onChange={handleInputChange}/>
        </div>
        <div className='flex flex-row justify-between items-center gap-3'>
            <label className='text-white'>Password</label>
            <input  className="block w-full rounded-md bg-white px-3 py-1.5 text-base ml-2 text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm" type="password" name="password" value={formData.password} onChange={handleInputChange}/>
        </div>
        <button
  type="submit"
  className="rounded-md bg-indigo-600 px-3 mt-3 py-2 text-md font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  onClick={handleLogin}
>
  Login
</button>
</div>

        </div>
    )

}

export default Login;