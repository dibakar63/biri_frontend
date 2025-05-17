import React, { useState, useEffect, use } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import SalePerson from "../SalePerson/salePerson";
import toast from "react-hot-toast";
import axios from "axios";
const CustomerPaymentModal = ({
  isOpen,
  onClose,
  
  market,
  customerName,
  paymentData,dueData
}) => {
  

  const [formData, setFormData] = useState({
    name:'',
    market:'',
    paidAmount: 0,
    
  });
 

  useEffect(() => {
    
      setFormData({ 
        
        market: market || '',
        name: customerName || '',
        
       
    })
  }, [market,customerName]);
 
 


  const handleChange = (e) => {
    const { name, value,type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };
  

  const handleSubmit = async() => {
    const updatedData={
        market: formData.market,
        name: formData.name,
        paidAmount: formData.paidAmount,

      }
    
    try {
        const response=await axios.post(`https://apibiri.eazydevz.in/api/customerPyament`,{data:updatedData});
        toast.success(response.data.message);
        paymentData()
        dueData()
        onClose();
        
    } catch (error) {
        if(error.response.status===404){
            toast.error(error.response.data.message);
        }else{
            toast.error(error.response.data.message);
        }
    }
    }
       const handleClose=()=>{
        onClose();
       }


   

   
  

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white p-6 rounded-xl shadow-lg">
        <span className="text-2xl text-center font-semibold mb-2">
          Add Payment {customerName}
        </span>
        <div className="flex flex-col items-center justify-between w-full gap-2 p-2">
         
          <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center "></div>
          
        
          <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
            <div className="sm:col-span-2 p-4 bg-[#F2F1F1] w-[47%]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                value={formData.name}
                onChange={(e)=>{handleChange(e)}}
                className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </div>
            <div className="sm:col-span-2 p-4 bg-[#F2F1F1] w-[47%]">
              <label
                htmlFor="Market"
                className="block text-sm font-medium text-gray-700"
              >
                Market
              </label>
              <input name="market" id="market" value={formData.market} type='text' onChange={(e)=>{handleChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          
            </div>
             <div className="sm:col-span-2 p-4 bg-[#F2F1F1] w-[47%]">
              <label
                htmlFor="Paidamount"
                className="block text-sm font-medium text-gray-700"
              >
                Paid Amount
              </label>
              <input name="paidAmount" type='number' id="paidAmount" value={formData.paidAmount}  onChange={(e)=>{handleChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          
            </div>
          </div>
          <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center "></div>
        </div>

        <div className="mt-5 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={()=>handleSubmit()}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPaymentModal;
