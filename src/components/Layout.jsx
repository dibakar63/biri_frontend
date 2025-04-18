import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import Market from '../modules/Market/market';
import Customer from '../modules/Customer/customer';
import { Routes,Route } from 'react-router-dom';

const Layout = () => {
    return (
      <div className="w-full h-full flex flex-row">
        {/* Sidebar with fixed width */}
        <div className="w-[250px] h-full">
          <Sidebar />
        </div>
  
        {/* Main content area that takes the remaining space */}
        <div className="flex-1 h-full flex flex-col">
          <Navbar />
          
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/market" element={<Market />} />
              <Route path="/customer" element={<Customer />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  };
  

export default Layout;