import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInstance';
import './DoctorTable.css'; // Tệp CSS tuỳ chỉnh

const DoctorTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/doctor/detail', {
          params: {
            searchKeyword: '',
            startDate: null,
            endDate: null,
            status: null,
            specialty: null,
            phone: null,
            email: null,
            gender: null,
          },
        });
        if (response.data.status) {
          setDoctors(response.data.data);
        } else {
          console.error('Failed to fetch doctors:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  // Toggle expand row
  const toggleExpand = (doctorId) => {
    setExpandedRow(expandedRow === doctorId ? null : doctorId);
  };

  return (
    <div className="doctor-table-container">
      <h2>Doctor List</h2>
      <table className="doctor-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <React.Fragment key={doctor.doctorId}>
              <tr>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.email}</td>
                <td>{doctor.gender}</td>
                <td>
                  <button
                    className="expand-button"
                    onClick={() => toggleExpand(doctor.doctorId)}
                  >
                    {expandedRow === doctor.doctorId ? 'Hide Details' : 'Show Details'}
                  </button>
                </td>
              </tr>
              {expandedRow === doctor.doctorId && (
                <tr className="expanded-row">
                  <td colSpan="7">
                    <div>
                      <strong>Date of Birth:</strong> {new Date(doctor.dateOfBirth).toLocaleDateString()} <br />
                      <strong>Is Suspended:</strong> {doctor.isSuspended ? 'Yes' : 'No'} <br />
                      <strong>Created Date:</strong> {new Date(doctor.createdDate).toLocaleDateString()} <br />
                      <strong>Updated Date:</strong> {doctor.updatedDate
                        ? new Date(doctor.updatedDate).toLocaleDateString()
                        : 'N/A'} <br />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
