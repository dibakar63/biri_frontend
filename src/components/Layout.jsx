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
import DailyMarketInput from '../modules/Market/marketDailyInput';
import CustomerInputReport from '../modules/Customer/customerDailyInputReport';
import MarketInputReport from '../modules/Market/marketDailyInputReport';
import Login from '../modules/auth/login';
import Dashboard from '../modules/dashboard/dashboard';
import Cookie from 'js-cookie';
import DueReport from '../modules/DueReport/dueReport';
import FeedbackReport from '../modules/feedback/feedback';
import FeedbackRegister from '../modules/feedback/feedbackRegister';
import CustomerMap from '../modules/map/map';

const Layout = () => {
  const token = Cookie.get('token');
    return (
      <div className="w-full h-full flex flex-row">
        {/* Sidebar with fixed width */}
        
        <div className="w-[250px] h-full">
        {token &&  <Sidebar />}
        </div>
  
        {/* Main content area that takes the remaining space */}
        <div className="flex-1 h-full flex flex-col">
        {token &&   <Navbar />}
          
          <div className="flex-1 overflow-auto">
          {token ? (
            <>
            <Routes>
              <Route path="/market" element={<Market />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/product" element={<Product />} />
              <Route path="/salePerson" element={<SalePerson />} />
              <Route path="/dailySalePerson" element={<DailySalePerson />} />
              <Route path="/dailySaleReport" element={<DailySalePersonReport />} />
              <Route path="/dailyCustomerInput" element={<DailyCustomerInput />} />
              <Route path="/dailyMarketInput" element={<DailyMarketInput />} />
              <Route path="/dailyCustomerInputReport" element={<CustomerInputReport/>} />
              <Route path="/dailyMarketInputReport" element={<MarketInputReport/>} />
              <Route path="/dueReport" element={<DueReport/>} />
              <Route path="/feedback" element={<FeedbackReport/>} />
            
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/map" element={<CustomerMap/>} />
            </Routes>
            </>):(
              <>
              <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/feedbackRegister" element={<FeedbackRegister/>} />
              </Routes>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  

export default Layout;