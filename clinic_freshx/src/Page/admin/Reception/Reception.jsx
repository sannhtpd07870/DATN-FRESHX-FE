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
  const [doctors, setDoctors] = useState([])
  const [services, setServices] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [receptionId, setReceptionId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loadingServices, setLoadingServices] = useState(false);

  // Add validation rules
  const identityCardRules = [
    { required: true, message: 'CMND/CCCD là bắt buộc!' },
    { pattern: /^[0-9]{12}$/, message: 'CCCD phải là 12 chữ số!' }
  ];

  const nameRules = [
    { required: true, message: 'Tên bệnh nhân là bắt buộc!' },
    { min: 2, max: 100, message: 'Tên phải từ 2-100 ký tự!' },
    { pattern: /^[a-zA-ZÀ-ỹ\s]*$/, message: 'Tên chỉ được chứa chữ cái và khoảng trắng!' }
  ];

  const phoneRules = [
    { required: true, message: 'Số điện thoại là bắt buộc!' },
    { pattern: /^(03|05|07|08|09)[0-9]{8}$/, message: 'Số điện thoại không hợp lệ!' }
  ];

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
      const response = await axios.get('/api/doctor/get-alldoctors');
      setDoctors(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      message.error('Không thể lấy dữ bác sĩ');
    }
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

  const handlePatientSelect = async (patient) => {
    fetchDistricts(patient.provinceId);
    fetchWards(patient.districtId);
    form.resetFields()
    // Convert gender to match form values
    const genderValue = patient.gender === 'Nam' ? 'male' : 
                       patient.gender === 'Nữ' ? 'female' : 'other';

    // Format date string to YYYY-MM-DD
    const dateOfBirth = patient.dateOfBirth ? patient.dateOfBirth.split('T')[0] : '';

    // Set patient form fields
    form.setFieldsValue({
      ReceptionId: patient.receptionId,
      PatientId: patient.patientId,
      addingPatient: {
        identityCardNumber: patient.identityCardNumber,
        name: patient.name,
        gender: genderValue,
        dateOfBirth: dateOfBirth,
        phoneNumber: patient.phoneNumber,
        email: patient.email,
        wardId: patient.wardId,
        districtId: patient.districtId,
        provinceId: patient.provinceId,
        ethnicity: patient.ethnicity
      }
    });

    // If patient has receptionId, fetch reception details
    if (patient.receptionId) {
 
      try {
        const response = await axios.get(`/api/reception/${patient.receptionId}`);
        const receptionData = response.data.data;
     
        setIsUpdate(true);
        setReceptionId(patient.receptionId);
        // Chuyển đổi serviceId thành serviceCatalogId
        const convertedServices = receptionData.medicalServiceRequest.map(service => ({
          ...service,
          serviceCatalogId: service.serviceId, // Chuyển đổi từ serviceId sang serviceCatalogId
          quantity: service.quantity,
          discount: service.discount,
          serviceTotalAmount: service.serviceTotalAmount,
          departmentId: service.departmentId,
          doctor: service.assignedById
        }));

        // Set form values với dữ liệu đã chuyển đổi
        form.setFieldsValue({
          sequenceNumber: receptionData.sequenceNumber,
          isPriority: receptionData.isPriority,
          receptionLocationId: receptionData.receptionLocationId,
          receptionistId: receptionData.receptionistId,
          note: receptionData.note,
          assignedDoctorId: receptionData.assignedDoctorId,
          reasonForVisit: receptionData.reasonForVisit,
          medicalServiceRequests: convertedServices,
          
        });
      } catch (error) {
        console.error('Error fetching reception details:', error);
        message.error('Không thể lấy thông tin tiếp nhận');
      }
    } else {
      setIsUpdate(false);
      setReceptionId(null);
    }
  };

  const handleAddressSelect = (addressDetails) => {
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

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Thêm các trường của patient
      Object.keys(values.addingPatient).forEach(key => {
        if (key === 'gender') {
          formData.append(`AddingPatient.${key}`, 
            values.addingPatient[key] === 'male' ? 'Nam' :
            values.addingPatient[key] === 'female' ? 'Nữ' : 'Khác'
          );
        } else if (key === 'avatarFile' && values.addingPatient[key]?.[0]?.originFileObj) {
          formData.append('AddingPatient.AvatarFile', values.addingPatient[key][0].originFileObj);
        } else {
          formData.append(`AddingPatient.${key}`, values.addingPatient[key] || '');
        }
      });

      // Thêm các trường của reception
      formData.append('SequenceNumber', values.sequenceNumber ?? "");
      formData.append('IsPriority', values.isPriority ?? false);
      formData.append('PatientId', values.PatientId ?? "");
      formData.append('ReceptionLocationId', values.receptionLocationId ?? "");
      formData.append('ReceptionistId', values.receptionistId ?? "");
      formData.append('Note', values.note ?? "");
      formData.append('AssignedDoctorId', values.assignedDoctorId ?? "");
      formData.append('ReasonForVisit', values.reasonForVisit ?? "");

      // Thêm medical service requests
      values.medicalServiceRequests.forEach((service, index) => {
        formData.append(`MedicalServiceRequest[${index}].ServiceId`, service.serviceCatalogId ?? "");
        formData.append(`MedicalServiceRequest[${index}].Quantity`, service.quantity ?? 1);
        formData.append(`MedicalServiceRequest[${index}].Discount`, service.discount ?? 0);
        formData.append(`MedicalServiceRequest[${index}].ServiceTotalAmount`, service.serviceTotalAmount ?? 0);
        formData.append(`MedicalServiceRequest[${index}].DepartmentId`, service.departmentId ?? "");
        formData.append(`MedicalServiceRequest[${index}].IsApproved`, true);
        formData.append(`MedicalServiceRequest[${index}].Status`, true);
        formData.append(`MedicalServiceRequest[${index}].AssignedById`, service.doctor ?? "");
      });

      const url = isUpdate ? `/api/reception/${receptionId}` : '/api/reception';
      const method = isUpdate ? 'put' : 'post';

      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
      const response = await axios[method](url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200 ||response.status === 201 ) {
        message.success(isUpdate ? 'Cập nhật tiếp nhận thành công' : 'Thêm tiếp nhận thành công');
        form.resetFields();
        localStorage.removeItem("formData");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error(error.response?.data?.message || 'Gửi biểu mẫu thất bại');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalAmount = (services) => {
    return services.reduce((total, service) => {
      const quantity = service.quantity || 1;
      const discount = service.discount || 0;
      const amount = service.serviceTotalAmount || 0;
      return total + (amount * quantity * (1 - discount / 100));
    }, 0);
  };

  useEffect(() => {
    const currentServices = form.getFieldValue('medicalServiceRequests') || [];
    const total = calculateTotalAmount(currentServices);
    setTotalAmount(total);
  }, [form]);

  const handleServiceSelect = async (serviceId, index) => {
    setLoadingServices(true);
    try {
      const response = await axios.get(`/api/servicecatalog/${serviceId}`);
      const serviceData = response.data.data;
      console.log(serviceId)
      const currentServices = form.getFieldValue('medicalServiceRequests');
      currentServices[index] = {
        ...currentServices[index],
        serviceTotalAmount: serviceData.price,
        departmentId: serviceData.departmentId
      };
      
      form.setFieldsValue({
        medicalServiceRequests: currentServices
      });
    } catch (error) {
      console.error('Error fetching service details:', error);
      message.error('Không thể lấy thông tin dịch vụ');
    } finally {
      setLoadingServices(false);
    }
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
            gridTemplateColumns: '1.5fr 6fr 6fr 12fr',
            gap: '16px'}}>
          <span>Tìm bệnh nhân</span>
          <PatientSearch 
          type="cccd" 
          onPatientSelect={handlePatientSelect}
                           />
          <PatientSearch 
          type="name" 
          onPatientSelect={handlePatientSelect}
          />

          <div style={{  display: 'flex', justifyContent: 'flex-end',  gap: '16px'}}>
          <Form.Item
            label="Id bệnh nhân"
            name='PatientId'
            layout="horizontal"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            label="Id Tiếp nhận"
            name='ReceptionId'
            layout="horizontal"
          >
            <Input disabled={true} />
          </Form.Item>
          <Button danger onClick={() => form.resetFields()}>
            Reset
          </Button>
          </div>
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
              rules={identityCardRules}
            >
         
              <Input />
            </Form.Item>

            <Form.Item
              label="Họ và Tên"
              name={['addingPatient', 'name']}
              rules={nameRules}
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
              rules={phoneRules}
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
            label="Lý do khám"
            name="reasonForVisit"
          >
            <TextArea rows = {2} />
          </Form.Item>

          <Form.Item
            label="Bác sĩ chỉ định"
            name="assignedDoctorId"
          >
            <Select>
              {doctors.map(doctor => (
                <Option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.name}
                </Option>
              ))}
            </Select>
       
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
                  <Space key={key} style={{ display: 'flex', marginBottom: 8, gap: "5%", alignItems: 'flex-end' }} >
                    <Form.Item
                      {...restField}
                      name={[name, 'serviceCatalogId']}
                      rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                    >
                      <Select 
                       showSearch
                       defaultValue = 'null'
                        loading={loadingServices}
                        placeholder="Chọn dịch vụ"
                        onChange={(value) => handleServiceSelect(value, name)}
                        style={{ width: 300 }}
                        popupMatchSelectWidth={false}
                        placement='bottomLeft'
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        
                      >
                        {services.map((service) => (
                          <Option 
                            key={service.serviceCatalogId} 
                            value={service.serviceCatalogId}
                            label = {` ${service.name} - ${service.price.toLocaleString('vi-VN')}đ `}
                          >
                            {service.name} - {service.price.toLocaleString('vi-VN')}đ
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
                      <InputNumber min={1} defaultValue = '1'/>
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
                      style={{ flexGrow: "8" }}
                    >
                      <Select placeholder="Chọn phòng ban">
                        {departments.map((department) => (
                          <Option key={department.departmentId} value={department.departmentId}>
                            {department.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm dịch vụ
                  </Button>
                </Form.Item>
                
                <div style={{ marginTop: 16 }}>
                  <strong>Tổng tiền: {totalAmount.toLocaleString('vi-VN')}đ</strong>
                </div>
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
