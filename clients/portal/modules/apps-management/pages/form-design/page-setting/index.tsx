import React from 'react';
import { observer } from 'mobx-react';

import FormAppDataTableContent from '@c/form-app-data-table/form-app-data-content';
import Button from '@c/button';

import store from '../store';
import PageSettingConfig from './page-setting-config';
import PageNoSearchFilter from './page-no-search-filter';

import './index.scss';

function PageSetting(): JSX.Element {
  return (
    <>
      <div className='form-design-tool'>
        <span className='text-underline-no-color cursor-pointer flex-1'>
          🎬 查看新手指引
        </span>
        <Button onClick={store.savePageConfig} iconName='save' modifier="primary">
          保存页面设置
        </Button>
      </div>
      <div className='flex-1 flex  overflow-hidden'>
        <div className='flex-1 p-20 overflow-hidden'>
          <p className='text-caption-no-color text-gray-400 mb-8'>预览页面视图</p>
          <PageNoSearchFilter/>
          <FormAppDataTableContent store={store.appPageStore} />
        </div>
        <PageSettingConfig />
      </div>
    </>
  );
}

export default observer(PageSetting);
