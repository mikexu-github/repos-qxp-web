import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { observer } from 'mobx-react';
import cs from 'classnames';

import Table from '@c/table';
import Pagination from '@c/pagination';
import EmptyTips from '@c/empty-tips';

import { adminSearchUserList } from '@portal/modules/access-control/role-management/api';
import Loading from '@c/loading';

import OwnerStore from '@c/employee-or-department-picker/store';

interface IEmployeeTable {
  className?: string;
  userName?: string;
  depID: string | null;
  ownerStore: OwnerStore;
  userLeader: Leader;
}

export default observer(function EmployeeTable({
  className,
  depID,
  userName,
  ownerStore,
  userLeader,
}: IEmployeeTable) {
  const store = ownerStore.employeeStore;
  const { current, pageSize } = store.pagination;
  const [isLoading, setIsLoading] = React.useState(true);

  const { data } = useQuery(
    [
      'adminSearchUserList',
      { depID, userName, page: current, limit: pageSize },
    ],
    (params) => {
      return adminSearchUserList({ queryKey: params.queryKey }).then((res) => {
        setIsLoading(false);
        return res;
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!depID,
    },
  );
  const { leader } = ownerStore;
  useEffect(() => {
    store.setCurrentPage(1);
    store.setSelectedKeys([]);
    store.setTotal(0);
    ownerStore.setLeader(userLeader.id, userLeader.userName);
  }, [depID]);
  useEffect(() => {
    if (data?.total) {
      store.setTotal(data.total);
    }
    if (data?.users) {
      store.initialSelectedKeys(data.users, ownerStore.owners);
    }
  }, [data, ownerStore.owners]);

  if (isLoading) {
    return <Loading desc="加载中..." />;
  }

  function renderTotalTip() {
    return (
      <div className="text-12 text-gray-600 ">
        {userLeader.userName && (
          <>
            关联
            <span className="mx-4">
              {leader.userName}
            </span>
            为直属上级
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={cs('h-full bg-white', className)}
    >
      <div
        className="flex w-full border-b"
        style={{ height: 'calc(100% - 80px)' }}
      >
        <Table
          rowKey="id"
          data={data?.users || []}
          emptyTips={<EmptyTips text="无成员数据" className="py-10" />}
          columns={[
            {
              Header: '',
              id: 'radio',
              fixed: true,
              width: 40,
              accessor: ({ id, userName }: Employee) => {
                const checked = userLeader.id === id;
                const handleModifyModal = () => {
                  ownerStore.setLeader(id, userName );
                };
                return (
                  <input
                    name="employee"
                    type="radio"
                    value={id}
                    onClick={handleModifyModal}
                    defaultChecked={checked}
                  />);
              },
            },
            {
              Header: '员工姓名',
              id: 'userName',
              fixed: true,
              accessor: 'userName',
            },
            {
              Header: '手机号',
              id: 'phone',
              accessor: 'phone',
            },
            {
              Header: '邮箱',
              id: 'email',
              accessor: 'email',
            },
            {
              Header: '部门',
              id: 'dep.departmentName',
              accessor: ({ dep }: Employee) => {
                return dep?.departmentName;
              },
            },
          ]}
        />
      </div>
      <div className="h-52 bg-white">
        <Pagination
          {...store.pagination}
          renderTotalTip={renderTotalTip}
          showLessItems
          onChange={store.setPagination}
          className="border-t border-gray-200"
        />
      </div>
    </div>
  );
});