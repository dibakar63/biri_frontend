import axios from 'axios';
import React,{use, useState,useEffect} from 'react';
import toast from 'react-hot-toast';
import EditMarketModal from './editMarket';
import Cookie from 'js-cookie'
import DeleteMarketModal from './deleteMarketModal';

const Market = () => {
  const token=Cookie.get('token');
  const [markets,setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId,setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    marketName: '',
    marketAddress: '',
    marketCity: '',
    marketPincode: '',
    marketState: 'West Bengal',
  });

  
  const handleInputChange = (e) => {
    
    const { name, value,type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      const response=await axios.get('https://apibiri.eazydevz.in/api/getMarket');
      setMarkets(response.data.market);
     
    } catch (error) {
      console.log(error);
    }
  }
  const hanldePost=async()=>{
    const updateFormData={
      marketName:formData.marketName,
      marketAddress:formData.marketAddress,
      marketCity:formData.marketCity,
      marketPincode:formData.marketPincode,
      marketState:formData.marketState,

    }
    
    
    try {
      const response=await axios.post('https://apibiri.eazydevz.in/api/marketRegister',{data:updateFormData});
      toast.success(response.data.message);
      fetchData();
      setFormData({
        marketName: '',
        marketAddress: '',
        marketCity: '',
        marketPincode: '',
        marketState: 'West Bengal',
      });
      //alert(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      
    }

  }
      const handleDeleteOpen=(market)=>{
      setDeleteId(market._id)
     setSelectedMarket(market);
    setDeleteModalOpen(true);
  }
  const handleEdit = (market) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
  };
  const handleDelete=async(id)=>{
    try {
      const response=await axios.delete(`https://apibiri.eazydevz.in/api/deleteMarket/${id}`);
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleSave = async(updatedMarket) => {
    try {
      const response = await axios.put(`https://apibiri.eazydevz.in/api/updateMarket/${updatedMarket._id}`, {data:updatedMarket});
      toast.success(response.data.message);
      fetchData();
      
    } catch (error) {
        toast.error(error.response.data.message);
    }
   
  };
  

  useEffect(() => {
    fetchData();
  }, []);
  
  
  return (
    
    <div className='w-full h-full bg-[#DDDCDC] p-10 '>
     <form>
  <div className="space-y-5">
    <div className="border-b border-gray-900/10  p-10 text-center ">
      <span className="text-3xl font-semibold text-gray-900">Market Register</span>
    

     
    </div>
    <EditMarketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        market={selectedMarket}
      />
            <DeleteMarketModal
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
          <label for="marketName" className="block text-sm/6 font-medium text-gray-900">Market Name</label>
          <div className="mt-2">
            <input type="text" name="marketName" id="marketName" value={formData.marketName} onChange={(e)=>{handleInputChange(e)}} autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>

        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="marketAddress" className="block text-sm/6 font-medium text-gray-900">Market Address</label>
          <div className="mt-2">
          <textarea name="marketAddress" id="marketAddress" value={formData.marketAddress} onChange={(e)=>{handleInputChange(e)}} rows="3" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
          </div>
        </div>
        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="marketCity" className="block text-sm/6 font-medium text-gray-900">Market City/Village</label>
          <div className="mt-2">
            <input type="text" name="marketCity" id="marketCity"  value={formData.marketCity} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>

        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="last-name" className="block text-sm/6 font-medium text-gray-900">Market Pincode</label>
          <div className="mt-2">
          <input name="marketPincode" id="marketPincode" value={formData.marketPincode} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
        </div>

       

     

   

       

        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="region" className="block text-sm/6 font-medium text-gray-900">State </label>
          <div className="mt-2 ">
            <select type="text" name="marketState" id="marketState" value={formData.marketState} onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
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
<div className="p-6">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Market Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">City/Village</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Pincode</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">State</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Edit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {markets.map((market, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.marketName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.marketAddress}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.marketCity}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.marketPincode}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.marketState}</td>
                <td className="px-6 py-4 text-md text-gray-900"><button className='bg-green-500 p-2 rounded-md text-white' onClick={()=>handleEdit(market)}>Edit</button></td>
                <td className="px-6 py-4 text-md text-gray-900"><button className='bg-red-500 p-2 text-md rounded-md text-white' onClick={()=>handleDeleteOpen(market)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {markets.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">No market data found.</div>
        )}
      </div>
    </div>

    </div>
   
  );
};

export default Market;