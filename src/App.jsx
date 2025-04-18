import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { Toaster} from "react-hot-toast";


function App() {
  
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
   
  <Layout/>
    
    </div>
  )
}

export default App
