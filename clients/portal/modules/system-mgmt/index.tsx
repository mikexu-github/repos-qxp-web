import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import ErrorTips from '@c/error-tips';
import { usePortalGlobalValue } from '@portal/states_to_be_delete/portal';

const Message = lazy(() => import('./message'));
const SendMessage = lazy(() => import('./send-message'));
const MessageDetails = lazy(() => import('./message-details'));
const Dataset = lazy(() => import('./dataset'));
const Log = lazy(()=> import('./audit-log'));

export default function Index() {
  const [{ userInfo }] = usePortalGlobalValue();
  const { path } = useRouteMatch();

  // todo: 确定具体的authority?
  if (!userInfo.authority.includes('platform')) {
    return <ErrorTips desc="您没有权限, 请联系管理员..." />;
  }

  return (
    <Switch>
      <Route exact path={`${path}/message`} component={Message} />
      <Route exact path={`${path}/log`} component={Log} />
      <Route path={`${path}/message/send`} component={SendMessage} />
      <Route path={`${path}/message/details/:id`} component={MessageDetails} />
      <Route path={`${path}/dataset/:dataId?`} component={Dataset} />
      <Redirect from={path} to={`${path}/message`} />
      <Route component={() => (<ErrorTips desc={'Menu page is not found'} />)} />
    </Switch>
  );
}
