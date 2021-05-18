import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';

import HeaderNav from '@c/header-nav';
import toast from '@lib/toast';
import AppDropdown from '@c/app-dropdown';

import { fetchUserList } from '../../../lib/api';
import './index.scss';

function DetailsHeader() {
  const history = useHistory();
  const [appList, setAppList] = useState([]);
  const { appID } = useParams<{ appID: string}>();

  useEffect(() => {
    fetchUserList().then((res) => {
      if (res.data.data.findIndex(({ id }: AppInfo) => id === appID) === -1) {
        toast.error('应用不存在！2秒后跳转到首页');
        setTimeout(() => {
          history.replace('/');
        }, 2000);
      }
      setAppList(res.data.data);
    });
  }, []);

  const handleChange = (newAppId: string) => {
    history.replace(location.pathname.replace(appID, newAppId));
  };

  return (
    <div className="app-global-header app-details-header">
      <div className='flex items-center'>
        <HeaderNav {...{ name: '工作台', icon: 'home', inside: true, url: '/' }} />
        <span className='mr-16 ml-8'>/</span>
        <AppDropdown
          hiddenStatus={true}
          appList={appList}
          curApp={appID}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default observer(DetailsHeader);
