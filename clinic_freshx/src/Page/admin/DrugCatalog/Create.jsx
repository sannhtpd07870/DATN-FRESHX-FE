import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message, InputNumber } from "antd";
import axios from "../../../services/axiosInstance";

const { Option } = Select;
const { TextArea } = Input;

const Create = ({ isActive, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    unitOfMeasureId: 0,
    manufacturerId: 0,
    countryId: 0,
    fullName: "",
    nameUnaccented: "",
    activeIngredient: "",
    usage: "",
    dosage: "",
    effect: "",
    drugTypeId: 0,
    drugClassification: "",
    routeOfAdministration: "",
    isSuspended: 0,
    nationalDrugCode: "",
    description: "",
    referenceNumber: "",
    note1: "",
    note2: "",
    note3: "",
    isDeleted: 0,
    quantityImported: 0,
    quantityInStock: 0,
    costPrice: 0,
    unitPrice: 0,
    managementPharmacyId: 0,
    departmentPharmacyId: 0
  });

  // States for related data
  const [units, setUnits] = useState([]);
  const [manufacturers, setSuppliers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [drugTypes, setDrugTypes] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch related data when modal opens
  useEffect(() => {
    if (isActive) {
      fetchRelatedData();
    }
  }, [isActive]);

  const fetchRelatedData = async () => {
    try {
      const [
        drugTypesRes,
        suppliersRes,
        countriesRes,
        unitsRes,
        pharmaciesRes
      ] = await Promise.all([
        axios.get('/api/drugtype'),
        axios.get('/api/supplier'),
        axios.get('/api/country'),
        axios.get('/api/unitofmeasure'),
        axios.get('/api/pharmacy')
      ]);

      setDrugTypes(drugTypesRes.data.data);
      setSuppliers(suppliersRes.data.data);
      setCountries(countriesRes.data.data);
      setUnits(unitsRes.data.data);
      setPharmacies(pharmaciesRes.data.data);
      console.log(drugTypesRes.data.data,"/n",suppliersRes.data.data, "/n", countriesRes.data.data,"/n", unitsRes.data.data,"/n", pharmaciesRes.data.data )
    } catch (err) {
      message.error("Không thể tải dữ liệu liên quan");
      console.log(err)  
    }
  };

  const handleChange = (name, value) => {
    console.log(`Field ${name} changed to:`, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("Data being sent:", formData);
      
      if (!formData.code || !formData.name) {
        throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
      }

      const dataToSend = {
        ...formData,
        unitOfMeasureId: Number(formData.unitOfMeasureId),
        manufacturerId: Number(formData.manufacturerId),
        countryId: Number(formData.countryId),
        drugTypeId: Number(formData.drugTypeId),
        managementPharmacyId: Number(formData.managementPharmacyId),
        departmentPharmacyId: Number(formData.departmentPharmacyId),
        costPrice: Number(formData.costPrice),
        unitPrice: Number(formData.unitPrice),
        quantityImported: Number(formData.quantityImported),
        quantityInStock: Number(formData.quantityInStock),
        isSuspended: Number(formData.isSuspended),
        isDeleted: Number(formData.isDeleted)
      };

      console.log("Formatted data:", dataToSend);

      const response = await axios.post("/api/drugcatalog", dataToSend);
      console.log("Response:", response.data);

      message.success("Tạo thuốc thành công!");
      onClose();
      onRefresh();
    } catch (err) {
      console.error("Error details:", err);
      message.error(err.response?.data?.message || "Đã xảy ra lỗi khi tạo thuốc.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo mới thuốc"
      visible={isActive}
      onCancel={onClose}
      width={1000}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Mã thuốc" required>
          <Input
            placeholder="Nhập mã thuốc"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Tên thuốc" required>
          <Input
            placeholder="Nhập tên thuốc"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Loại thuốc" required>
          <Select
            placeholder="Chọn loại thuốc"
            value={formData.drugTypeId}
            onChange={(value) => handleChange("drugTypeId", value)}
          >
            {drugTypes.map(type => (
              <Option key={type.drugTypeId} value={type.drugTypeId}>{type.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Nhà cung cấp" required>
          <Select
            placeholder="Chọn nhà cung cấp"
            value={formData.manufacturerId}
            onChange={(value) => handleChange("manufacturerId", value)}
          >
            {manufacturers.map(mfr => (
              <Option key={mfr.supplierId} value={mfr.supplierId}>{mfr.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Đơn vị tính" required>
          <Select
            placeholder="Chọn đơn vị tính"
            value={formData.unitOfMeasureId}
            onChange={(value) => handleChange("unitOfMeasureId", value)}
          >
            {units.map(unit => (
              <Option key={unit.unitOfMeasureId} value={unit.unitOfMeasureId}>{unit.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Quốc gia">
          <Select
            placeholder="Chọn quốc gia"
            value={formData.countryId}
            onChange={(value) => handleChange("countryId", value)}
          >
            {countries.map(country => (
              <Option key={country.countryId} value={country.countryId}>{country.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Nhà thuốc quản lý">
          <Select
            placeholder="Chọn nhà thuốc"
            value={formData.managementPharmacyId}
            onChange={(value) => handleChange("managementPharmacyId", value)}
          >
            {pharmacies.map(pharmacy => (
              <Option key={pharmacy.pharmacyId} value={pharmacy.pharmacyId}>{pharmacy.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Nhà thuốc Phòng ban">
          <Select
            placeholder="Chọn nhà thuốc"
            value={formData.departmentPharmacyId}
            onChange={(value) => handleChange("departmentPharmacyId", value)}
          >
            {pharmacies.map(pharmacy => (
              <Option key={pharmacy.pharmacyId} value={pharmacy.pharmacyId}>{pharmacy.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Hoạt chất">
          <Input
            placeholder="Nhập hoạt chất"
            value={formData.activeIngredient}
            onChange={(e) => handleChange("activeIngredient", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Cách dùng">
          <TextArea
            placeholder="Nhập cách dùng"
            value={formData.usage}
            onChange={(e) => handleChange("usage", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Liều dùng">
          <Input
            placeholder="Nhập liều dùng"
            value={formData.dosage}
            onChange={(e) => handleChange("dosage", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Giá nhập" required>
          <InputNumber
            min={0}
            value={formData.costPrice}
            onChange={(value) => handleChange("costPrice", value)}
          />
        </Form.Item>

        <Form.Item label="Giá bán" required>
          <InputNumber
            min={0}
            value={formData.unitPrice}
            onChange={(value) => handleChange("unitPrice", value)}
          />
        </Form.Item>

        <Form.Item label="Trạng thái">
          <Select
            value={formData.isSuspended}
            onChange={(value) => handleChange("isSuspended", value)}
          >
            <Option value={0}>Hoạt động</Option>
            <Option value={1}>Tạm ngưng</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            Tạo mới
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onClose}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Create;
