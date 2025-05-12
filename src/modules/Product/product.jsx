import axios from 'axios';
import React,{use, useState,useEffect} from 'react';
import toast from 'react-hot-toast';
import EditProductModal from './editProduct';
import Cookie from 'js-cookie'
import DeleteProductModal from './deleteProductModal';

const Product = () => {
  const token=Cookie.get('token');
  const [products,setProducts] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
      const [deleteId,setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    code: '',
    
  });

  
  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
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
      const handleDeleteOpen=(market)=>{
      setDeleteId(market._id)
     setSelectedMarket(market);
    setDeleteModalOpen(true);
  }
  const fetchData=async()=>{
    try {
      const response=await axios.get('https://apibiri.eazydevz.in/api/getProduct');
      setProducts(response.data.product);
     
    } catch (error) {
      console.log(error);
    }
  }
  const hanldePost=async()=>{
    const updateFormData={
      name:formData.name,
      type:formData.type,
      code:formData.code,
      

    }
    
    
    try {
      const response=await axios.post('https://apibiri.eazydevz.in/api/productRegister',{data:updateFormData});
      toast.success(response.data.message);
      fetchData();
      setFormData({
        name:'',
        type:'',
        code:'',
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
  const handleDelete=async(id)=>{
    try {
      const response=await axios.delete(`https://apibiri.eazydevz.in/api/deleteProduct/${id}`);
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleSave = async(updatedMarket) => {
    try {
      const response = await axios.put(`https://apibiri.eazydevz.in/api/updateProduct/${updatedMarket._id}`, {data:updatedMarket});
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
      <span className="text-3xl font-semibold text-gray-900">Product Register</span>
    

     
    </div>
    <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        market={selectedMarket}
      />
            <DeleteProductModal
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
          <label for="name" className="block text-sm/6 font-medium text-gray-900">Product Name</label>
          <div className="mt-2">
            <input type="text" name="name" id="name" value={formData.name} onChange={(e)=>{handleInputChange(e)}} autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>

        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="type" className="block text-sm/6 font-medium text-gray-900">Product Type</label>
          <div className="mt-2">
          <input name="type" id="type" value={formData.type} onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>
        <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="code" className="block text-sm/6 font-medium text-gray-900">Code</label>
          <div className="mt-2">
            <input type="text" name="code" id="code"  value={formData.code} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
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
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Code</th>
              
              <th className="px-6 py-3 text-left text-sm font-semibold">Edit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((market, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.type}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.code}</td>
               
                <td className="px-6 py-4 text-md text-gray-900"><button className='bg-green-500 p-2 rounded-md text-white' onClick={()=>handleEdit(market)}>Edit</button></td>
                <td className="px-6 py-4 text-md text-gray-900"><button className='bg-red-500 p-2 text-md rounded-md text-white' onClick={()=>handleDeleteOpen(market)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">No Product data found.</div>
        )}
      </div>
    </div>

    </div>
   
  );
};

export default Product;