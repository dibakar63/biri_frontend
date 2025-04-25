import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const EditProductModal = ({ isOpen, onClose, onSave, market }) => {
    
  const [formData, setFormData] = useState({
    name:"",
    phoneNo:"",
    address:"",
    market:[]
  });

  useEffect(() => {
    if (market) {
      setFormData({ ...market });
    }
  }, [market]);
  const handleSaleChange = (index, e) => {
    const updatedSales = [...formData.market];
    updatedSales[index][e.target.name] = e.target.value;
    setFormData((prev) => ({ ...prev, market: updatedSales }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDeleteSale = (index) => {
    const updatedMarket = [...formData.market];
    updatedMarket.splice(index, 1); // remove the selected item
    setFormData((prev) => ({ ...prev, market: updatedMarket }));
  };
  

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-1/2 relative">
        <span className="text-2xl text-center font-semibold mb-4">Edit Sale Person</span>

        <div className="space-y-3 mt-6">
        <div className='flex flex-row gap-2 justify-between'>
        <label for="name" className="text-sm/6 w-100 p-3 text-center bg-indigo-600 rounded font-medium text-white">Name </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e)=>handleChange(e)}
            className="w-full border px-3 py-2 rounded"
          />
          </div>
          <div className='flex flex-row gap-2 justify-between'>
        <label for="marketName" className="text-sm/6 w-100 p-3 text-center bg-indigo-600 rounded font-medium text-white">Phone</label>
        <input
            type="text"
            name="phoneNo"
            placeholder="Phone No"
            value={formData.phoneNo}
            onChange={(e)=>handleChange(e)}
            className="w-full border px-3 py-2 rounded"
          />
          </div>
          <div className='flex flex-row gap-2 justify-between'>
        <label for="marketName" className="text-sm/6 w-100 p-3 text-center bg-indigo-600 rounded font-medium text-white">Address</label>
        <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={(e)=>handleChange(e)}
            className="w-full border px-3 py-2 rounded"
          />
          </div>
          <div className="flex flex-row bg-[#F2F1F1] shadow-md  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
        <h1 className='text-sm/6 w-100 p-3 text-center bg-indigo-600 rounded font-medium text-white'>Markets</h1>
        {formData.market.map((sale,index)=>(
          <div className='flex flex-row justify-between w-full p-2' key={index}>
          <div className='sm:col-span-3 flex flex-row gap-2 p-4 bg-[#F2F1F1] w-fit-content'>
         
          <input name='name' type="text" id="name" value={sale.name} onChange={(e)=>{handleSaleChange(index,e)}} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" />
          <button onClick={()=>handleDeleteSale(index)} className='bg-red-500 text-white p-2 rounded-md'><FaTrash/></button>

        </div>
      
      
        
          </div>
        ))}
      

        </div>
         
         

         
         
          
         
         
        </div>

        <div className="mt-5 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
