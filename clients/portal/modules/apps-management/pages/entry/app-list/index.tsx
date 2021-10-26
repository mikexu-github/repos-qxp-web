import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useTitle } from 'react-use';

import TextHeader from '@c/text-header';

import CreatedAppModal from './app-edit/created-app-modal';
import Header from './header';
import AppList from './app-list';
import store from './store';
import './index.scss';

function MyApp(): JSX.Element {
  const [modalType, setModalType] = useState('');
  const { isListLoading, changeParams, params, appList, countMaps } = store;

  useTitle('应用管理 - 我的应用');

  useEffect(() => {
    store.changeParams({});
    return () => {
      store.isListLoading = true;
    };
  }, []);

  return (
    <>
      <TextHeader
        title="我的应用"
        desc="一个应用是由若干表单、流程表单、报表、自定义页面组成的业务管理系统。"
        // action="👋 快速开始"
        className="app-list-headertitle bg-gray-1000 px-20 py-16 header-background-image"
        itemTitleClassName="text-h5"
      />
      <Header
        countMaps={countMaps}
        setModalType={setModalType}
        changeParams={changeParams}
        params={params}
      />
      <AppList
        openCreatedModal={() => setModalType('CreatedApp')}
        isLoading={isListLoading}
        appList={appList}
      />
      {modalType === 'CreatedApp' && (<CreatedAppModal onCancel={() => setModalType('')} />)}
    </>
  );
}

export default observer(MyApp);
