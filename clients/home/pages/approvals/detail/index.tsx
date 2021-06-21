import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useQuery } from 'react-query';
import { observer } from 'mobx-react';
import { pick } from 'lodash';

import Breadcrumb from '@c/breadcrumb';
import { useURLSearch } from '@lib/hooks';
import Tab, { TabItem } from '@c/tab';
import Icon from '@c/icon';
import Loading from '@c/loading';
import ErrorTips from '@c/error-tips';
import toast from '@lib/toast';
import { FormRenderer } from '@c/form-builder';

import Panel from './panel';
import Toolbar from './toolbar';
import ActionModals from './action-modals';
import * as apis from '../api';
import { wrapSchemaWithFieldPermission } from './utils';
import store from './store';

import './index.scss';

const globalActionKeys = [
  'canMsg', 'canViewStatusAndMsg', 'hasCancelBtn',
  'hasCcHandleBtn', 'hasReadHandleBtn', 'hasResubmitBtn', 'hasUrgeBtn',
];

function ApprovalDetail(): JSX.Element {
  const [search] = useURLSearch();
  const listType = search.get('list') || 'todo';
  const { processInstanceID, taskID, type } = useParams<
  { processInstanceID: string; taskID: string, type: string }>();
  const history = useHistory();

  const {
    isLoading, data, isError, error,
  } = useQuery<any, Error>(
    [processInstanceID, taskID, type],
    () => apis.getTaskFormById(processInstanceID, { type }),
  );

  useEffect(() => {
    document.title = '流程详情';
  }, []);

  const renderSchemaForm = (task: any): JSX.Element | null => {
    return (
      <div className='task-form'>
        <FormRenderer
          defaultValue={task.formData}
          schema={wrapSchemaWithFieldPermission(task.formSchema.table, task?.fieldPermission?.custom)}
          onFormValueChange={task.formData}
        />
      </div>
    );
  };

  const renderTabItems = (): TabItem<React.Key>[] => {
    if (isLoading) {
      return [];
    }

    if (!data || isError) {
      toast.error(error?.message);
      return [];
    }
    const items = data.taskDetailModels.map((task: any) => {
      return {
        id: task.taskId,
        name: task.taskName,
        content: (
          <>
            <Toolbar
              currTask={task}
              permission={task?.operatorPermission || {}}
              globalActions={pick(task || {}, globalActionKeys)}
              onClickAction={store.handleClickAction}
            />
            {renderSchemaForm(task)}
          </>
        ),
      };
    });
    return items || [];
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data || isError) {
    toast.error(error?.message);
    return <ErrorTips />;
  }

  const tasks = data.taskDetailModels;

  return (
    <div>
      <Breadcrumb
        segments={[
          {
            key: 'back', text: '返回', render: (seg) =>
              (
                <span className="inline-flex items-center cursor-pointer" onClick={() => history.goBack()}>
                  <Icon name="keyboard_backspace" className="mr-6" />返回
                </span>
              ),
          },
          { key: 'list', text: '审批列表', path: `/approvals?list=${listType}` },
          { key: 'current', text: data?.flowName },
        ]}
        className="px-24 py-20"
      />

      <div className="approval-detail w-full h-full flex px-20">
        <Panel className="flex flex-col flex-1 mr-20 px-24 py-24">
          {
            tasks.length === 1 && (
              <>
                <Toolbar
                  currTask={tasks[0]}
                  permission={tasks[0]?.operatorPermission || {}}
                  globalActions={pick(tasks[0] || {}, globalActionKeys)}
                  onClickAction={store.handleClickAction}
                />
                {renderSchemaForm(tasks[0])}
              </>
            )
          }
          {
            tasks.length > 1 && (<Tab
              items={renderTabItems()}
            />)
          }
        </Panel>
        <Panel className="approval-detail-tab w-400">
          <Tab
            items={[
              {
                id: 'history',
                name: '动态',
                content: (<div>动态</div>),
              },
              {
                id: 'discuss',
                name: '讨论',
                content: (<div>讨论</div>),
              },
            ]}
          />
        </Panel>
      </div>
      <ActionModals />
    </div>
  );
}

export default observer(ApprovalDetail);
