import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SideNavCard from '@c/side-nav-card';
import ItemWithTitleDesc from '@c/item-with-title-desc';
import AppIcon from '@c/app-icon';

import AppList from './pages/entry/app-list';

const MENU = [
  {
    id: 'AppList',
    icon: 'dashboard_customize',
    name: '我的应用',
    url: '/apps',
  },
  // {
  //   id: 'PlatformSetting',
  //   icon: 'theme',
  //   name: '平台设置',
  // },
];

function AppManagerEntry() {
  return (
    <div className="app-entry-container">
      <SideNavCard
        className='w-316'
        cardTitle={(
          <div className="access-background-image p-20 opacity-90">
            <ItemWithTitleDesc
              title="应用管理"
              desc="对企业的自建应用进行统一管理"
              itemRender={(
                <AppIcon themeColor='amber' iconName='dashboard_customize' size={48} />
              )}
              titleClassName="text-h4"
              descClassName="text-caption"
            />
          </div>
        )}
        menuData={MENU}
      />
      <div className="app-right-box bg-opacity-50 bg-white">
        <Switch>
          <Route path="/apps" component={AppList} />
        </Switch>
      </div>
    </div>
  );
}

export default AppManagerEntry;
