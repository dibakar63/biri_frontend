
import React,{useState,useEffect, use} from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios';
import toast from 'react-hot-toast';

const  Donut =()=> {
  
  const [report,setReport]=useState([]);
  
  
  const fetchData=async()=>{
    try {
     const respose=await axios.get(`https://apibiri.eazydevz.in/api/getMarketInputReport?market=${market}&startDate=${startDate}&endDate=${endDate}`);
     setReport(respose.data?.marketReport.productSales);
    
    } catch (error) {
     toast.error(error.message);
    }

}
   



   

  useEffect(()=>{
fetchData()
  },[market,startDate,endDate])
  useEffect(()=>{
    fetchData()
  },[])

 const options={
      series: report?.map(item=>item.productCode),
      labels: report?.map(item=>item.quantity),
    }
  

  return (

    
      <div className="donut">
        <Chart options={options} series={options.series} labels={options.labels} type="donut" width="380" height={250} />
      </div>
    
  )
}

export default Donut;