import React, { useState, useEffect } from 'react';

const EditProductModal = ({ isOpen, onClose, onSave, market }) => {
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
    name:"",
    type:"",
    code:"",
  });

  useEffect(() => {
    if (market) {
      setFormData({ ...market });
    }
  }, [market]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-1/2 relative">
        <span className="text-2xl text-center font-semibold mb-4">Edit Market</span>

        <div className="space-y-3 mt-6">
        <div className='flex flex-row gap-2 justify-between'>
        <label for="name" className="text-sm/6 w-100 p-3 text-center bg-indigo-600 rounded font-medium text-white">Name </label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e)=>handleChange(e)}
            className="w-full border px-3 py-2 rounded"
          />
          </div>
          <div className='flex flex-row gap-2 justify-between'>
        <label for="marketName" className="text-sm/6 w-100 p-3 text-center bg-indigo-600 rounded font-medium text-white">Product Type</label>
        <input
            type="text"
            name="type"
            placeholder="Product Type"
            value={formData.type}
            onChange={(e)=>handleChange(e)}
            className="w-full border px-3 py-2 rounded"
          />
          </div>
          <div className='flex flex-row gap-2 justify-between'>
        <label for="marketName" className="text-sm/6 w-100 p-3 text-center bg-indigo-600 rounded font-medium text-white">Product Code</label>
        <input
            type="text"
            name="code"
            placeholder="Product Code"
            value={formData.code}
            onChange={(e)=>handleChange(e)}
            className="w-full border px-3 py-2 rounded"
          />
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
