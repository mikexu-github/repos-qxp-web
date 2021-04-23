
import React, { useState } from 'react';
import useCss from 'react-use/lib/useCss';

import Card from '@c/card';

import WorkFlowListTable from './table';
import WorkFlowToolbar from './toolbar';

export default function WorkFlowCard() {
  const contentHeight = useCss({
    height: 'calc(100% - 56px)',
  });
  const [triggerType, setTriggerType] = useState<'' | 'FORM_TIME' | 'FORM_DATA'>('');

  return (
    <div className="h-full flex-grow bg-white rounded-12">
      <Card
        title="工作流"
        className="h-full transition-opacity flex flex-col flex-1 mt-0"
        headerClassName="bg-gray-1000 px-20 py-16 header-background-image h-56 shadow-header"
        itemTitleClassName="text-h5"
        desc="可以定义平台内的账号拥有的权限。"
        action={<a className="ease-linear text-underline">📌 快速开始？</a>}
        contentClassName={contentHeight}
        descClassName="text-caption"
      >
        <div className="flex flex-col w-full p-20">
          <WorkFlowToolbar onTriggerTypeChange={setTriggerType} />
          <WorkFlowListTable type={triggerType} />
        </div>
      </Card>
    </div>
  );
}
