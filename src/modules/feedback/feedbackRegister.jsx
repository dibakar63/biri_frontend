import axios from 'axios';
import React,{use, useState,useEffect} from 'react';
import toast from 'react-hot-toast';

import Cookie from 'js-cookie'

import { useSelector } from 'react-redux';

const FeedbackRegister = () => {
  const token=Cookie.get('token');
   const businessName = useSelector((state) => state.business.businessName);
 
  const [formData, setFormData] = useState({
    name: '',
    feedback: '',
    rating: 0,
    businessName:businessName,
    
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
      
  
  const hanldePost=async()=>{
    const updateFormData={
      name:formData.name,
      feedback:formData.feedback,
      rating:formData.rating,
      businessName:businessName,
      

    }
    
    
    try {
      const response=await axios.post('https://apibiri.eazydevz.in/api/feedback',{data:updateFormData});
      toast.success(response.data.message);
      fetchData();
      setFormData({
       name: '',
        feedback: '',
        rating: 0,
        businessName:businessName,
      });
      //alert(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      
    }

  }
  

  
  

  
  
  return (
    
    <div className='w-full h-full bg-[#DDDCDC] p-10 '>
     <form>
  <div className="space-y-5">
    <div className="border-b border-gray-900/10  p-10 text-center ">
      <span className="text-3xl font-semibold text-gray-900">Feedback Form</span>
    

     
    </div>
  
    <div className="border-b border-gray-900/10 pb-12">
     

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-6 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="name" className="block text-sm/6 font-medium text-gray-900">Your Name</label>
          <div className="mt-2">
            <input type="text" name="name" id="name" value={formData.name} onChange={(e)=>{handleInputChange(e)}} autocomplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>

        <div className="sm:col-span-6 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="feedback" className="block text-sm/6 font-medium text-gray-900">Feedback</label>
          <div className="mt-2">
          <input name="feedback" id="type" value={formData.feedback} onChange={(e)=>{handleInputChange(e)}}  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>
        {/* <div className="sm:col-span-3 bg-[#F2F1F1] rounded-md shadow-lg p-10">
          <label for="rating" className="block text-sm/6 font-medium text-gray-900">Code</label>
          <div className="mt-2">
            <input type="rating" name="rating" id="rating"  value={formData.rating} onChange={(e)=>handleInputChange(e)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div> */}
        <div className="sm:col-span-6 bg-[#F2F1F1] rounded-md shadow-lg p-10">
  <label className="block text-sm/6 font-medium text-gray-900 mb-2">Rating</label>
  <div className="flex space-x-2 text-2xl cursor-pointer">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => setFormData({ ...formData, rating: star })}
        className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ))}
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
   
  );
};

export default FeedbackRegister