import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Message } from '@QCFE/lego-ui';

import TextHeader from '@c/text-header';
import Button from '@appC/button';
import Table, { Column } from '@c/app-table';
import { appAddAdmin, fetchAppAdminUsers, delAppAdminUsers } from '@appLib/api';
import EmployeeOrDepartmentPickerModal from '@c/employee-or-department-picker-modal';

function AppAdmin() {
  const [employeeVisible, setEmployeeVisible] = useState(false);
  const [selectedIdArr, setSelectedArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const { appId } = useParams<any>();
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState({ page: 1, limit: 20, id: appId });
  const [appAdminList, setAppAdminList] = useState<Employee[]>([]);

  const handleChangeParams = (newParams: any) => {
    setParams({ ...params, ...newParams });
  };

  const fetchAdmins = () => {
    setLoading(true);
    fetchAppAdminUsers(params).then((res) => {
      setLoading(false);
      setTotal(res.data.total_count);
      setAppAdminList(res.data.data || []);
    });
  };

  const removeAdmin = (idArr: string[]) => {
    delAppAdminUsers({ appID: appId, userIDs: idArr }).then(() => {
      setAppAdminList(appAdminList.filter(({ id }) => !idArr.includes(id)));
    });
  };

  const handleSelectChange = (selectedArr: any) => {
    setSelectedArr(selectedArr);
  };

  const addAdmin = (employees: any) => {
    if (employees.length === 0) {
      Message.error('请选择添加为管理员的员工');
      return;
    }

    appAddAdmin({ appId, userIDs: employees.map(({ id }: Employee) => id) }).then(() => {
      fetchAdmins();
      setEmployeeVisible(false);
    });
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const columns: Column[] = React.useMemo(() => [
    {
      id: 'userName',
      Header: '员工',
      accessor: 'userName',
    },
    {
      id: 'phone',
      Header: '手机号',
      accessor: 'phone',
    },
    {
      id: 'email',
      Header: '邮箱',
      accessor: 'email',
    },
    {
      id: 'dep',
      Header: '部门',
      accessor: ({ dep }: Employee) => {
        return dep.departmentName || '未分配部门';
      },
    },
    {
      id: 'action',
      Header: '操作',
      accessor: ({ id }: any): JSX.Element =>
        <span onClick={() => removeAdmin([id])} className='text-btn'>移除</span>,
    },
  ], [appAdminList]);

  return (
    <>
      <TextHeader
        title="应用管理员"
        className="my-app-header header-background-image "
      />
      <div className='px-20 py-24'>
        <div className='mb-20 flex'>
          <Button onClick={() => setEmployeeVisible(true)} className='mr-16' isPrimary icon='add'>
            添加管理员
          </Button>
          {selectedIdArr.length > 0 && (
            <Button onClick={() => removeAdmin(selectedIdArr)} isPrimary icon='restore_from_trash'>
              批量移除
            </Button>
          )}
        </div>
        <Table
          showCheckBox
          selectKey='id'
          columns={columns}
          data={appAdminList}
          loading={loading}
          pageSize={params.limit}
          currentPage={params.page}
          total={total}
          onSelectChange={handleSelectChange}
          onPageChange={(page: number) => handleChangeParams({ page })}
          onShowSizeChange={(limit: number) => handleChangeParams({ limit })}
        />
        <EmployeeOrDepartmentPickerModal
          visible={employeeVisible}
          onOk={addAdmin}
          roleID=''
          onCancel={() => setEmployeeVisible(false)}
        />
      </div>
    </>
  );
}

export default AppAdmin;
