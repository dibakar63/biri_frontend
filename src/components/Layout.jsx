import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


import Customer from '../modules/Customer/customer';
import { Routes,Route } from 'react-router-dom';
import Product from '../modules/Product/product';
import SalePerson from '../modules/SalePerson/salePerson';
import DailySalePerson from '../modules/DailySalePerson/dailySalePerson';
import DailySalePersonReport from '../modules/DailySalePerson/dailySalePersonReport';
import Market from '../modules/Market/market';
import DailyCustomerInput from '../modules/Customer/customerDailyInput';
import CustomerInputReport from '../modules/Customer/customerDailyInputReport';

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
              <Route path="/product" element={<Product />} />
              <Route path="/salePerson" element={<SalePerson />} />
              <Route path="/dailySalePerson" element={<DailySalePerson />} />
              <Route path="/dailySaleReport" element={<DailySalePersonReport />} />
              <Route path="/dailyCustomerInput" element={<DailyCustomerInput />} />
              <Route path="/dailyCustomerInputReport" element={<CustomerInputReport/>} />
            </Routes>
          </div>
        </div>
      </div>
    );
  };
  

export default Layout;