import React, { useState } from 'react';
import { twCascade } from '@mariusmarais/tailwind-cascade';
import { Control, Icon, Input } from '@QCFE/lego-ui';

import TextHeader from '@portal/components/text-header';
import { DepartmentStaff } from '@portal/components/department-staff';

import DepartmentsTree from './departments-tree';
import { PersonInfo } from './person-info';

export default function MailList() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [currentDepartment, setCurrentDepartment] = useState<IDepartment | null>(null);
  const [lastWord, setLastWord] = useState<string>('');

  const search = (keyWord: string) => {
    setSearchWord(keyWord);
  };

  function handleSearch(e: KeyboardEvent): void {
    if (e.key !== 'Enter') {
      return;
    }
    setLastWord(searchWord);
  }

  const handleClear = () => {
    search('');
    setLastWord('');
  };

  return (
    <div className="transition-opacity flex-column flex-1">
      <TextHeader
        title="企业通讯录"
        desc="管理账号，如添加、编辑、删除账号等，同时还能关联每个账号的角色；用户可用账号名称或邮件登录全象云平台。"
        action="📌 如何管理通讯录？"
        className="bg-gray-1000 px-20 py-16 header-background-image"
        itemTitleClassName="text-h5"
      />
      <div className="h-full flex-column overflow-y-h">
        <div
          className={twCascade(
            'w-208 ml-20 mt-20 bg-gray-100 rounded-r-6 rounded-tl-2',
            'rounded-bl-6 flex items-center',
          )}
        >
          <Control className="has-icons-left has-icons-right flex-1 control-set">
            <Icon className="is-left" name="magnifier" />
            <Input
              type="text"
              placeholder="搜索员工名称"
              name="search"
              onChange={(_: Event, value: string) => search(value)}
              value={searchWord}
              onKeyDown={handleSearch}
              onBlur={() => setLastWord(searchWord)}
            />
            {searchWord !== '' && (
              <Icon
                className="is-right"
                name="close"
                clickable
                onClick={handleClear}
              />
            )}
          </Control>
        </div>
        <div className="h-full mt-4 flex items-start overflow-y-h">
          <div className="w-259 h-full flex-col flex">
            <DepartmentStaff department="组织架构" />
            <DepartmentsTree onSelect={setCurrentDepartment} />
          </div>
          <div className="vertical-line flex-grow-0"></div>
          {
            currentDepartment && (
              <PersonInfo
                keyword={lastWord}
                departmentId={currentDepartment.id}
                handleClear={handleClear}
                departmentName={currentDepartment.departmentName}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}
