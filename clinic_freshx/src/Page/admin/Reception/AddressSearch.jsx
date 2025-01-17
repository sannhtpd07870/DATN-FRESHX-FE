import React, { useState } from 'react';
import { AutoComplete, Select, Spin  } from 'antd';
import axios from "../../../services/axiosInstance";
import debounce from 'lodash/debounce';
const AddressSearch = ({ onAddressSelect }) => {
   const [options, setOptions] = useState([]);
   const [fetching, setFetching] = useState(false);
    const searchAddress = async (value) => {
       if (!value) {
           setOptions([]);
           setFetching(true);
           return;
       }
        try {
           const response = await axios.get('/api/address/search', {
               params: { searchTerm: value }
           });
            const addresses = response.data.data;
           const formattedOptions = addresses.map(address => ({
               value: address.text,
               label: address.text,
               addressDetails: address.addressDetails
           }));
            setOptions(formattedOptions);
            setFetching(false);
       } catch (error) {
           console.error('Error searching addresses:', error);
       }
   };
    const debouncedSearch = debounce(searchAddress, 800);
    const handleSelect = (value, option) => {
       onAddressSelect(option.addressDetails);
   };
    return (
       <AutoComplete
           options={options}
           onSearch={debouncedSearch}
           onSelect={handleSelect}
           style={{ width: '100%' }}
           placeholder="Nhập địa chỉ"
           notFoundContent={fetching ? <Spin size="small" /> : null}
       />
   );
};
export default AddressSearch;