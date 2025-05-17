import axios from 'axios';
import React,{use, useState,useEffect} from 'react';
import toast from 'react-hot-toast';
//import EditMarketModal from './editDailySalePerson';
import Cookie from 'js-cookie'
import CustomerPaymentModal from './payment';
import DeletePaymentModal from './deletePaymentModal';
import EditPaymentModal from './editPaymentModal';


const DueReport = () => {
  const token=Cookie.get('token');
  const [markets,setMarkets] = useState([]);
  const [marketName,setMarketName] = useState([]);
  const [payment,setPayment] = useState([]);
  const [salePersons,setSalePersons] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);  
  const [editCustomer,setEditCustomer] = useState(null);
  const [dueReport,setDueReport] = useState([]);
  const [customers,setCustomers] = useState([]);
 const [deleteId,setDeleteId] = useState(null);
  const  [formData, setFormData] = useState({
    
    market: '',
    name: '',

  });
  const formatDate=(isoDate)=>{
    
const date = new Date(isoDate);

// const day = String(date.getDate()).padStart(2, '0');
// const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
// const year = date.getFullYear();
const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD




const formattedDate = `${dayName}-${dateStr}`;
return formattedDate;
  }

  
  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
//   const formatDate=(isoDate)=>{
    
// const date = new Date(isoDate);

// // const day = String(date.getDate()).padStart(2, '0');
// // const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
// // const year = date.getFullYear();
// const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
//         const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD




// const formattedDate = `${dayName}-${dateStr}`;
// return formattedDate;
//   }
  const fetchMarketData=async()=>{
    try {
      const response=await axios.get('https://apibiri.eazydevz.in/api/getMarket');
      setMarketName(response.data.market);
     
    } catch (error) {
      console.log(error);
    }
  }
  const fetchCustomerData=async()=>{
    try {
      const response=await axios.get(`https://apibiri.eazydevz.in/api/getCustomerByMarket?market=${formData.market}` );
      setCustomers(response.data.customer);
     
    } catch (error) {
      if(error.response.status===404){
        toast.error(error.response.data.message);
      }
    }
  }
  const deleteModal=(id)=>{
    setDeleteModalOpen(true);
    setDeleteId(id)
  }
  const fetchPaymentData=async()=>{
    try {
      const response=await axios.get(`https://apibiri.eazydevz.in/api/getPayment?market=${formData.market}&name=${formData.name}`);
      setPayment(response.data.payment);

    } catch (error) {
      
    }
  }

  const DueData=async()=>{
    
    try {
      const response=await axios.get(`https://apibiri.eazydevz.in/api/dueReport?market=${formData.market}&name=${formData.name}`);
      setDueReport(response.data.totalDueReport);
     
    } catch (error) {
      console.log(error);
    }
  }
 
  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setEditModalOpen(true);
  };
    const paymnentModal = () => {
    
    setIsModalOpen(true);
  };
  const handleDelete=async(id)=>{
    try {
      const response=await axios.delete(`https://apibiri.eazydevz.in/api/deletePayment/${id}`);
      toast.success(response.data.message);
      



      fetchPaymentData()
    DueData()
    } catch (error) {
      if(error.response.status===404){
        toast.error(error.response.data.message);
      }else{
      toast.error(error.response.data.message);
      }
    }
  }
 

  const handleSave = async(updatedMarket) => {
    try {
      const response = await axios.put(`https://apibiri.eazydevz.in/api/updatePayment/${editCustomer._id}`, {data:updatedMarket});
      toast.success(response.data.message);
      fetchPaymentData();
      DueData()
      setEditCustomer(null);
      
    } catch (error) {
       if(error.response.status===404){
            toast.error(error.response.data.message);
        }else{
            toast.error(error.response.data.message);
        }
    }
   
  };
  

  useEffect(() => {
    fetchPaymentData();
    DueData();
    
  }, [formData.market,formData.name]);
  useEffect(()=>{
    if(formData.market){
    fetchCustomerData();
    }
   
  },[formData.market])
  useEffect(() => {
   
    DueData();
   fetchCustomerData();
   fetchMarketData();
  }, []);
  
  
  return (
    
    <div className='w-full h-full bg-[#DDDCDC] p-10 '>
    <div className='w-full h-full bg-white flex flex-row justify-center gap-3 items-center p-10 rounded-lg'>
    <select   type="text" name="market" id="market"  value={formData.market} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        <option value="">Select Market</option>
        {marketName.map((market) => (
          <option key={market._id} value={market.marketName}>
            {market.marketName}
          </option>
        ))}
    </select>
    <select   type="text" name="name" id="name"  value={formData.name} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        <option value="">Select Customer</option>
        {customers.map((customer) => (
          <option key={customer._id} value={customer.name}>
            {customer.name}
          </option>
        ))}
    </select>
   
    </div>
  
    


<div className="p-6">
      <div className="overflow-x-auto rounded-lg shadow">
      <div className='flex flex-row justify-between items-center gap-3 mb-4 bg-white p-4'>
        <p className='text-center text-2xl'>Market-{dueReport?.market}</p>
        <p className='text-center text-2xl'>Name-{dueReport?.name}</p>
        <p className='text-center text-2xl'>Total Due-{dueReport?.totalDue?dueReport.totalDue:""}</p>
        <button className='bg-blue-600 text-white rounded-md p-2' onClick={()=>paymnentModal()}>Payment</button>
      </div>
      <CustomerPaymentModal

        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        market={formData.market}
        customerName={formData.name}
        paymentData={fetchPaymentData}
        dueData={DueData}

      />
      <DeletePaymentModal
      isOpen={isDeleteModalOpen}
      onClose={() => setDeleteModalOpen(false)}
      onSave={()=>handleDelete(deleteId)}
      id={deleteId}
      setId={setDeleteId}
      

      />
      <EditPaymentModal
      isOpen={editModalOpen}
      onClose={() => setEditModalOpen(false)}
      onSave={handleSave}
      customerData={editCustomer}
      setCustomerData={setEditCustomer}

      />
      <div className='flex flex-row justify-between items-center gap-3   p-4'>
        <table className="min-w-1/3 divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              
              {/* <th className="px-6 py-3 text-left text-sm font-semibold">Total Due</th> */}
              <th className="px-6 py-3 text-center text-sm font-semibold">Due Reprot</th>
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
          
              <tr  className="hover:bg-gray-50">
               
                {/* <td className="px-6 py-4 text-sm text-gray-900">{dueReport.totalDue}</td> */}
               <td className="px-6 py-4 text-sm text-gray-900">
                <table>
                <thead className='className="bg-indigo-600 text-white"'>
                    <tr>
                        <th className="px-6 py-4 text-sm text-gray-900">Paid</th>
                        <th className="px-6 py-4 text-sm text-gray-900">Due</th>
                        <th className="px-6 py-4 text-sm text-gray-900">Date-Day</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-green-400">
                    {dueReport.dueReport?.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.paid}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.due}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.date}-{item.day}</td>
                        </tr>
                    ))}
                    
                    

                    </tbody>
                </table>
               </td>
                
               
              </tr>
           
          </tbody>
        </table>
         <table className="min-w-2/3 divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              
              {/* <th className="px-6 py-3 text-left text-sm font-semibold">Total Due</th> */}
              <th className="px-6 py-3 text-center text-sm font-semibold">Payment Reprot</th>
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
          
              <tr  className="hover:bg-gray-50">
               
                {/* <td className="px-6 py-4 text-sm text-gray-900">{dueReport.totalDue}</td> */}
               <td className="px-6 py-4 text-sm text-gray-900">
                <table>
                <thead className='className="bg-indigo-600 text-white"'>
                    <tr>
                        <th className="px-4 py-4 text-sm text-gray-900">Name</th>
                        <th className="px-4 py-4 text-sm text-gray-900">Market</th>
                        <th className="px-4 py-4 text-sm text-gray-900">Paid</th>
                        <th className="px-4 py-4 text-sm text-gray-900">Date</th>
                        <th className="px-4 py-4 text-sm text-gray-900">Edit</th>
                        <th className="px-4 py-4 text-sm text-gray-900">Delete</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-green-400">
                    {payment?.map((item, index) => (
                        <tr key={index}>
                            <td className="px-4 py-4 text-sm text-gray-900">{item.name}</td>
                            <td className="px-4 py-4 text-sm text-gray-900">{item.market}</td>
                            <td className="px-4 py-4 text-sm text-gray-900">{item.paidAmount}</td>
                            <td className="px-4 py-4 text-sm text-gray-900">{formatDate(item.createdAt)}</td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              <button onClick={() => handleEdit(item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <button onClick={() => deleteModal(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                    
                    

                    </tbody>
                </table>
               </td>
                
               
              </tr>
           
          </tbody>
        </table>
        </div>
       
      </div>
    </div>

    </div>
   
  );
};

export default DueReport;