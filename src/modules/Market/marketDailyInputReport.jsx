import axios from 'axios';
import React,{use, useState,useEffect} from 'react';
import toast from 'react-hot-toast';
//import EditMarketModal from './editDailySalePerson';
import Cookie from 'js-cookie'

const MarketInputReport =()=>{
  const token=Cookie.get('token');
  const [markets,setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const  [formData, setFormData] = useState({
    
    startDate: '',
    endDate: '',

  });


  
  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const formatDate=(isoDate)=>{
    
const date = new Date(isoDate);

const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const year = date.getFullYear();

const formattedDate = `${day}/${month}/${year}`;
return formattedDate;
  }
 

  const filterData=async()=>{
    const startDate = formData.startDate;
    const endDate = formData.endDate;
    try {
      const response=await axios.get(`https://apibiri.eazydevz.in/api/getMarketDailyInputByDateRange?startDate=${startDate}&endDate=${endDate}`);
      setMarkets(response.data.marketDailyInput);
     
    } catch (error) {
      console.log(error);
    }
  }
 
  const handleEdit = (market) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
  };
  const handleDelete=async(id)=>{
    try {
      const response=await axios.delete(`https://apibiri.eazydevz.in/api/deleteCustomerDailyInput/${id}`);
      toast.success(response.data.message);
      filterData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
 

  const handleSave = async(updatedMarket) => {
    try {
      const response = await axios.put(`https://apibiri.eazydevz.in/api/updateDailySalePerson/${updatedMarket._id}`, {data:updatedMarket});
      toast.success(response.data.message);
      fetchData();
      
    } catch (error) {
        toast.error(error.response.data.message);
    }
   
  };
  

  useEffect(() => {
    filterData();
  }, [formData.startDate,formData.endDate]);
  
  
  return (
    
    <div className='w-full h-full bg-[#DDDCDC] p-10 '>
    <div className='w-full h-full bg-white flex flex-row justify-center gap-3 items-center p-10 rounded-lg'>
    <input   type="date" name="startDate" id="startDate"  value={formData.startDate} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
    <input   type="date" name="endDate" id="endDate"  value={formData.endDate} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
   {/* <button onClick={filterData} className='bg-indigo-600 text-white px-4 py-2 rounded-md'>Filter</button> */}
    </div>
  
    {/* <EditMarketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        market={selectedMarket}
      /> */}


<div className="p-6">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Customer Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Sale</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Paid</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Due</th>
              
              <th className="px-6 py-3 text-left text-sm font-semibold">Edit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {markets.map((market, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                    <table>
                        <thead className='bg-indigo-600 text-white'>
                            <tr>
                                <td className="px-6 py-3 text-left text-sm font-semibold">Name</td>
                                <td className="px-6 py-3 text-left text-sm font-semibold">Qty</td>
                                <td className="px-6 py-3 text-left text-sm font-semibold">Unit</td>
                            </tr>
                        </thead>
                        <tbody>
                            {market.sale?.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-3 text-left text-sm font-semibold">{item.productCode}</td>
                                    <td className="px-6 py-3 text-left text-sm font-semibold">{item.quantity}</td>
                                    <td className="px-6 py-3 text-left text-sm font-semibold">{item.unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.paid}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.due}</td>
                
                <td className="px-6 py-4 text-md text-gray-900"><button className='bg-green-500 p-2 rounded-md text-white' onClick={()=>handleEdit(market)}>Edit</button></td>
                <td className="px-6 py-4 text-md text-gray-900"><button className='bg-red-500 p-2 text-md rounded-md text-white' onClick={()=>handleDelete(market._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {markets.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">No Customer Input  Data found.</div>
        )}
      </div>
    </div>

    </div>
   
  );
};

export default MarketInputReport ;