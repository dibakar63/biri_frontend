import React, { use, useState,useEffect } from 'react';
import axios from 'axios';
import toast  from 'react-hot-toast'; 
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const  businessName = useSelector((state) => state.business.businessName);
  const [market,setMarket]=useState([]);
  const [marketReport,setMarketReport]=useState([]);
  const [customerReport,setCustomerReport]=useState([]);
  const [customer,setCustomer]=useState([]);
  const [formData,setFormData]=useState({
    market:'',
    startDate:'',
    endDate:'',
    customer:""
    
  })
  const handleInputChange = (e) => {
    const { name, value,type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };

    const fetchMarketReportData=async()=>{
        try {
          const response=await axios.get(`https://apibiri.eazydevz.in/api/getMarketInputReport?market=${formData.market}&startDate=${formData.startDate}&endDate=${formData.endDate}&businessName=${businessName}`);
          setMarketReport(response.data.marketReport);
          
        } catch (error) {
         // toast.error(error.message);
          
        }

    }
    const fetchCustomerReportData=async()=>{
      try {
        const response=await axios.get(`https://apibiri.eazydevz.in/api/getCustomerInputReport?market=${formData.market}&startDate=${formData.startDate}&endDate=${formData.endDate}&businessName=${businessName}&customer=${formData.customer}`);
        setCustomerReport(response.data.customerReport);
      } catch (error) {
        //toast.error(error.message);
      }
    }
    const fetchMarketData=async()=>{
      try {
        const response=await axios.get(`https://apibiri.eazydevz.in/api/getMarket?businessName=${businessName}`);
        setMarket(response.data.market);
      } catch (error) {
        toast.error(error.message);
      }
    }
      const fetchCustomerData=async()=>{
      try {
        const response=await axios.get(`https://apibiri.eazydevz.in/api/getCustomerByMarket?businessName=${businessName}&market=${formData.market}`);
        setCustomer(response.data.customer);
      } catch (error) {
        toast.error(error.message);
      }
    }
    useEffect(()=>{
      fetchMarketReportData();
    },[formData.market,formData.startDate,formData.endDate,businessName])
     useEffect(()=>{
      fetchCustomerReportData();
    },[formData.market,formData.startDate,formData.endDate,businessName,formData.customer])
    useEffect(()=>{
      fetchMarketData();
      fetchMarketReportData();
    },[businessName])
    useEffect(()=>{
      fetchCustomerData();
    },[formData.market])
    //  const options={
    //   series: marketReport?.productSales?.map(item=>item.quantity),
    //   labels: marketReport?.productSales?.map(item=>item.productCode),
    // }
    //console.log(options.labels,options.series);
    const arr1=[];
    const arr2=[];
    const seriesMap=marketReport?.productSales?.forEach(item=>arr1.push(item.quantity))
    const labelsMap=marketReport?.productSales?.forEach(item=>arr2.push(item.productCode))
    console.log(arr1,arr2);
   
    const options={
      series: arr1,
      labels: arr2,
    }
     const arr3=[];
    const arr4=[];
    const seriesMap1=customerReport?.productSales?.forEach(item=>arr3.push(item.quantity))
    const labelsMap1=customerReport?.productSales?.forEach(item=>arr4.push(item.productCode))
    //console.log(arr1,arr2);
   
    const options1={
      series: arr3,
      labels: arr4,
    }


  return (
    <div className="w-full h-full bg-[#DDDCDC] p-2">
     
        <div className="bg-white rounded-lg shadow-lg p-2">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
          <div className='flex flex-row justify-center gap-4 items-center'>
             <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="startDate" className="block text-sm/6 font-medium text-gray-900">Start Date</label>
          <div className="mt-2">
          <input type='date' name="startDate" id="startDate" value={formData.startDate} onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>
        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="endDate" className="block text-sm/6 font-medium text-gray-900">End Date</label>
          <div className="mt-2">
          <input type='date' name="endDate" id="endDate" value={formData.endDate} onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>
         <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="market" className="block text-sm/6 font-medium text-gray-900">Market</label>
          <div className="mt-2">
          <select name="market" id="market" value={formData.market} onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="">Select Market</option>
            {market.map((item)=>(
              <option value={item.marketName}>{item.marketName}</option>
            ))}
          </select>
          </div>
        </div>
          <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="market" className="block text-sm/6 font-medium text-gray-900">Customer</label>
          <div className="mt-2">
          <select name="customer" id="customer" value={formData.customer} onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="">Select Customer</option>
          {customer.map((item)=>(
              <option value={item.name}>{item.name}</option>
            ))}
          </select>
          </div>
        </div>
          </div>
          <div className='mt-3 flex flex-row justify-center items-cneter gap-3'>
        
          <div className="sm:col-span-6 bg-[#F2F1F1] rounded-md shadow-lg p-2">
            
                <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
             
              <th className="px-3 py-3 text-left text-sm font-semibold">Market Name</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Total Paid</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Total Due</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Product Sales</th>
              
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            
              <tr  className="hover:bg-gray-50">
               
                <td className="px-3 py-4 text-sm text-gray-900">{marketReport.market}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{marketReport.totalPaid}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{marketReport.totalDue}</td>
                <td className="px-3 py-4 text-sm text-gray-900">
                   <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Product Name</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Qty</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Unit</th>
             
              
             
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {marketReport?.productSales?.map((market, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{market.productCode}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{market.quantity}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{market.unit}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
                </td>
                
              
              </tr>
            
          </tbody>
        </table>
        </div>

         <div className="sm:col-span-2 bg-[#F2F1F1] rounded-md shadow-lg p-2">
            <Chart options={options} labels={options.labels} series={options.series} type="donut" width="500" height={500} />
        </div>
        </div>
        <div className='mt-6 flex flex-row justify-center items-cneter gap-3'>
       
               <div className="sm:col-span-6 bg-[#F2F1F1] rounded-md shadow-lg p-2">
            
                <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
             
              <th className="px-3 py-3 text-left text-sm font-semibold">Market</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Total Paid</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Total Due</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Product Sales</th>
              
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            
              <tr  className="hover:bg-gray-50">
               
                <td className="px-3 py-4 text-sm text-gray-900">{customerReport?.market}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{customerReport?.customer}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{customerReport?.totalPaid}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{customerReport?.totalDue}</td>
                <td className="px-3 py-4 text-sm text-gray-900">
                   <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Product Name</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Qty</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">Unit</th>
             
              
             
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customerReport?.productSales?.map((market, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{market.productCode}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{market.quantity}</td>
                <td className="px-3 py-4 text-sm text-gray-900">{market.unit}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
                </td>
                
              
              </tr>
            
          </tbody>
        </table>
        </div>
           <div className="sm:col-span-2 bg-[#F2F1F1] rounded-md shadow-lg p-2">
            <Chart options={options1} labels={options.labels} series={options.series} type="donut" width="500" height={500} />
        </div>

          </div>





         
        </div>
      
    </div>
  );
};
export default Dashboard;