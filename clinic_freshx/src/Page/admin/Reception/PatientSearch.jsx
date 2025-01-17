import React, { useState, useEffect } from 'react';
import { Input, AutoComplete, Space, Spin } from 'antd';
import axios from "../../../services/axiosInstance";
import debounce from 'lodash/debounce';
const PatientSearch = ({ onPatientSelect, type }) => {
   const [options, setOptions] = useState([]);
   const [searchText, setSearchText] = useState('');
   const [fetching, setFetching] = useState(false);
    const searchPatients = async (searchType, value) => {
       if (!value) {
           setOptions([]);
           setFetching(true);
           return;
       }
        try {
           const response = await axios.get('/api/patient/get-allpatients', {
               params: {
                   [searchType]: value
               }
           });
            const patients = response.data.data;
           const formattedOptions = patients.map(patient => ({
               value: patient.patientId,
               label: (
                   <div>
                       <div>{patient.name}</div>
                       <div style={{ fontSize: '12px', color: '#666' }}>
                           CCCD: {patient.identityCardNumber}
                       </div>
                   </div>
               ),
               patient: patient
           }));
           setFetching(false);
            setOptions(formattedOptions);
            if(!formattedOptions){
                setOptions(null);
            }
       } catch (error) {
           console.error('Error searching patients:', error);
       }
   };
    const debouncedSearch = debounce((searchType, value) => {
       searchPatients(searchType, value);
   }, 300);
    const handleSearch = (value) => {
       setSearchText(value);
       const searchType = type === 'name' ? 'SearchTerm' : 'CardNumber';
       debouncedSearch(searchType, value);
   };
    const handleSelect = (value, option) => {
       onPatientSelect(option.patient);
       setSearchText('');
       setOptions([]);
   };
    return (
       <AutoComplete
           value={searchText}
           options={options}
           onSearch={handleSearch}
           onSelect={handleSelect}
           style={{ width: '100%' }}
           notFoundContent={fetching ? <Spin size="small" /> : null}
       >
           <Input 
               placeholder={type === 'name' ? "Tìm theo tên bệnh nhân" : "Tìm theo CCCD"}
               type={type === 'name' ? 'text' : 'number'}
           />
       </AutoComplete>
   );
};
export default PatientSearch;