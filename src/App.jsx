import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { Toaster} from "react-hot-toast";
import {Routes,Route,Link,useNavigate,Navigate} from "react-router-dom"
import Cookies from 'js-cookie'
import Login from './modules/auth/login'
import FeedbackRegister from './modules/feedback/feedbackRegister'



function App() {
  const token = Cookies.get("token")
  
  
  return (
    <div className="w-full h-full " >
     <Toaster
        toastOptions={{
          className: '',
          style: {
            padding: '10px',
            color: '#713200',
            width: "300px"
          },
        }}
      />
      <Routes>
   
   {token ? (
            
            <Route path="/*" element={<Layout />} />
            
          ) : (
            <>
              {/* Public routes for Login and Forgot Password */}
              <Route path="/login" element={<Login />} />
              <Route path="/feedbackRegister" element={<FeedbackRegister />} />
              

              {/* Redirect any other route to /login if no token */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
    
    </div>
  )
}

export default App
