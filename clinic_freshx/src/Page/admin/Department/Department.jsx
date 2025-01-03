import { message } from "antd";
import BaseTable from "../../../components/admin/BaseTable";
const Department = () => {
   
    const columns = [
      {
        title: 'Mã phòng ban',
        dataIndex: 'code',
        key: 'code'
      },
      {
        title: 'Tên phòng ban', 
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Trạng thái',
        dataIndex: 'isSuspended',
        key: 'isSuspended',
        render: (isSuspended) => (isSuspended === 0 ? 'Hoạt động' : 'Tạm ngừng')
      }
    ];
  
    const fieldsConfig = [
        { name: 'name', label: 'Tên phòng ban' },
        { name: 'code', label: 'Mã phòng ban'},
        { name: 'departmentTypeId',
          label: 'Loại phòng ban',
          type: 'select',
          optionKey: 'departmentTypeId',
          optionValue: 'departmentTypeId',
          optionLabel: 'name', 
          optionConfig: {
            endpoint: '/api/departmenttype/get-departmenttypes',
            valueName: 'departmentTypeId', 
        }
        },
        { name: 'isSuspended',
          label: 'Trạng thái', 
          type: 'select', 
          optionKey: 'isSuspended', 
          optionValue: 'valueId', 
          optionLabel: 'name',
          optionConfig: {
            endpoint: '/api/status',
        },
        },
        { name: 'createdDate', label: 'Ngày Tạo', type: 'date' },
        { fetchnumber: '2'}
    ];


    const createConfig = {
        title: "Tạo phòng ban mới",
        endpoint: "/api/department",
        fields: [
           
            { 
                name: 'departmentTypeId', 
                label: 'Loại phòng ban', 
                type: 'select',
                width: '100%',
                messageRequired: 'Vui lòng chọn loại phòng ban',
                optionConfig: {
                    endpoint: '/api/departmenttype/get-departmenttypes',
                    valueKey: 'departmentTypeId',
                    labelKey: 'name'
                },
                span: 12
            },
            { 
                name: 'isSuspended', 
                label: 'Trạng thái', 
                type: 'select',
                width: '100%',
                optionConfig: {
                    endpoint: '/api/status',
                    valueKey: 'valueId',
                    labelKey: 'name'
                },
                span: 12
            }
        ]
    };

    return (
        <BaseTable
            endpoint="/api/department/all-departments"
            UpdateEndpoint="/api/department"
            DeleteEndpoint="/api/department"
            columns={columns}
            fieldsConfig={fieldsConfig}
            primaryKey="departmentId"
            createConfig={createConfig}
            searchPlaceholder="Tìm kiếm phòng ban"
            createButtonLabel="Tạo phòng ban mới"
        />
    );
};

export default Department;