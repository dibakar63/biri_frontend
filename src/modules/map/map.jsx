import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Cookie from 'js-cookie';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const mapOptions = {
  streetViewControl: false,
  mapTypeControl: false,
};


const CustomerMap = () => {
  const token = Cookie.get('token');
  const businessName = useSelector((state) => state.business.businessName);

  const [marketName, setMarketName] = useState([]);
  const [resolvedAddress, setResolvedAddress] = useState('');

  const [customerName, setCustomerName] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [zoom, setZoom] = useState(15);

  const [formData, setFormData] = useState({
    market: '',
    customer: '',
  });

  const mapRef = useRef(null);

  const defaultCenter = { lat: 23.216711, lng: 88.366689 };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch all customers
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://apibiri.eazydevz.in/api/getCustomer?businessName=${businessName}`);
      setCustomers(response.data.customer);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch customers');
    }
  };

  // Fetch market list
  const fetchMarketData = async () => {
    try {
      const response = await axios.get(`https://apibiri.eazydevz.in/api/getMarket?businessName=${businessName}`);
      setMarketName(response.data.market);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch markets');
    }
  };

  // Fetch customers by market
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(
        `https://apibiri.eazydevz.in/api/getCustomerByMarket?businessName=${businessName}&market=${formData.market}`
      );
      setCustomerName(response.data.customer);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch customer by market');
    }
  };
  useEffect(() => {
  const fetchAddress = async () => {
    if (!selectedCustomer?.address) {
      setResolvedAddress('');
      return;
    }

    try {
      const address = await getAddress(selectedCustomer.address);
      setResolvedAddress(address);
    } catch (error) {
      console.error("Failed to fetch address:", error);
      setResolvedAddress('Address not available');
    }
  };

  fetchAddress();
}, [selectedCustomer]);


  useEffect(() => {
    fetchData();
    fetchMarketData();
  }, [businessName]);

  useEffect(() => {
    if (formData.market) {
      fetchCustomerData();
    }
  }, [formData.market]);

  useEffect(() => {
    if (formData.customer && customerName.length > 0) {
      const selected = customerName.find((c) => c.name === formData.customer);
      setSelectedCustomer(selected);

      const coords = getCoordinates(selected?.location);
      if (coords && mapRef.current) {
        mapRef.current.panTo(coords);
        setZoom(15);
      }
    }
  }, [formData.customer]);
//   const getAddress=async(addressString)=>{
//  const mapsRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/; // matches @lat,lng in URL
//     const match = addressString.match(mapsRegex);

//     let location;

//     if (match) {
//       // If user provided a Google Maps link with @lat,lng
//       const lat = parseFloat(match[1]);
//       const lng = parseFloat(match[2]);
//       location = { lat, lng };
//     } else {
//       // If it's a regular address string
//       addressString = `${addressString}, West Bengal, India`;

//       const geoResponse = await axios.get(
//         'https://maps.googleapis.com/maps/api/geocode/json',
//         {
//           params: {
//             address: addressString,
//             key: 'AIzaSyAj3_k9kC-aYrN1GzUgbQdU0mayql2Eea8',
//           },
//         }
//       );

//       if (
//         geoResponse.data.status !== 'OK' ||
//         !geoResponse.data.results.length
//       ) {
//         return res.status(400).json({
//           message: 'Failed to get location from address',
//         });
//       }

//       location = geoResponse.data.results[0].geometry.location;

//     }
//     console.log(location,'location');
//    const response=await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`);
//    console.log(response.data.address);
//    return `${response.data.address.town},${response.data.address.country},${response.data.address.postcode}`;

// }

  // Extract lat/lng from customer location
  const getCoordinates = (locationArray) => {
    if (Array.isArray(locationArray) && locationArray.length > 0) {
      return {
        lat: locationArray[0].latitude,
        lng: locationArray[0].longitude,
      };
    }
    return null;
  };

  return (
    <div className='w-full h-full bg-[#DDDCDC] p-10'>
      <div className='w-full bg-white flex flex-row justify-center gap-3 items-center p-10 rounded-lg'>
        <select
          name='market'
          value={formData.market}
          onChange={handleInputChange}
          className='block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm'
        >
          <option value=''>Select Market</option>
          {marketName.map((market) => (
            <option key={market._id} value={market.marketName}>
              {market.marketName}
            </option>
          ))}
        </select>

        <select
          name='customer'
          value={formData.customer}
          onChange={handleInputChange}
          className='block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm'
        >
          <option value=''>Select Customer</option>
          {customerName.map((customer) => (
            <option key={customer._id} value={customer.name}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div className='p-6' style={{ height: '70vh', width: '100%' }}>
        <LoadScript
          googleMapsApiKey='AIzaSyAj3_k9kC-aYrN1GzUgbQdU0mayql2Eea8'
        >
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={defaultCenter}
            zoom={zoom}
            onLoad={(map) => (mapRef.current = map)}
            options={mapOptions}
          >
            {customerName.map((cust) => {
              const coords = getCoordinates(cust.location);
              if (!coords) return null;

              return (
                <Marker
                  key={cust._id}
                  position={coords}
                  onClick={() => {
                    setSelectedCustomer(cust);
                    mapRef.current?.panTo(coords);
                    setZoom(15);
                  }}
                />
              );
            })}

            {selectedCustomer && (
              <InfoWindow
                position={getCoordinates(selectedCustomer.location)}
                onCloseClick={() => setSelectedCustomer(null)}
              >
                <div>
                  <h3 className='font-bold text-lg'>{selectedCustomer.name}</h3>
                  <p>Phone: {selectedCustomer.phoneNo}</p>
                  <p>Market: {selectedCustomer.market}</p>
                  <p>Address: {selectedCustomer.address}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default CustomerMap;
