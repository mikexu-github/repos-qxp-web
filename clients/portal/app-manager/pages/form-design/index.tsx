import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import FormBuild from './form-build';
import PageSetting from './page-setting';
import PublishForm from './publish-form';
import FormDesignHeader from './header';

import store from './store';

import './index.scss';

function FormDesign() {
  const { pageType, appId, pageId } = useParams<any>();

  useEffect(() => {
    store.setAppID(appId);
    store.setPageID(pageId);
  }, [appId, pageId]);

  return (
    <div style={{ height: '100vh' }} className='flex flex-col form-design'>
      <FormDesignHeader />
      {pageType === 'formBuild' && (<FormBuild />)}
      {pageType === 'pageSetting' && (<PageSetting />)}
      {pageType === 'publishForm' && (<PublishForm />)}
    </div>
  );
}

export default FormDesign;
