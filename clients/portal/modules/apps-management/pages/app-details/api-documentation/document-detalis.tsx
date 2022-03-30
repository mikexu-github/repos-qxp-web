import React, { useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { UnionColumn } from 'react-table';
import cs from 'classnames';

import Tab from '@c/tab';
import Icon from '@c/icon';
import { Table } from '@one-for-all/headless-ui';
import Loading from '@c/loading';
import Tooltip from '@c/tooltip';
import EmptyTips from '@c/empty-tips';
import TextHeader from '@c/text-header';
import { copyContent } from '@lib/utils';

import store from './store';

import '../prism.css';
import ApiDetails from './api-details';

export const FIELD_COLUMNS: UnionColumn<ModelField>[] = [
  {
    Header: '字段名称',
    id: 'title',
    accessor: 'title',
  },
  {
    Header: '字段标识',
    id: 'id',
    accessor: (rowData) => (
      <div className='flex relative items-center field-id'>
        <span>{rowData.id}</span>
        <Tooltip
          position="top"
          label="复制"
        >
          <Icon
            name="content_copy"
            size={16}
            className='text-inherit ml-10 copy-tooltip invisible icon-text-btn'
            onClick={() => copyContent(rowData.id, '标志已复制')}
          />
        </Tooltip>
      </div>
    ),
  },
  {
    Header: '数据格式',
    id: 'type',
    accessor: 'type',
  },
  {
    Header: '是否允许为空',
    id: 'not_null',
    accessor: (rowData) => rowData.not_null ? '允许' : '不允许',
  },
  {
    Header: '是否作为外键',
    id: 'isForeignKeys',
    accessor: (rowData) => (
      <span className={cs('foreign-key-col', {
        'text-blue-600 bg-blue-100': rowData.isForeignKeys,
      })}>{rowData.isForeignKeys ? '是' : '否'}</span>
    ),
  },
];

function isNsNode(): boolean {
  const curNode = toJS(store.currentDataModel);
  return 'parent' in curNode && 'subCount' in curNode;
}

function isApiNode(): boolean {
  const curNode = toJS(store.currentDataModel);
  return 'fullPath' in curNode && 'url' in curNode;
}

function ApiDocumentDetails(): JSX.Element {
  const tabItems = [
    {
      id: 'fields',
      name: '全部字段',
      content: (
        <>
          <div style={{ maxHeight: 'calc(100% - 45px)' }} className='flex w-full'>
            <Table
              className='massage_table'
              rowKey="id"
              columns={FIELD_COLUMNS}
              data={store.fields}
              emptyTips={<EmptyTips text='暂无消息数据' className="pt-40" />}
            />
          </div>
          <div className='px-16 py-12 border-t-1 text-12'>共{store.fields.length}条数据</div>
        </>
      ),
    },
    {
      id: 'create',
      name: '新增',
      content: store.isAPILoading ? <Loading /> : <ApiDetails apiPath={store.ApiPath} />,
    },
    {
      id: 'delete',
      name: '删除',
      content: store.isAPILoading ? <Loading /> : <ApiDetails apiPath={store.ApiPath} />,
    },
    {
      id: 'update',
      name: '更新',
      content: store.isAPILoading ? <Loading /> : <ApiDetails apiPath={store.ApiPath} />,
    },
    {
      id: 'get',
      name: '查询单条',
      content: store.isAPILoading ? <Loading /> : <ApiDetails apiPath={store.ApiPath} />,
    },
    {
      id: 'search',
      name: '查询多条',
      content: store.isAPILoading ? <Loading /> : <ApiDetails apiPath={store.ApiPath} />,
    },
  ];

  useEffect(() => {
    if (isApiNode()) {
      store.useFieldsID = false;
      store.docType = 'curl';
      store.currentDataModel.fullPath && store.setApiPath(store.currentDataModel.fullPath);
      store.fetchApiDoc('curl', false);
    }
  }, [store.currentDataModel]);

  if (!store.tableID && !store.apiNsList.length) {
    return <EmptyTips text='暂无数据模型' className="pt-40 m-auto" />;
  }

  if (store.isAPITabLoading && store.tableID) {
    return <Loading />;
  }

  function renderMain(): JSX.Element {
    if (isNsNode() || (!isApiNode() && !store.tableID)) {
      return (
        <div className='px-20 py-20 text-14'>选择 namespace 下的 API 来查看接口文档</div>
      );
    }
    if (isApiNode()) {
      return (
        <div className='px-20'>
          {store.isAPILoading ? <Loading /> : <ApiDetails apiPath={store.ApiPath} />}
        </div>
      );
    }

    return (
      <Tab
        items={tabItems}
        className='w-full h-full api-tab'
        onChange={(v) => {
          if (v !== 'fields') {
            store.fetchXName(v as ApiType);
          }
        }}
      />
    );
  }

  return (
    <div
      className='relative flex-1 overflow-hidden bg-white rounded-tr-12 w-1 flex flex-col'
    >
      <TextHeader
        title={store.currentDataModel?.title || '------'}
        itemTitleClassName="text-12 font-semibold"
        className="bg-gray-1000 p-16 header-background-image h-44 shadow-header rounded-t-12"
      />
      <div className='relative flex-1 overflow-auto'>
        {renderMain()}
      </div>
    </div>
  );
}

export default observer(ApiDocumentDetails);
