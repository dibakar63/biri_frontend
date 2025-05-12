import axios from "axios";
import React, { use, useState, useEffect } from "react";
import toast from "react-hot-toast";

import Cookie from "js-cookie";
import { FaMinus, FaPlus } from "react-icons/fa";

const DailyCustomerInput = () => {
  const token = Cookie.get("token");
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marketName,setMarketName]=useState([]);
  const [formData, setFormData] = useState({
    name: "",

    sale: [{ productCode: "", quantity: null, unit: "packet" }],
    due: null,
    paid: null,
  });

  const handleInputChange = (e) => {
    const { name, value,type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: val,
    });
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

  const handleSalesChange = (index, e) => {
    const { name, value ,type} = e.target;
    const val = type === 'number' ? Number(value) : value;
    const updatedSales = [...formData.sale];
    updatedSales[index][name] = val;
    setFormData({
      ...formData,
      sale: updatedSales,
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apibiri.eazydevz.in/api/getCustomerByMarket?market=${marketName}`,
      );
      setCustomers(response.data.customer);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(`No Customer Found in ${marketName}`);
      } else {
        console.log(error);
      }
    }
  };
  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        "https://apibiri.eazydevz.in/api/getProduct"
      );
      setProducts(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };
    const fetchMarketData=async()=>{
    try {
      const response=await axios.get('https://apibiri.eazydevz.in/api/getMarket');
      setMarkets(response.data.market);
     
    } catch (error) {
      console.log(error);
    }
  }

  const hanldePost = async () => {
    const updateFormData = {
      name: formData.name,
      sale: formData.sale,
      paid: formData.paid,
      due: formData.due,
    };

    try {
      const response = await axios.post(
        "https://apibiri.eazydevz.in/api/customerDailyInputRegister",
        { data: updateFormData }
      );
      toast.success(response.data.message);
      fetchData();
      setFormData({
        name: "",
        sale: [],
        paid: null,
        due: null,
      });
      //alert(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleEdit = (market) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://apibiri.eazydevz.in/api/deleteCustomer/${id}`
      );
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSave = async (updatedMarket) => {
    try {
      const response = await axios.put(
        `https://apibiri.eazydevz.in/api/updateCustomer/${updatedMarket._id}`,
        { data: updatedMarket }
      );
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProductData()
    fetchMarketData();
   
  }, []);
  useEffect(()=>{
    fetchData();
  },[marketName])

  return (
    <div className="w-full h-full bg-[#DDDCDC] p-10 ">
      <div className="p-2">
        <form>
          <div className="space-y-5">
            <div className="border-b border-gray-900/10  p-10 text-center ">
              <span className="text-3xl font-semibold text-gray-900">
                Customer Daily Input
              </span>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
               
              

              <div className="sm:col-span-6 bg-[#F2F1F1] rounded-md shadow-lg p-2">
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

                {formData.sale.map((item, index) => (
                  <div
                    key={index}
                    className="sm:col-span-6 bg-[#F2F2F2] rounded-md shadow-lg p-10 flex flex-row justify-between items-center"
                  >
                    <h1>Sl No - {index + 1}</h1>
                    <div className="mt-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <select
                        name="productCode"
                        value={item.productCode}
                        onChange={(e) => handleSalesChange(index, e)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product._id} value={product.code}>
                            {product.code}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-2">
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Qty
                      </label>
                      <input
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleSalesChange(index, e)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      />
                    </div>

                    <div className="mt-2">
                      <label
                        htmlFor="unit"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Unit
                      </label>
                      <input
                        name="unit"
                        value={item.unit}
                        onChange={(e) => handleSalesChange(index, e)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
               <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
                
                <div className="mt-2" >
                <label htmlFor="marketName" className="block text-sm font-medium text-gray-900">Market </label>
                  <select
                    name="marketName"
                    
                    id="marketName"
                    value={marketName}
                    onChange={(e) => setMarketName(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="">Select Market</option>
                    {markets.map((market) => (
                      <option key={market._id} value={market.marketName}>
                        {market.marketName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
                  <label
                    for="name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <select
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      autocomplete="given-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option value="">Select Customer</option>
                      {customers.map((customer) => (
                        <option key={customer._id} value={customer.name}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
                <label
                  for="paid"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Paid
                </label>
                <div className="mt-2">
                  <input
                    name="paid"
                    type="number"
                    id="paid"
                    value={formData.paid}
                    onChange={(e) => handleInputChange(e)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
                <label
                  for="due"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Due
                </label>
                <div className="mt-2">
                  <input
                    name="due"
                    type="number"
                    id="due"
                    value={formData.due}
                    onChange={(e) => handleInputChange(e)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
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
                hanldePost(); // ✅ call your post function
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DailyCustomerInput;
