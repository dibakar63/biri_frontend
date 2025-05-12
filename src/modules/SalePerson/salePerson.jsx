import axios from 'axios';
import React,{ useState,useEffect} from 'react';
import toast from 'react-hot-toast';
import EditSalePersonModal from './editSalePerson';
import Cookie from 'js-cookie'
import { FaPlus, FaTrash, } from 'react-icons/fa';
import {  } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import DeleteSalePersonModal from './deleteSalePerson';

const SalePerson = () => {
  const token=Cookie.get('token');
  const [products,setProducts] = useState([]);
  const [markets,setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId,setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    phoneNo:"",
    address:"",
    market:[]
    
  });

  
  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCount = () => {
    const newSaleArray = [...formData.market, { name: '' }];
    setFormData({
      ...formData,
      market: newSaleArray,
    });
  };
     const handleDeleteOpen=(market)=>{
      setDeleteId(market._id)
     setSelectedMarket(market);
    setDeleteModalOpen(true);
  }

  const handleSalesChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSales = [...formData.market];
    updatedSales[index][name] = value;
    setFormData({
      ...formData,
      market: updatedSales,
    });
  };
    const handleDeleteSale = (index) => {
    const updatedMarket = [...formData.market];
    updatedMarket.splice(index, 1); // remove the selected item
  
    setFormData((prev) => ({ ...prev, market: updatedMarket }));
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
      const response=await axios.get('https://apibiri.eazydevz.in/api/getSalePerson');
      setProducts(response.data.salePerson);
     
    } catch (error) {
      console.log(error);
    }
  }
  const fetchMarketData=async()=>{
    try {
      const response=await axios.get('https://apibiri.eazydevz.in/api/getMarket');
      setMarkets(response.data.market);
     
    } catch (error) {
      console.log(error);
    }
  }
  const hanldePost=async()=>{
    const updateFormData={
      name:formData.name,
      phoneNo:formData.phoneNo,
      address:formData.address,
      market:formData.market,
      

    }
    
    
    try {
      const response=await axios.post('https://apibiri.eazydevz.in/api/salePersonRegister',{data:updateFormData});
      toast.success(response.data.message);
      fetchData();
      setFormData({
       name:'',
        phoneNo:'',
        address:'',
        market:[]
      });
      //alert(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      
    }

  }
  const handleEdit = (market) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
  };
  const handleDelete=async(id)=>{
    try {
      const response=await axios.delete(`https://apibiri.eazydevz.in/api/deleteSalePerson/${id}`);
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleSave = async(updatedMarket) => {
    try {
      const response = await axios.put(`https://apibiri.eazydevz.in/api/updateSalePerson/${updatedMarket._id}`, {data:updatedMarket});
      toast.success(response.data.message);
      fetchData();
      
    } catch (error) {
        toast.error(error.response.data.message);
    }
   
  };
  

  useEffect(() => {
    fetchData();
    fetchMarketData();
  }, []);
  
  
  return (
    
    <div className='w-full h-full bg-[#DDDCDC] p-10 '>
     <form>
  <div className="space-y-5">
    <div className="border-b border-gray-900/10  p-10 text-center ">
      <span className="text-3xl font-semibold text-gray-900">Sale Person Register</span>
    

     
    </div>
    <EditSalePersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        market={selectedMarket}
      />
       <DeleteSalePersonModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSave={()=>handleDelete(deleteId)}
        market={selectedMarket}
        id={deleteId}
        setId={setDeleteId}
      />

    <div className="border-b border-gray-900/10 pb-12">
     

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
          <div className="mt-2">
            <input type="text" name="name" id="name" value={formData.name} onChange={(e)=>{handleInputChange(e)}} autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>

        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="phoneNo" className="block text-sm/6 font-medium text-gray-900">Phone</label>
          <div className="mt-2">
          <input name="phoneNo" id="phoneNo" value={formData.phoneNo} onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>
        <div className="sm:col-span-2 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="adddress" className="block text-sm/6 font-medium text-gray-900">Address</label>
          <div className="mt-2">
            <input type="address" name="address" id="address"  value={formData.address} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>
        <div className='sm:col-span-4 flex flex-row bg-[#F2F1F1] rounded-md shadow-lg p-10'>
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
          <div className="mt-2 relative">
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
             <button className='absolute top-0 right-0 cursor-pointer text-red-500 hover:text-red-700  text-3xl' onClick={()=>handleDeleteSale(index)}><IoMdClose/></button>
           
          </div>
          
           
          


          
         
        </div>
      ))}
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
<div className="p-6">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Market</th>
              
              <th className="px-6 py-3 text-left text-sm font-semibold">Edit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products?.map((market, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.phoneNo}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.address}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.market.map((markets)=>(markets.name+" , "))}</td>
               
                <td className="px-6 py-4 text-md text-gray-900"><button className='bg-green-500 p-2 rounded-md text-white' onClick={()=>handleEdit(market)}>Edit</button></td>
                <td className="px-6 py-4 text-md text-gray-900"><button className='bg-red-500 p-2 text-md rounded-md text-white' onClick={()=>handleDeleteOpen(market)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {products?.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">No Product data found.</div>
        )}
      </div>
    </div>

    </div>
   
  );
};

export default SalePerson;