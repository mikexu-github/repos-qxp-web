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
  const [selectedIdArr, setSelectedArr] = useState([])
  const [loading, setLoading] = useState(false);
  const [appAdminList, setAppAdminList] = useState<Employee[]>([]);
  const { appId } = useParams<any>();

  const removeAdmin = (idArr: string[]) => {
    delAppAdminUsers({ appID: appId, userIDs: idArr }).then(() => {
      setAppAdminList(appAdminList.filter(({ id }) => !idArr.includes(id)));
    });
  };

  const handleSelectChange = (selectedArr: any) => {
    setSelectedArr(selectedArr);
  };

  const addAdmin = (ids: EmployeeOrDepartmentOfRole[]) => {
    if (ids.length === 0) {
      Message.error('请选择添加为管理员的员工');
      return;
    }

    appAddAdmin({ appId, userIDs: ids.map(({ id }) => id) }).then(() => {
      setEmployeeVisible(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchAppAdminUsers(appId).then((res) => {
      setLoading(false);
      setAppAdminList(res.data);
    });
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
      accessor: ({ dep }: any) => {
        return dep.departmentName || '未分配部门';
      },
    },
    {
      id: 'action',
      Header: '操作',
      accessor: ({ id }: any): JSX.Element =>
        <span onClick={() => removeAdmin([id])} className='text-btn'>移除</span>,
    },
  ], [])

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
          // offset={offset}
          // limit={limit}
          // total={total}
          showCheckBox
          selectKey='id'
          columns={columns}
          data={appAdminList}
          onSelectChange={handleSelectChange}
          loading={loading}
        // onResetQuery={this.props.onResetQuery}
        // onPageChange={this.handlePageChange}
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
