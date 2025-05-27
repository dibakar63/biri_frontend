import React, { use } from "react";
import { Home, User, Settings} from "lucide-react"; // or use your own icons
import { Link,useLocation } from "react-router-dom";
import Market from "../modules/Market/market";
import {Route,Routes } from "react-router-dom";
import Customer from "../modules/Customer/customer";

const Sidebar = () => {
  const location=useLocation();
  const isActive=(path)=>{
    return location.pathname===path;
  }
  const getBackgroundColor=(path)=>{
    return isActive(path)?'bg-gray-400':'';
  }
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Ganesh Biri
      </div>
      <nav className="flex flex-col mt-4  space-y-4">

      <Link
          to="/market"
          className="flex items-center space-x-2 p-2  hover:bg-gray-400 transition "
          style={{ backgroundColor: isActive("/market") ? "white" : "transparent",color:isActive("/market")?"black":"white" }}
        >
         
          <span>Market Register</span>
          </Link>
          <Link
          to="/customer"
          className="flex items-center space-x-2 p-2  hover:bg-gray-400 transition "
          style={{ backgroundColor: isActive("/customer") ? "white" : "transparent" ,color:isActive("/customer")?"black":"white",border:isActive("/customer")?"2px solid bg-gray-400":"none"}}
        >
         
          <span>Customer Register</span>
          </Link>
          <Link
          to="/product"
          className="flex items-center space-x-2 p-2  hover:bg-gray-400 transition "
          style={{ backgroundColor: isActive("/product") ? "white" : "transparent" ,color:isActive("/product")?"black":"white",border:isActive("/product")?"2px solid bg-gray-400":"none"}}
        >
         
          <span>Product Register</span>
          </Link>
          <Link
          to="/salePerson"
          className="flex items-center space-x-2 p-2  hover:bg-gray-400 transition "
          style={{ backgroundColor: isActive("/salePerson") ? "white" : "transparent" ,color:isActive("/salePerson")?"black":"white",border:isActive("/salePerson")?"2px solid bg-gray-400":"none"}}
        >
         
          <span>Sale Person Register</span>
          </Link>
          <Link
          to="/dailySalePerson"
          className="flex items-center space-x-2 p-2  hover:bg-gray-400 transition "
          style={{ backgroundColor: isActive("/dailySalePerson") ? "white" : "transparent" ,color:isActive("/dailySalePerson")?"black":"white",border:isActive("/dailySalePerson")?"2px solid bg-gray-400":"none"}}
        >
         
          <span>Daily Market Sales Person</span>
          </Link>
          <Link
          to="/dailyCustomerInput"
          className="flex items-center space-x-2 p-2  hover:bg-gray-400 transition "
          style={{ backgroundColor: isActive("/dailyCustomerInput") ? "white" : "transparent" ,color:isActive("/dailyCustomerInput")?"black":"white",border:isActive("/dailyCustomerInput")?"2px solid bg-gray-400":"none"}}
        >
         
          <span>Daily Customer Input</span>
          </Link>
          <Link
          to="/dailyMarketInput"
          className="flex items-center space-x-2 p-2  hover:bg-gray-400 transition "
          style={{ backgroundColor: isActive("/dailyMarketInput") ? "white" : "transparent" ,color:isActive("/dailyMarketInput")?"black":"white",border:isActive("/dailyMarketInput")?"2px solid bg-gray-400":"none"}}
        >
         
          <span>Daily Market Input</span>
          </Link>
           <Link
          to="/map"
          className="flex items-center space-x-2 p-2  hover:bg-gray-400 transition "
          style={{ backgroundColor: isActive("/map") ? "white" : "transparent" ,color:isActive("/map")?"black":"white",border:isActive("/map")?"2px solid bg-gray-400":"none"}}
        >
         
          <span>Market Map</span>
          </Link>

       
      </nav>
    </div>
  );
};

export default Sidebar;
