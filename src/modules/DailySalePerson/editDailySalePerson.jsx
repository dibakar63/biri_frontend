import React, { useState, useEffect, use } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import SalePerson from "../SalePerson/salePerson";

const EditDailyPersonModal = ({
  isOpen,
  onClose,
  onSave,
  market,
  marketData,salePersons
}) => {
  

  const [formData, setFormData] = useState({
    market:[],
    salePersons:[],
    date: '',
    time: '',
  });
  const formatDate=(isoDate)=>{
    
    const date = new Date(isoDate);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
      }

  useEffect(() => {
    if (market) {
      setFormData({ 
        
        market: market.market || [],
        salePersons: market.salePersons || [],
        date: market.date || "",
        time: market.time  || '',
       });
    }
  }, [market]);
  console.log(market,'market');
  console.log(formData,'formData');
 


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCount = () => {
    const newSaleArray = [
      ...formData.market,
      { name:"" },
    ];
    setFormData({
      ...formData,
      market: newSaleArray,
    });
  };
  const handleCount1 = () => {
    const newSaleArray = [
      ...formData.salePersons,
      { name:"" },
    ];
    setFormData({
      ...formData,
      salePersons: newSaleArray,
    });
  };
  const handleSaleChange = (index, e) => {
    const updatedSales = [...formData.market];
    updatedSales[index][e.target.name] = e.target.value;
    setFormData((prev) => ({ ...prev, market: updatedSales }));
  };
  const handleSaleChange1 = (index, e) => {
    const updatedSales = [...formData.salePersons];
    updatedSales[index][e.target.name] = e.target.value;
    setFormData((prev) => ({ ...prev, salePersons: updatedSales }));
  };
  const handleDeleteSale = (index) => {
    const updatedMarket = [...formData.market];
    updatedMarket.splice(index, 1); // remove the selected item
    setFormData((prev) => ({ ...prev, market: updatedMarket }));
  };
  const handleDeleteSale1 = (index) => {
    const updatedMarket = [...formData.salePersons];
    updatedMarket.splice(index, 1); // remove the selected item
    setFormData((prev) => ({ ...prev, salePersons: updatedMarket }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white p-6 rounded-xl shadow-lg">
        <span className="text-2xl text-center font-semibold mb-2">
          Edit Daily SalePerson Input
        </span>
        <div className="flex flex-col items-center justify-between w-full gap-2 p-2">
         
          <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center "></div>
          <div className="flex flex-col bg-[#F2F1F1] shadow-md  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
            <div className="flex flex-row justify-end gap-5 items-center">
                             <h1> Market Name</h1>
                             <button
                               type="button"
                               className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                               onClick={handleCount}
                             >
                               <FaPlus />
                             </button>
                           </div>
            {formData.market?.map((sale, index) => (
              <div
                className="flex flex-row justify-center gap-2 w-full p-2"
                key={index}
              >
                <div className="sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <select
                    name="name"
                    type="text"
                    id="name"
                    value={sale.name}
                    onChange={(e) => {
                      handleSaleChange(index, e);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                  >
                  {marketData?.map((product)=>(
                    <option key={product.marketName} value={product.marketName}>
                      {product.marketName}
                    </option>
                  ))}</select>
                </div>
               
               
                <button
                  onClick={() => handleDeleteSale(index)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col bg-[#F2F1F1] shadow-md  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
            <div className="flex flex-row justify-end gap-5 items-center">
                             <h1> Sale Perons</h1>
                             <button
                               type="button"
                               className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                               onClick={handleCount1}
                             >
                               <FaPlus />
                             </button>
                           </div>
            {formData.salePersons?.map((sale, index) => (
              <div
                className="flex flex-row justify-center gap-2 w-full p-2"
                key={index}
              >
                <div className="sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <select
                    name="name"
                    type="text"
                    id="name"
                    value={sale.name}
                    onChange={(e) => {
                      handleSaleChange1(index, e);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                  >
                  {salePersons?.map((product)=>(
                    <option key={product.name} value={product.name}>
                      {product.name}
                    </option>
                  ))}</select>
                </div>
               
               
                <button
                  onClick={() => handleDeleteSale1(index)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
            <div className="sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]">
              <label
                htmlFor="paid"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                name="date"
                type="date"
                id="date"
                value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </div>
            <div className="sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <select name="time" id="time" value={formData.time} type='text' onChange={handleChange}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <option value="" disabled selected hidden>Select Timing</option>
          <option value="Morning" >Morning</option>
          <option value="Evening" >Evening</option>
          </select>
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

export default EditDailyPersonModal;
