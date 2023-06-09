import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { observer } from 'mobx-react';
import cs from 'classnames';

import Table from '@c/table';
import Pagination from '@c/pagination';
import EmptyTips from '@c/empty-tips';
import Loading from '@c/loading';
import OwnerStore from '@c/employee-or-department-picker/store';
import { getTwoDimenArrayHead } from '@lib/utils';

import { ActionStatus } from '.';
import { getUserAdminInfo } from '../../api';
import { buildGraphQLQuery } from '../../utils';

interface IEmployeeTable {
  className?: string;
  userName?: string;
  depID: string | null;
  ownerStore: OwnerStore;
  userLeader: Leader;
  onChange: (leader: Leader) => void;
  actionStatus: ActionStatus;
}

const userGraphQL = '{users{id,phone,useStatus,email,name,departments{id,name},leaders{id,name}},total}';

export default observer(function EmployeeTable({
  onChange,
  className,
  depID,
  userName,
  ownerStore,
  userLeader,
  actionStatus,
}: IEmployeeTable) {
  const store = ownerStore.employeeStore;
  const { current, pageSize } = store.pagination;
  const [isLoading, setIsLoading] = React.useState(true);
  const { setLeader } = ownerStore;
  const { data } = useQuery(
    [
      'GET_USER_ADMIN_INFO',
      { depID, userName, page: current, limit: pageSize },
    ],
    ({ queryKey }) => {
      const {
        depID,
        userName,
        limit,
        page,
      } = (queryKey[1] as { depID: string; userName: string; limit: number; page: number});
      const queryGraphQL = buildGraphQLQuery({
        departmentID: depID,
        name: userName,
        page,
        size: limit,
      });
      return getUserAdminInfo<{
        users: Employee[];
        total: number
      }>({
        query: `{${queryGraphQL}${userGraphQL}}`,
      }).then((res) => {
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

  const isDirect = actionStatus === 'direct';

  function renderTotalTip(): JSX.Element {
    return (
      <div className="text-12 text-gray-600 ">
        {userLeader.name && (
          <>
            {isDirect ? '关联' : '转让'}
            <span className="mx-4">{userLeader.name}</span>
            {isDirect ? '为直属上级' : '为超级管理员'}
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
              Header: '员工姓名',
              id: 'name',
              fixed: true,
              width: 120,
              accessor: ({ id, name }: Employee) => {
                const checked = (userLeader.id === id) || (leader.id === id);
                const handleModifyModal = (): void => {
                  setLeader(id, name);
                  onChange({ id, name });
                };
                return (
                  <label className="cursor-pointer hover:text-blue-600" htmlFor={id}>
                    <input
                      id={id}
                      name="employee"
                      type="radio"
                      value={id}
                      className="mr-2 cursor-pointer"
                      onClick={handleModifyModal}
                      defaultChecked={checked}
                    />
                    {name}
                  </label>
                );
              },
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
              accessor: ({ departments }: Employee) => {
                return getTwoDimenArrayHead(departments)?.name;
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
