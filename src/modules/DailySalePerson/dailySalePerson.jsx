import axios from 'axios';
import React,{use, useState,useEffect} from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import Cookie from 'js-cookie'

const DailySalePerson = () => {
  const token=Cookie.get('token');
  const [markets,setMarkets] = useState([]);
  const [salesMan,setSalesMan] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    market: [],
    salePersons: [],
    date: '',
    time: '',
    
  });

  
  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];
  const fetchData=async()=>{
    try {
      const response=await axios.get('https://apibiri.eazydevz.in/api/getMarket');
      setMarkets(response.data.market);
     
    } catch (error) {
      console.log(error);
    }
  }
  const fetchSalesPersonData=async()=>{
    try {
      const response=await axios.get('https://apibiri.eazydevz.in/api/getSalePerson');
      setSalesMan(response.data.salePerson);
     
    } catch (error) {
      console.log(error);
    }
  }
  const hanldePost=async()=>{
    const updateFormData={
      market:formData.market,
      salePersons:formData.salePersons,
      date:formData.date,
      time:formData.time,

    }
    
    
    try {
      const response=await axios.post('https://apibiri.eazydevz.in/api/dailySalePersonRegister',{data:updateFormData});
      toast.success(response.data.message);
      fetchData();
      setFormData({
        market:[],
        salePersons:[],
        date:'',
        time:''
      });
      //alert(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      
    }

  }
  const handleCount = () => {
    const newSaleArray = [...formData.market, { name: '' }];
    setFormData({
      ...formData,
      market: newSaleArray,
    });
  };
  const handleCount1 = () => {
    const newSaleArray = [...formData.salePersons, { name: '' }];
    setFormData({
      ...formData,
      salePersons: newSaleArray,
    });
  };

  const handleSalesChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSales = [...formData.market];
    updatedSales[index][name] = value;
    setFormData({
      ...formData,
      market: updatedSales,
    });
  };
  const handleSalesChange1 = (index, e) => {
    const { name, value } = e.target;
    const updatedSales = [...formData.salePersons];
    updatedSales[index][name] = value;
    setFormData({
      ...formData,
      salePersons: updatedSales,
    });
  };
  const handleEdit = (market) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
  };
  const handleDelete=async(id)=>{
    try {
      const response=await axios.delete(`https://apibiri.eazydevz.in/api/deleteMarket/${id}`);
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleSave = async(updatedMarket) => {
    try {
      const response = await axios.put(`https://apibiri.eazydevz.in/api/updateMarket/${updatedMarket._id}`, {data:updatedMarket});
      toast.success(response.data.message);
      fetchData();
      
    } catch (error) {
        toast.error(error.response.data.message);
    }
   
  };
  

  useEffect(() => {
    fetchData();
    fetchSalesPersonData()
  }, []);
  
  
  return (
    
    <div className='w-full h-full bg-[#DDDCDC] p-10 '>
     <form>
  <div className="space-y-5">
    <div className="border-b border-gray-900/10  p-10 text-center ">
      <span className="text-3xl font-semibold text-gray-900">Daily Sale Person</span>
    

     
    </div>
   

    <div className="border-b border-gray-900/10 pb-12">
     

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-6 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="marketName" className="block text-sm/6 font-medium text-gray-900">Market Name</label>
          <div className='sm:col-span-3 flex flex-row bg-[#F2F1F1] rounded-md shadow-lg p-10'>
                <div className='flex flex-row justify-end gap-5 items-center'>  
               
                <button
                     type="button"
                     className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                     onClick={handleCount}
                   >
                    Add <FaPlus /> 
                   </button>
                   </div>
               
               {formData.market.map((item, index) => (
                 <div
                   key={index}
                   className=" w-fit-content bg-[#F2F2F2]  rounded-md shadow-lg p-2 flex flex-row justify-between items-center"
                 >
                 {/* <h1>Sl No - {index+1}</h1> */}
                   <div className="mt-2">
                     {/* <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label> */}
                     <select
                       name="name"
                       id='name'
         
                       value={item.name}
                       onChange={(e) => handleSalesChange(index, e)}
                       className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                     >
                         <option value="" disabled selected hidden>Select Market</option>
                         {markets?.map((market) => (
                           <option key={market._id} value={market.marketName}>
                             {market.marketName}
                           </option>
                         ))}
                     </select>
                   </div>
         
         
                   
                  
                 </div>
               ))}
               </div>
        </div>
        <div className="sm:col-span-6 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="marketName" className="block text-sm/6 font-medium text-gray-900">Sale Person</label>
          <div className='sm:col-span-3 flex flex-row bg-[#F2F1F1] rounded-md shadow-lg p-10'>
                <div className='flex flex-row justify-end gap-5 items-center'>  
               
                <button
                     type="button"
                     className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                     onClick={handleCount1}
                   >
                    Add <FaPlus /> 
                   </button>
                   </div>
               
               {formData.salePersons.map((item, index) => (
                 <div
                   key={index}
                   className=" w-fit-content bg-[#F2F2F2]  rounded-md shadow-lg p-2 flex flex-row justify-between items-center"
                 >
                 {/* <h1>Sl No - {index+1}</h1> */}
                   <div className="mt-2">
                     {/* <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label> */}
                     <select
                       name="name"
                       id='name'
         
                       value={item.name}
                       onChange={(e) => handleSalesChange1(index, e)}
                       className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                     >
                         <option value="" disabled selected hidden>Select SalesMan</option>
                         {salesMan?.map((market) => (
                           <option key={market._id} value={market.name}>
                             {market.name}
                           </option>
                         ))}
                     </select>
                   </div>
         
         
                   
                  
                 </div>
               ))}
               </div>
        </div>
        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="phoneNo" className="block text-sm/6 font-medium text-gray-900">Date</label>
          <div className="mt-2">
          <input name="date" id="date" value={formData.date} type='date' onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>
        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="phoneNo" className="block text-sm/6 font-medium text-gray-900">Time</label>
          <div className="mt-2">
          <select name="time" id="time" value={formData.time} type='date' onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <option value="" disabled selected hidden>Select Timing</option>
          <option value="Morning" >Morning</option>
          <option value="Evening" >Evening</option>
          </select>
          </div>
        </div>

      
       

       

       

     

   

       

        

       
      </div>
    </div>

 
  </div>

  <div className="mt-4 flex items-center justify-center gap-x-6">
    {/* <button type="button" className="text-md font-semibold text-gray-900">Cancel</button> */}
    <button
  type="submit"
  className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  onClick={(e) => {
    e.preventDefault(); // ⛔ prevent default form submission
    hanldePost();       // ✅ call your post function
  }}
>
  Save
</button>

  </div>
</form>

    </div>
   
  );
};

export default DailySalePerson;