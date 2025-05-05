import React, { useState, useEffect, use } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const EditCustomerDailyInputModal = ({
  isOpen,
  onClose,
  onSave,
  market,
  customerName,productData
}) => {
  

  const [formData, setFormData] = useState({
    name: "",

    sale: [],
    due: 0,
    paid: 0,
  });

  useEffect(() => {
    if (market) {
      setFormData({ 
        
        name: market.name || "",
        sale: market.sale || [],
        due: market.due || null,
        paid: market.paid  || null,
       });
    }
  }, [market]);
  console.log(formData,"formData");
  console.log(customerName,"customerName");
  console.log(productData,"productData");


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCount = () => {
    const newSaleArray = [
      ...formData.sale,
      { productCode: "", quantity: null, unit: "packet" },
    ];
    setFormData({
      ...formData,
      sale: newSaleArray,
    });
  };
  const handleSaleChange = (index, e) => {
    const updatedSales = [...formData.sale];
    updatedSales[index][e.target.name] = e.target.value;
    setFormData((prev) => ({ ...prev, sale: updatedSales }));
  };
  const handleDeleteSale = (index) => {
    const updatedMarket = [...formData.sale];
    updatedMarket.splice(index, 1); // remove the selected item
    setFormData((prev) => ({ ...prev, sale: updatedMarket }));
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
          Edit Customer Daily Input
        </span>
        <div className="flex flex-col items-center justify-between w-full gap-2 p-2">
          <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
            <div className="sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Name
              </label>
              <select
                name="name"
                id="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              >
               
                {customerName.map((market, index) => (
                  <option key={index} value={market.name}>
                    {market.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center "></div>
          <div className="flex flex-col bg-[#F2F1F1] shadow-md  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
            <div className="flex flex-row justify-end gap-5 items-center">
                             <h1>Sale</h1>
                             <button
                               type="button"
                               className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                               onClick={handleCount}
                             >
                               <FaPlus />
                             </button>
                           </div>
            {formData.sale.map((sale, index) => (
              <div
                className="flex flex-row justify-between w-full p-2"
                key={index}
              >
                <div className="sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]">
                  <label
                    htmlFor="productCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Code
                  </label>
                  <select
                    name="productCode"
                    type="text"
                    id="productCode"
                    value={sale.productCode}
                    onChange={(e) => {
                      handleSaleChange(index, e);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                  >
                  {productData?.map((product)=>(
                    <option key={product.code} value={product.code}>
                      {product.code}
                    </option>
                  ))}</select>
                </div>
                <div className="sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Qty
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    id="quantity"
                    value={sale.quantity}
                    onChange={(e) => {
                      handleSaleChange(index, e);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                  />
                </div>
                <div className="sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]">
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    name="unit"
                    type="text"
                    id="unit"
                    value={sale.unit}
                    onChange={(e) => {
                      handleSaleChange(index, e);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                  />
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
          <div className="flex flex-row  mt-2 w-full justify-evenly p-4 gap-4 items-center ">
            <div className="sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]">
              <label
                htmlFor="paid"
                className="block text-sm font-medium text-gray-700"
              >
                Paid
              </label>
              <input
                name="paid"
                type="number"
                id="paid"
                value={formData.paid}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </div>
            <div className="sm:col-span-3 p-4 bg-[#F2F1F1] w-[47%]">
              <label
                htmlFor="due"
                className="block text-sm font-medium text-gray-700"
              >
                Due
              </label>
              <input
                name="due"
                type="number"
                id="due"
                value={formData.due}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
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

export default EditCustomerDailyInputModal;
