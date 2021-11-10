import React, { useState, useRef } from 'react';
import cs from 'classnames';
import { Input } from 'antd';
import { UnionColumns } from 'react-table';

import Icon from '@c/icon';
import Table from '@c/table';
import Button from '@c/button';
import Search from '@c/search';
import MoreMenu from '@c/more-menu';
import PopConfirm from '@c/pop-confirm';
import TableMoreFilterMenu from '@c/more-menu/table-filter';

import store from '../store';
import BuildModal from './build-modal';
import StatusDisplay from '../component/status';

import '../index.scss';

const { TextArea } = Input;

function DataList(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const { funcList, setModalType } = store;
  const inputRef: any = useRef(null);
  const COLUMNS: UnionColumns<FuncField>[] = [
    {
      Header: '名称',
      id: 'name',
      accessor: ({ name }: FuncField) => {
        return (
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => console.log('show details')} >
            {name}
          </span>
        );
      },
    },
    {
      Header: '标识',
      id: 'id',
      accessor: 'id',
    },
    {
      Header: () => {
        // todo make filter state effect
        return (
          <TableMoreFilterMenu
            menus={[
              { key: 'SUCCESS', label: '成功' },
              { key: 'ING', label: '进行中' },
              { key: 'FAILED', label: '失败' },
            ]}
            onChange={() => console.log('')}
          >
            <div className={cs('flex items-center cursor-pointer', {
              'pointer-events-none': true,
            })}>
              <span className="mr-4">状态</span>
              <Icon name="funnel" />
            </div>
          </TableMoreFilterMenu>
        );
      },
      id: 'status',
      accessor: ({ state }: FuncField) => {
        return (
          <StatusDisplay status={state} />
        );
      },
    },
    {
      Header: '描述',
      id: 'description',
      accessor: ({ description }: FuncField) => {
        return (
          <div className="description">
            <span ref={inputRef} className="turncate">{description}</span>
            <PopConfirm
              content={(
                <div
                  className="flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-body2 text-gray-600 mb-8">描述</div>
                  <TextArea
                    name="name"
                    ref={inputRef}
                    maxLength={30}
                    className="description-input"
                  />
                </div>
              )}
              okText="保存"
              onOk={() => console.log()}
              onCancel={() => console.log()}
            >
              <Icon clickable name='edit' className="ml-4 hidden cursor-pointer"/>
            </PopConfirm>
          </div>
        );
      },
    },
    {
      Header: '创建人',
      id: 'creator',
      accessor: 'creator',
    },
    {
      Header: '创建时间',
      id: 'createdAt',
      accessor: 'createdAt',
    },
    {
      Header: '操作',
      id: 'action',
      accessor: (row) => {
        return (
          <div className="flex gap-20">
            {row.state === 'SUCCESS' ? (
              <>
                <span className="operate">定义</span>
                <span className="operate" onClick={() => setVisible(true)}>构建</span>
                <MoreMenu onMenuClick={() => console.log()} menus={[
                  { label: 'v0.1.3.a', key: 'v0.1.3.a' },
                  { label: 'v0.1.2', key: 'v0.1.2' },
                  { label: 'v0.1.1', key: 'v0.1.1' },
                ]}>
                  <span className="operate">
                    API文档
                    <Icon clickable changeable name='keyboard_arrow_down' />
                  </span>
                </MoreMenu>
                <MoreMenu onMenuClick={() => console.log()} menus={[{ label: '删除', key: 'delete' }]}>
                  <Icon clickable name="more_horiz" />
                </MoreMenu>
              </>
            ) : (
              <span className="cursor-pointer text-red-600">删除</span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between mb-8">
        <Button
          iconName="add"
          modifier="primary"
          textClassName="text-12"
          onClick={() => setModalType('create')}
        >
          新建函数
        </Button>
        <Search className="func-search text-12" placeholder="搜索函数名称"/>
      </div>
      <Table
        rowKey="id"
        data={funcList}
        columns={COLUMNS}
      />
      {visible && <BuildModal onClose={() => setVisible(false)}/>}
    </>
  );
}

export default DataList;
