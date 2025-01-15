import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Button,
  Upload,
  Card,
  Space,
  Divider,
  message,
  InputNumber,
  Row,
  Col
} from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import axios from '../../../services/axiosInstance';
import { useTheme } from '@mui/material/styles';
import "./Reception.css";
import PatientSearch from './PatientSearch';
import AddressSearch from './AddressSearch';
const { TextArea } = Input;
const { Option } = Select;

const AddReceptionForm = () => {
  const theme = useTheme();
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchDepartments();
    fetchProvinces();

    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      form.setFieldsValue(JSON.parse(savedFormData));
    }
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/servicecatalog');
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      message.error('Không thể lấy dữ liệu dịch vụ');
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/department');
      setDepartments(response.data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      message.error('Không thể lấy dữ liệu phòng ban');
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('/api/address/provinces');
      setProvinces(response.data.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
      message.error('Không thể lấy dữ liệu tỉnh/thành phố');
    }
  };

  const fetchDistricts = async (provinceCode) => {
    try {
      const response = await axios.get(`/api/address/districts/${provinceCode}`);
      setDistricts(response.data.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
      message.error('Không thể lấy dữ liệu quận/huyện');
    }
  };

  const fetchWards = async (districtCode) => {
    try {
      const response = await axios.get(`/api/address/ward/${districtCode}`);
      setWards(response.data.data);
    } catch (error) {
      console.error('Error fetching wards:', error);
      message.error('Không thể lấy dữ liệu xã/phường');
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append AddingPatient fields individually
      
      formData.append('AddingPatient.IdentityCardNumber', values.addingPatient.identityCardNumber);
      formData.append('AddingPatient.Name', values.addingPatient.name);
      formData.append('AddingPatient.Gender', values.addingPatient.gender === 'male' ? 'Nam' :
        values.addingPatient.gender === 'female' ? 'Nữ' : 'Khác');
      formData.append('AddingPatient.DateOfBirth', values.addingPatient.dateOfBirth);
      formData.append('AddingPatient.PhoneNumber', values.addingPatient.phoneNumber);
      formData.append('AddingPatient.Email', values.addingPatient.email || '');
      formData.append('AddingPatient.WardId', values.addingPatient.wardId);
      formData.append('AddingPatient.DistrictId', values.addingPatient.districtId);
      formData.append('AddingPatient.ProvinceId', values.addingPatient.provinceId);
      formData.append('AddingPatient.Ethnicity', values.addingPatient.ethnicity || '');
   // Append avatar file if exists
      if (values.addingPatient.avatarFile?.[0]?.originFileObj) {
        formData.append('AddingPatient.AvatarFile', values.addingPatient.avatarFile[0].originFileObj);
      }

      // Append other reception fields
      formData.append('SequenceNumber', values.sequenceNumber || '');
      formData.append('IsPriority', values.isPriority || false);
      formData.append('PatientId', values.PatientId || null);
      formData.append('ReceptionLocationId', values.receptionLocationId || '');
      formData.append('ReceptionistId', values.receptionistId || '');
      formData.append('Note', values.note || '');

      // Append medical service requests
      values.medicalServiceRequests.forEach((request, index) => {
        formData.append(`MedicalServiceRequest[${index}].RequestTime`, new Date().toISOString());
        formData.append(`MedicalServiceRequest[${index}].ServiceId`, request.serviceCatalogId);
        formData.append(`MedicalServiceRequest[${index}].Quantity`, request.quantity);
        formData.append(`MedicalServiceRequest[${index}].Discount`, request.discount || 0);
        formData.append(`MedicalServiceRequest[${index}].ServiceTotalAmount`, request.serviceTotalAmount || 0);
        formData.append(`MedicalServiceRequest[${index}].DepartmentId`, request.departmentId);
        formData.append(`MedicalServiceRequest[${index}].IsApproved`, true);
        formData.append(`MedicalServiceRequest[${index}].Status`, true);
        formData.append(`MedicalServiceRequest[${index}].AssignedById`, 0);
      });

      // For debugging - log all form data
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post('/api/reception', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 200) {
        message.success('Thêm tiếp nhận thành công');
        form.resetFields();
        localStorage.removeItem("formData");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response?.data?.message) {
        message.error(`Lỗi: ${error.response.data.message}`);
      } else {
        message.error('Gửi biểu mẫu thất bại');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSelect = (patient) => {
    fetchDistricts(patient.provinceId),
    fetchWards(patient.districtId)
    form.setFieldsValue({
      addingPatient: {
        PatientId: patient.PatientId,
        identityCardNumber: patient.identityCardNumber,
        name: patient.name,
        gender: patient.gender === 'Nam' ? 'male' : 
                patient.gender === 'Nữ' ? 'female' : 'other',
        dateOfBirth: patient.dateOfBirth,
        phoneNumber: patient.phoneNumber,
        email: patient.email,
        wardId: patient.wardId,
        districtId: patient.districtId,
        provinceId: patient.provinceId,
        ethnicity: patient.ethnicity
      }
    });
  };

  const  handleAddressSelect = (addressDetails) => {
    fetchDistricts(addressDetails.provinceCode),
    fetchWards(addressDetails.districtCode)
    form.setFieldsValue({
      addingPatient: {
        wardId: addressDetails.wardCode,
        districtId: addressDetails.districtCode,
        provinceId: addressDetails.provinceCode
      }
    });
  };

  return (
    <div className='reception' style={{ marginBottom: 16, justifyContent: 'space-between' }}>
      <Card title="Thêm Tiếp Nhận Mới" bordered={false} style={{
        backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f0f0f0'
      }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            medicalServiceRequests: [{}]
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 6fr 6fr',
            gap: '16px', 
            width: '50%'}}>
          <span>Tìm bệnh nhân</span>
          <PatientSearch 
          type="cccd" 
          onPatientSelect={handlePatientSelect}
                           />
          <PatientSearch 
          type="name" 
          onPatientSelect={handlePatientSelect}
          />
          </div>
          
              
          <Divider orientation="left">Thông Tin Bệnh Nhân</Divider>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 1fr 1fr',
            gap: '16px'
          }}>
            <Form.Item
              label="CMND/CCCD"
              name={['addingPatient', 'identityCardNumber']}
              rules={[{ required: true, message: 'Vui lòng nhập số CMND/CCCD!' }]}
            >
         
              <Input />
            </Form.Item>

            <Form.Item
              label="Họ và Tên"
              name={['addingPatient', 'name']}
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
   
              <Input />
            </Form.Item>

            <Form.Item
              label="Giới Tính"
              name={['addingPatient', 'gender']}
              rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
            >
              <Select>
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Ngày Sinh"
              name={['addingPatient', 'dateOfBirth']}
              rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
            >

              <Input
                type="date"
                style={{ width: '100%' }}
                max={new Date().toISOString().split('T')[0]}
              />
            </Form.Item>

            <Form.Item
              label="Số Điện Thoại"
              name={['addingPatient', 'phoneNumber']}
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name={['addingPatient', 'email']}
              rules={[{ type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ưu Tiên"
              name="isPriority"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
            label="Id bệnh nhân"
            name='PatientId'
          >
            <Input/>
          </Form.Item>
          </div>
          <Form.Item label="Tìm kiếm địa chỉ">
                   <AddressSearch onAddressSelect={handleAddressSelect} />
               </Form.Item>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          
            <Form.Item
              label="Tỉnh/Thành Phố"
              name={['addingPatient', 'provinceId']}
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
            >
              <Select
                onChange={(value) => fetchDistricts(value)}
              >
                {provinces.map((province) => (
                  <Option key={province.code} value={province.code}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Quận/Huyện"
              name={['addingPatient', 'districtId']}
              rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
            >
              <Select
                onChange={(value) => fetchWards(value)}
              >
                {districts.map((district) => (
                  <Option key={district.code} value={district.code}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Xã/Phường"
              name={['addingPatient', 'wardId']}
              rules={[{ required: true, message: 'Vui lòng chọn xã/phường!' }]}
            >
              <Select>
                {wards.map((ward) => (
                  <Option key={ward.code} value={ward.code}>
                    {ward.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label="Dân Tộc"
            name={['addingPatient', 'ethnicity']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ghi Chú"
            name="note"
          >
            <TextArea rows={3} />
          </Form.Item>

          <Divider orientation="left">Dịch Vụ Y Tế</Divider>

          <Form.List name="medicalServiceRequests">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{
                    display: 'grid',
                    gap: '16px',
                  }} align="baseline"
                  >
                    <div style={{ display: "flex" }}>
                      <Form.Item
                        {...restField}
                        name={[name, 'serviceCatalogId']}
                        label="Dịch Vụ"
                        rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                        style={{ flexGrow: "8" }}
                      >
                        <Select placeholder="Chọn dịch vụ">
                          {services.map((service) => (
                            <Option key={service.serviceCatalogId} value={service.serviceCatalogId}>
                              {service.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'quantity']}
                        label="Số Lượng"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                        style={{ flexGrow: "1" }}
                      >
                        <InputNumber min={1} defaultValue={1} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'discount']}
                        label="Giảm Giá (%)"
                        style={{ flexGrow: "1" }}
                      >
                        <InputNumber min={0} max={100} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'departmentId']}
                        label="Phòng Ban"
                        rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
                        style={{ flexGrow: "6" }}
                      >
                        <Select placeholder="Chọn phòng ban">
                          {departments.map((department) => (
                            <Option key={department.departmentI} value={department.departmentId}>
                              {department.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <Form.Item
                      {...restField}
                      name={[name, 'serviceTotalAmount']}
                      label="Tổng Tiền Dịch Vụ"
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Thêm Dịch Vụ
                  </Button>
                </Form.Item>
              </>
            )}
           </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu Tiếp Nhận
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddReceptionForm;
