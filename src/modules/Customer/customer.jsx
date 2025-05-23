import axios from 'axios';
import React,{use, useState,useEffect} from 'react';
import toast from 'react-hot-toast';
import EditCustomerModal from './editCustomer';
import Cookie from 'js-cookie'
import { FaMinus, FaPlus,FaTrash } from 'react-icons/fa';
import OpenCustomerModal from './customerModal';
import DeleteCustomerModal from './deleteModal';
import { useSelector } from 'react-redux';


const Customer = () => {
  const token=Cookie.get('token');
  const [customers,setCustomers] = useState([]);
  const [count,setCount] = useState(1);
  const [imageKey, setImageKey] = useState('');
  const [markets,setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [selectedFile,setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId,setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    address: '',
    market: '',
    saleArray:  [{ name: '', quantity: null, unit: 'packet' }],
    dueAmount:null,
    weeklySale:"",
    potentialCustomer:false,
    businessType:"",
    key:'',
    businessName:''
  });
  const [marketFilter, setMarketFilter] = useState({
    marketName:'',
    customerName:'',
  }); 
   const businessName = useSelector((state) => state.business.businessName);


  
  const handleInputChange = (e) => {
    
    const { name, value,type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };
  const hadleFilterChange=(e)=>{
    const {name,value}=e.target;
    setMarketFilter({
      ...marketFilter,
      [name]:value
    })
  }
  const handleCount = () => {
    const newSaleArray = [...formData.saleArray, { name: '', quantity: null, unit: 'packet' }];
    setFormData({
      ...formData,
      saleArray: newSaleArray,
    });
  };
  const handlePost = async (base64Image) => {
    try {
      setUploading(true);
  
      // Convert base64 to Blob
      const base64ToBlob = (base64) => {
        const byteString = atob(base64.split(',')[1]);
        const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
      };
  
      const imageBlob = base64ToBlob(base64Image);
      const formData = new FormData();
      formData.append('image', imageBlob);
  
      const response = await axios.post(
        "https://apibiri.eazydevz.in/images",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const data = response.data;
  
      setFormData((prev) => ({
        ...prev,
        key: data.key,
      }));
      setImageKey(data.key);
  
      toast.success("Image uploaded successfully");
      console.log(data, 'Upload response');
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      handlePost(base64Image);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSalesChange = (index, e) => {
    const { name, value,type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    const updatedSales = [...formData.saleArray];
    updatedSales[index][name] = val;
    setFormData({
      ...formData,
      saleArray: updatedSales,
    });
  };
    const handleDeleteSale = (index) => {
    const updatedMarket = [...formData.saleArray];
    updatedMarket.splice(index, 1); // remove the selected item
    setFormData((prev) => ({ ...prev, saleArray: updatedMarket }));
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
  // const fetchData=async()=>{
  //   try {
  //     const response=await axios.get('https://apibiri.eazydevz.in/api/getCustomer');
  //     setCustomers(response.data.customer);
     
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const clearMarketName=()=>{
    setMarketFilter({
      ...marketFilter,
      marketName:''
    })
  }
  const customerFilter =()=>{
    setMarketFilter({
      ...marketFilter,
      customerName:''
    })
  }
  const fetchData = async () => {
    const marketName=marketFilter.marketName;
    const customerName=marketFilter.customerName;
    try {
      const response = await axios.get(`https://apibiri.eazydevz.in/api/getCustomerByMarket?market=${marketName}&name=${customerName}&businessName=${businessName}`);
      const rooms = response.data.customer;
  
      // Map over rooms and fetch images dynamically
      const updatedRooms = await Promise.all(
        rooms.map(async (room) => { 
          
          if (room.key) {
            const imageResponse = await axios.get(`https://apibiri.eazydevz.in/image?key=${room.key}`, {
               // Assuming image is returned as a blob
            });
  
            // Create a URL for the image blob
            room.imageUrl = imageResponse.data;
          } else {
            room.imageUrl = null; // Handle cases where image is missing
          }
          return room;
        })
      );
  
      console.log(updatedRooms, 'updatedRooms');
      setCustomers(updatedRooms);
    } catch (error) {
      if(error.response && error.response.status === 404) {
       // toast.error(`Customer not found`);
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };
  console.log(customers, 'customers');
  const fetchMarketData=async()=>{
    try {
      const response=await axios.get(`https://apibiri.eazydevz.in/api/getMarket?businessName=${businessName}`);
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
      saleArray:formData.saleArray,
      dueAmount:formData.dueAmount,
      weeklySale:formData.weeklySale,
      potentialCustomer:formData.potentialCustomer,
      businessType:formData.businessType,
      key:imageKey,
      businessName:businessName

    }
    
    
    try {
      const response=await axios.post('https://apibiri.eazydevz.in/api/customerRegister',{data:updateFormData});
      toast.success(response.data.message);
      fetchData();
      setFormData({
        name: '',
        phoneNo: '',
        address: '',
        market: '',
        saleArray: [],
        dueAmount:null,
        weeklySale:"",
        potentialCustomer:false,
        businessType:"",
        key:"",
        businessName:businessName
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
  const handleOpen=(market)=>{
    setSelectedMarket(market);
    setIsModalOpen1(true);
  }

    const handleDeleteOpen=(market)=>{
      setDeleteId(market._id)
     setSelectedMarket(market);
    setDeleteModalOpen(true);
  }
  const handleDelete=async(id)=>{
    try {
      const response=await axios.delete(`https://apibiri.eazydevz.in/api/deleteCustomer/${id}`);
      toast.success(response.data.message);
      setDeleteId(null);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleSave = async(updatedMarket) => {
    try {
      const response = await axios.put(`https://apibiri.eazydevz.in/api/updateCustomer/${updatedMarket._id}`, {data:updatedMarket});
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
  useEffect(()=>{
    fetchData();
  },[marketFilter.marketName,marketFilter.customerName,businessName])
  useEffect(()=>{
    fetchData();
    fetchMarketData();
  },[businessName])
  
  
  return (
    
    <div className='w-full h-full bg-[#DDDCDC] p-10 '>
    <div className='p-2'>
     <form>
  <div className="space-y-5">
    <div className="border-b border-gray-900/10  p-10 text-center ">
      <span className="text-3xl font-semibold text-gray-900">Customer Register</span>
    

     
    </div>
    <EditCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        market={selectedMarket}
        marketData={markets}
      />
      <OpenCustomerModal
          isOpen={isModalOpen1}
        onClose={() => setIsModalOpen1(false)}
        onSave={handleSave}
        market={selectedMarket}
        marketData={markets}

      />
      <DeleteCustomerModal
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
          <label for="marketName" className="block text-sm/6 font-medium text-gray-900">Name</label>
          <div className="mt-2">
            <input type="text" name="name" id="name" value={formData.name} onChange={(e)=>{handleInputChange(e)}} autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>

        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="marketAddress" className="block text-sm/6 font-medium text-gray-900">Address</label>
          <div className="mt-2">
          <textarea name="address" id="address" value={formData.address} onChange={(e)=>{handleInputChange(e)}} rows="3" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
          </div>
        </div>
        <div className="sm:col-span-2 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="marketAddress" className="block text-sm/6 font-medium text-gray-900">PhoneNo</label> 

          <div className="mt-2">
          <input name="phoneNo" id="phoneNo" value={formData.phoneNo} onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>
        <div className="sm:col-span-2 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="marketCity" className="block text-sm/6 font-medium text-gray-900">Market City/Village</label>
          <div className="mt-2">
            <select type="text" name="market" id="market" placeholer='Select Market'  value={formData.market} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="" disabled selected hidden>
    Select Market
  </option>
            {markets?.map((market, index) => (
              <option key={index} value={market.marketName}>
                {market.marketName}
              </option>
            ))}
            </select>
          </div>
        </div>
        <div className="sm:col-span-2 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="marketCity" className="block text-sm/6 font-medium text-gray-900">Image Upload</label>
          <div className="mt-2">
            <input type="file" name="key" id="key"   onChange={(e)=>handleFileChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
           
          </div>
        </div>
        
       <div className='sm:col-span-6 bg-[#F2F1F1] rounded-md shadow-lg p-10'>
       <div className='flex flex-row justify-end gap-5 items-center'>  
       <h1>Opponent Sales Array</h1>
       <button
            type="button"
            className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCount}
          >
            <FaPlus /> 
          </button>
          </div>
      
      {formData.saleArray.map((item, index) => (
        <div
          key={index}
          className="sm:col-span-6 bg-[#F2F2F2] rounded-md shadow-lg p-10 flex flex-row justify-between items-center"
        >
        <h1>Sl No - {index+1}</h1>
          <div className="mt-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
            <input
              name="name"
              value={item.name}
              onChange={(e) => handleSalesChange(index, e)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="mt-2">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-900">Qty</label>
            <input
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleSalesChange(index, e)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="mt-2">
            <label htmlFor="unit" className="block text-sm font-medium text-gray-900">Unit</label>
            <input
              name="unit"
              value={item.unit}
              onChange={(e) => handleSalesChange(index, e)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
           <button onClick={()=>handleDeleteSale(index)} className='bg-red-500 text-white p-2 rounded-md'><FaTrash/></button>

          
         
        </div>
      ))}
      </div>
    

        <div className="sm:col-span-2 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="dueAmount" className="block text-sm/6 font-medium text-gray-900">Due Amount</label>
          <div className="mt-2">
          <input name="dueAmount" type='number' id="dueAmount" value={formData.dueAmount} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
        </div>
        <div className="sm:col-span-2 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="weeklySale" className="block text-sm/6 font-medium text-gray-900">Weekly Sale</label>
          <div className="mt-2">
          <input name="weeklySale" id="weeklySale" type='number' value={formData.weeklySale} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
        </div>
        {/* <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="potentialCustomer" className="block text-sm/6 font-medium text-gray-900">Potential Customer</label>
          <div className="mt-2">
          <select name="potentialCustomer" id="potentialCustomer"   value={formData.potentialCustomer} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <option value="" disabled selected hidden>
                             Select Yes or No
          </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        </div> */}
        <div className="sm:col-span-2 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="businessType" className="block text-sm/6 font-medium text-gray-900">BusinessType</label>
          <div className="mt-2">
          <select name="businessType" id="businessType" placeholer='Select Businesstype'  value={formData.businessType} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <option value="" disabled selected hidden>
    Select Business Type
  </option>
            <option value="Retail">Retail</option>
            <option value="Wholesale">Wholesale</option>
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



<div className="p-1">
  <div className="rounded-lg shadow bg-white">
  <div className='flex flex-row justify-cenetr items-ceenter mt-2 gap-3'>
  <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="marketName" className="block text-sm/6 font-medium text-gray-900">Select Market</label>
          <div className="mt-2">
            <select type="text" name="marketName" id="marketName" placeholer='Select Market'  value={marketFilter.marketName} onChange={(e)=>hadleFilterChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="" onCLick={clearMarketName}>
    All
  </option>
            {markets?.map((market, index) => (
              <option key={index} value={market.marketName}>
                {market.marketName}
              </option>
            ))}
            </select>
          </div>
        </div>
        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="customerName" className="block text-sm/6 font-medium text-gray-900">Select Customer</label>
          <div className="mt-2">
            <select type="text" name="customerName" id="customerName" placeholer='Select Customer'  value={marketFilter.customerName} onChange={(e)=>hadleFilterChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="" onclick={customerFilter} >
    All
  </option>
            {customers?.map((market, index) => (
              <option key={index} value={market.name}>
                {market.name}
              </option>
            ))}
            </select>
          </div>
        </div>
  </div>
    {/* Scrollable table wrapper */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-2 py-3 text-left text-xsm font-semibold">#</th>
            <th className="px-2 py-3 text-left text-xsm font-semibold">Name</th>
            <th className="px-2 py-3 text-left text-xsm font-semibold">Address</th>
            <th className="px-2 py-3 text-left text-xsm font-semibold">Phone</th>
            <th className="px-2 py-3 text-left text-xsm font-semibold">Image</th>
            <th className="px-2 py-3 text-left text-xsm font-semibold">Market</th>
            <th className="px-2 py-3 text-left text-xsm font-semibold">Open</th>
           
            <th className="px-2 py-3 text-left text-xsm font-semibold">Edit</th>
            <th className="px-2 py-3 text-left text-xsm font-semibold">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {customers?.map((market, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-2 py-4 text-xsm text-gray-900">{index + 1}</td>
              <td className="px-2 py-4 text-xsm text-gray-900">{market.name}</td>
              <td className="px-2 py-4 text-xsm text-gray-900">{market.address}</td>
              <td className="px-2 py-4 text-xsm text-gray-900">{market.phoneNo}</td>
              <td className="px-2 py-4 text-xsm text-gray-900 w-30 h-30"><img src={market.imageUrl} /></td>

              <td className="px-2 py-4 text-xsm text-gray-900">{market.market}</td>
              {/* <td className="px-2 py-4 text-xsm text-gray-900">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-indigo-600 text-white">
                      <tr>
                        <th className="px-2 py-3 text-left text-xsm font-semibold">Name</th>
                        <th className="px-2 py-3 text-left text-xsm font-semibold">Qty</th>
                        <th className="px-2 py-3 text-left text-xsm font-semibold">Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {market.saleArray?.map((sale, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-2 py-4 text-xsm text-gray-900">{sale.name}</td>
                          <td className="px-4 py-4 text-xsm text-gray-900">{sale.quantity}</td>
                          <td className="px-2 py-4 text-xsm text-gray-900">{sale.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
              <td className="px-2 py-4 text-xsm text-gray-900">{market.dueAmount}</td>
              <td className="px-2 py-4 text-xsm text-gray-900">{market.weeklySale}</td>
              <td className="px-2 py-4 text-xsm text-gray-900">{market.potentialCustomer?"Yes":"No"}</td>
              <td className="px-2 py-4 text-xsm text-gray-900">{market.businessType}</td> */}
               <td className="px-2 py-4 text-xsm text-gray-900">
                <button
                  className="bg-green-500 p-2 rounded-md text-white"
                  onClick={() => handleOpen(market)}
                >
                  Open
                </button>
              </td>
              <td className="px-2 py-4 text-xsm text-gray-900">
                <button
                  className="bg-green-500 p-2 rounded-md text-white"
                  onClick={() => handleEdit(market)}
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 text-xsm text-gray-900">
                <button
                  className="bg-red-500 p-2 rounded-md text-white"
                  onClick={()=>handleDeleteOpen(market)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Show if empty */}
    {customers.length === 0 && (
      <div className="text-center py-4 text-gray-500 text-sm">
        No market data found.
      </div>
    )}
  </div>
</div>


    </div>
   
  );
};

export default Customer;