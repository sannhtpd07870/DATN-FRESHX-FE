// Department.js
import React, { useState, useEffect } from 'react';
import BaseTable from  '../../components/admin/BaseTable';
import BaseExpandedRow from '../../components/admin/EditableRow';
import BaseFormModal from '../../components/admin/BaseCreate';
import axios from '../../services/axiosInstance';
import { Button, message } from 'antd';

const TestBase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    departmentTypeId: null,
    isSuspended: 0,
  });
  const [departmentTypes, setDepartmentTypes] = useState([]);

  useEffect(() => {
    fetchDepartmentTypes();
    fetchData();
  }, [searchKeyword]);

  const fetchDepartmentTypes = async () => {
    try {
      const response = await axios.get('/api/departmenttype');
      setDepartmentTypes(response.data.data);
    } catch (error) {
      message.error('Failed to fetch department types!');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/department/detail', {
        params: { searchKeyword },
      });
      console.log(response.data)
      setData(response);
    } catch (error) {
      message.error('Failed to fetch data!');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedRecord) => {
    try {
      await axios.put(`/api/department/${updatedRecord.departmentId}`, updatedRecord);
      message.success('Update successful!');
      fetchData();
    } catch (error) {
      message.error('Update failed!');
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('/api/department', formData);
      message.success('Department created successfully!');
      setModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('Failed to create department!');
    }
  };

  const columns = [
    {
      title: 'Department Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'isSuspended',
      key: 'isSuspended',
      render: (isSuspended) => (isSuspended === 0 ? 'Active' : 'Suspended'),
    },
  ];

  const expandedRowFields = [
    { name: 'name', label: 'Department Name', type: 'input' },
    { name: 'code', label: 'Department Code', type: 'input' },
    {
      name: 'departmentTypeId',
      label: 'Department Type',
      type: 'select',
      options: departmentTypes.map((type) => ({ value: type.departmentTypeId, label: type.name })),
    },
    {
      name: 'isSuspended',
      label: 'Status',
      type: 'select',
      options: [
        { value: 0, label: 'Active' },
        { value: 1, label: 'Suspended' },
      ],
    },
  ];

  return (
    <div>
      <BaseTable
        columns={columns}
        data={data}
        rowKey="departmentId"
        expandable={{
          expandedRowRender: (record) => (
            <BaseExpandedRow
              record={record}
              fields={expandedRowFields}
              onSave={(updatedRecord) => handleSave(updatedRecord)}
              formData={record}
              setFormData={setFormData}
            />
          ),
        }}
        searchPlaceholder="Search departments..."
        onSearch={(value) => setSearchKeyword(value)}
        createButton={
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Create Department
          </Button>
        }
      />

      <BaseFormModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreate}
        fields={expandedRowFields}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default TestBase;
