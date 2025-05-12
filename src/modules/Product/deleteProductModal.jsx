import React, { useState, useEffect, use } from 'react';
import { FaTrash } from 'react-icons/fa';

const DeleteProductModal = ({ isOpen, onClose, onSave, market,marketData,id,setId }) => {
  const [markets, setMarkets] = useState([]);
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
  const [formData, setFormData] = useState({
    name: '',
        phoneNo: '',
        address: '',
        market: '',
        saleArray: [],
        dueAmount:0,
        weeklySale:"",
        potentialCustomer:false,
        businessType:""
  });
 

  
  

  const handleSubmit = () => {
    onSave(id);
    onClose();
  };
  const handleClose = () => {
    onClose();
    setId(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl text-center font-semibold mb-2">Delete Product {market.name}?</span>
        </div>

       
       
          
      
       

         
         
          
         
         
       


        <div className=" flex justify-center items-center gap-5 space-x-3">
         
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Yes
          </button>
           <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-red-500 hover:bg-red-800 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
