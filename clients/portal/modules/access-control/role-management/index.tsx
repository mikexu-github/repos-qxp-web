import React, { useState, useEffect } from 'react';
import useCss from 'react-use/lib/useCss';
import { useQuery } from 'react-query';

import Card from '@c/card';
import ErrorTips from '@c/error-tips';

import RoleList from './role-list';
import RoleDetail from './role-detail';
import { getRoles } from './api';

export default function RoleManagement(): JSX.Element | null {
  const { data: roleList = [], isLoading } = useQuery('getRoles', getRoles, {
    refetchOnWindowFocus: false,
  });
  const [roleId, setRoleId] = useState<string | number>('');
  useEffect(() => {
    document.title = '访问控制 - 角色管理';
    if (roleList.length) {
      setRoleId(roleList[0].id);
    }
  }, [roleList]);

  const contentHeight = useCss({
    height: 'calc(100% - 56px)',
  });

  if (isLoading || !roleList.length) {
    return null;
  }
  if (!window.ADMIN_USER_FUNC_TAGS.includes('accessControl/role/read')) {
    return (
      <ErrorTips
        style={{ marginTop: '200px' }}
        desc="您没有权限, 请联系管理员..."
      />
    );
  }

  return (
    <Card
      className="h-full transition-opacity flex flex-col flex-1 mt-0"
      headerClassName="bg-gray-1000 px-20 py-16 header-background-image h-56"
      title="角色管理"
      itemTitleClassName="text-h5"
      desc="可以定义平台内的账号拥有的权限。"
      // action={<a className="ease-linear text-underline">📌 如何管理角色？</a>}
      contentClassName={contentHeight}
      descClassName="text-caption"
    >
      <div className="flex flex-grow  items-stretch h-full">
        <div className="h-full pb-4 w-259 border-r min-w-259">
          <RoleList items={roleList} onChange={setRoleId} />
        </div>
        <div className="h-full flex-grow p-20 pb-0">
          <RoleDetail role={roleList.find(({ id }) => id === roleId)} />
        </div>
      </div>
    </Card>
  );
}
