import React from 'react';
import { Route } from 'react-router-dom';

import './index.scss';
import SideNavs from './side-navs';
import AppAdmin from './app-admin';
import AppInfo from './app-info';
import DataModels from './data-models';
import PageMenuDesign from './page-menu-design';
import UsersAndPermissions from './users-and-permissions';

const WorkFlows = React.lazy(() => import('../../work-flow-list'));

function AppDetailsContent() {
  return (
    <>
      <div className='apps-management-height flex'>
        <SideNavs />
        <Route exact path='/apps/details/:appID/page_setting' component={PageMenuDesign} />
        <Route exact path='/apps/details/:appID/custom_page' component={() => null} />
        <Route exact path='/apps/details/:appID/setting_flow' component={WorkFlows} />
        <Route exact path='/apps/details/:appID/data_models' component={DataModels} />
        <Route exact path='/apps/details/:appID/file_api' component={() => null} />
        <Route exact path='/apps/details/:appID/base_info' component={AppInfo} />
        <Route exact path='/apps/details/:appID/app_permission' component={UsersAndPermissions} />
        <Route exact path='/apps/details/:appID/app_manager' component={AppAdmin} />
      </div>
    </>
  );
}

export default AppDetailsContent;
