import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, message } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import axios from "../../services/axiosInstance";
import  useDebounce  from  "./useDebounce";
import EditComponent from './EditableRow';
import CreateComponent from './BaseCreate';
const BaseTable = ({
  // Configuration props
  endpoint,
  CreatEndpoint,
  UpdateEndpoint,
  DeleteEndpoint,
  columns,
  fieldsConfig,
  fetchOptionsConfig,
  primaryKey = 'id',
  searchPlaceholder = 'Tìm kiếm',
  
  // Custom components
  createConfig,
  
  // Custom labels
  createButtonLabel = 'Tạo mới',
  deleteConfirmTitle = 'Xác nhận xóa',
  deleteConfirmMessage = 'Bạn có chắc chắn muốn xóa?',
  
  // Optional callbacks
  onDataChange,
  transformData,
}) => {
  // States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  
  const theme = useTheme();
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  // API handlers
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${endpoint}`, {
        params: { searchKeyword}
      });
      const transformedData = transformData 
        ? transformData(response.data.data)
        : response.data.data;
      setData(transformedData);
      onDataChange?.(transformedData);
    } catch (error) {
      message.error('Không thể lấy dữ liệu!');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedRecord) => {
    try {
      const respoint = await axios.put(
        `${UpdateEndpoint}/${updatedRecord[primaryKey]}`,
        updatedRecord
      );
      message.success('Cập nhật thành công!');
      fetchData();
      handleCancel();
    } catch (error) {
        console.log(error)
       if(error.status && error.status === 400 && error.response.data.data.length >0){
        const erdata = error.response.data.data
        erdata.map((item) => (
            message.error(`${item.field}: ${item.message}`)
        ))
       }
      message.error('Cập nhật không thành công!');
    }
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: deleteConfirmTitle,
      content: `${deleteConfirmMessage} ${record.name || ''}?`,
      onOk: async () => {
        try {
          await axios.delete(`${DeleteEndpoint}/${record[primaryKey]}`);
          message.success('Xóa thành công!');
          fetchData();
        } catch (error) {
          message.error('Xóa không thành công!');
        }
      }
    });
  };

  // UI handlers
  const handleOpen = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);
  const handleCancel = () => {
    setEditingRecord(null);
    setIsEditing(false);
    setExpandedRowKeys([]);
  };
  
  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsEditing(true);
    setExpandedRowKeys([record[primaryKey]]);
  };

  const handleExpandRow = (record) => {
    setEditingRecord(null);
    setIsEditing(false);
    setExpandedRowKeys((prevKeys) => {
      const keys = [...prevKeys];
      const index = keys.indexOf(record[primaryKey]);
      if (index === -1) {
        keys.push(record[primaryKey]);
      } else {
        keys.splice(index, 1);
      }
      return keys;
    });
  };

  // Effects
  useEffect(() => {
    console.log(debouncedSearchKeyword)
    if (debouncedSearchKeyword != undefined) {
        fetchData();  
    }
  }, [debouncedSearchKeyword]);

  // Prepare action column
  const actionColumn = {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => (
      <div>
        <Button
          icon={<EyeOutlined />}
          onClick={() => handleExpandRow(record)}
          style={{ marginRight: 8 }}
        >
          Xem
        </Button>
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          style={{ marginRight: 8 }}
        >
          Sửa
        </Button>
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
        >
          Xóa
        </Button>
      </div>
    )
  };

  const finalColumns = [...columns, actionColumn];

  return (
    <div>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder={searchPlaceholder}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={handleOpen}>
          {createButtonLabel}
        </Button>
      </div>

      <CreateComponent
        isActive={isModalVisible}
        onClose={handleClose}
        onRefresh={fetchData}
        createConfig={createConfig}
      />

      <Table
        columns={finalColumns}
        dataSource={data}
        loading={loading}
        rowKey={primaryKey}
        expandedRowKeys={expandedRowKeys}
        onExpand={(expanded, record) =>
          setExpandedRowKeys(expanded ? [record[primaryKey]] : [])
        }
        expandedRowRender={(record) => (
          EditComponent && (
            <EditComponent
              record={record}
              onSave={handleSave}
              onCancel={handleCancel}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editingRecord={editingRecord}
              setEditingRecord={setEditingRecord}
              fieldsConfig={fieldsConfig}
            />
          )
        )}
        style={{ 
          backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f0f0f0' 
        }}
      />
    </div>
  );
};

export default BaseTable;