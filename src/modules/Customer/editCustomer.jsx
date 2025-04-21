import React, { useState, useEffect, use } from 'react';

const EditCustomerModal = ({ isOpen, onClose, onSave, market,marketData }) => {
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
  const fetchData=async()=>{
    try {
      const response=await axios.get('https://apibiri.eazydevz.in/api/getMarket');
      setMarkets(response.data.market);
     
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (market) {
      setFormData({ ...market });
    }
   
  }, [market]);
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSaleChange = (index, e) => {
    const updatedSales = [...formData.saleArray];
    updatedSales[index][e.target.name] = e.target.value;
    setFormData((prev) => ({ ...prev, saleArray: updatedSales }));
  };
  

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white p-6 rounded-xl shadow-lg">
        <span className="text-2xl text-center font-semibold mb-2">Edit Market</span>
        <div className='flex flex-col items-center justify-between w-full gap-2 p-2'>

        <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
        <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input name='name' type="text" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" />

        </div>
        <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea name='address' type="text" id="address" value={formData.address} onChange={handleChange} rows={2} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" />

        </div>

        </div>
        <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
        <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">PhoneNo</label>
          <input name='phoneNo' type="text" id="phoneNo" value={formData.phoneNo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" />

        </div>
        <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="market" className="block text-sm font-medium text-gray-700">Market</label>
          <select name='market' type="text" id="market" value={formData.market} onChange={handleChange}  className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" >
          <option value="" disabled selected hidden>Select Market</option>
          {marketData.map((market, index) => (
            <option key={index} value={market.marketName}>
              {market.marketName}
            </option>
          ))}

          </select>

        </div>

        </div>
        <div className="flex flex-col bg-[#F2F1F1] shadow-md  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
        <h1 className='text-center'>Opponent Sales</h1>
        {formData.saleArray.map((sale,index)=>(
          <div className='flex flex-row justify-between w-full p-2' key={index}>
          <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input name='name' type="text" id="name" value={sale.name} onChange={(e)=>{handleSaleChange(index,e)}} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" />

        </div>
        <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Qty</label>
          <input name='quantity' type="text" id="quantity" value={sale.quantity} onChange={(e)=>{handleSaleChange(index,e)}} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" />

        </div>
        <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Name</label>
          <input name='unit' type="text" id="unit" value={sale.unit} onChange={(e)=>{handleSaleChange(index,e)}} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" />

        </div>
        
          </div>
        ))}
      

        </div>
        <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
        <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="dueAmount" className="block text-sm font-medium text-gray-700">Due Amount</label>
          <input name='dueAmount' type="number" id="dueAmount" value={formData.dueAmount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" />

        </div>
        <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="weeklySale" className="block text-sm font-medium text-gray-700">Weekly Sale</label>
          <input name='weeklySale' type="number" id="weeklySale" value={formData.weeklySale} onChange={handleChange}  className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" />

        </div>

        </div>
        <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
        
        <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="potentialCustomer" className="block text-sm font-medium text-gray-700">Potential Customer</label>
          <select name='potentialCustomer' type="text" id="market" value={formData.potentialCustomer} onChange={handleChange}  className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" >
          <option value="" disabled selected hidden>Select Yes or No</option>
          
            <option  value={true}>
              Yes
            </option>
            <option  value={false}>
              No
            </option>
         

          </select>

        </div>
        <div className='sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]'>
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">Business Type</label>
          <select name='businessType' type="text" id="businessType" value={formData.businessType} onChange={handleChange}  className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" >
          <option value="" disabled selected hidden>Select BusinessType</option>
          
          <option value="Retail">Retail</option>
          <option value="Wholesale">Wholesale</option>
         

          </select>

        </div>

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

export default EditCustomerModal;
