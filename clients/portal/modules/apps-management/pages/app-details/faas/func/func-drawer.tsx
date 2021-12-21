import React, { useEffect, useState } from 'react';
import { UnionColumn } from 'react-table';
import { observer } from 'mobx-react';
import cs from 'classnames';
import dayjs from 'dayjs';
import useCss from 'react-use/lib/useCss';

import Icon from '@c/icon';
import Table from '@c/table';
import PopConfirm from '@c/pop-confirm';
import Pagination from '@c/pagination';

import store from '../store';
import TableMoreFilterMenu from '@c/more-menu/table-filter';
import VersionStatus from '../component/version-status';

function FuncDetailsDrawer(): JSX.Element {
  useEffect(() => {
    store.fetchFuncInfo();
    store.setVersionParams({});
  }, [store.currentFuncID]);
  const [beganClose, setBeganClose] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  const COLUMNS: UnionColumn<VersionField>[] = [
    {
      Header: '版本号',
      id: 'tag',
      accessor: ({ id, tag }: VersionField) => {
        return (
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => onClickTool(id, 'VersionDetail')}
          >
            {tag}
          </span>
        );
      },
    },
    {
      Header: () => (
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
      ),
      id: 'state',
      accessor: ({ state, id, message, serverState, visibility }: VersionField) => (
        <VersionStatus
          visibility={visibility}
          state={state}
          versionID={id}
          message={message}
          serverState={serverState}
        />
      ),
    },
    {
      Header: '构建时间',
      id: 'build',
      accessor: ({ updatedAt, createdAt }: VersionField) => `${updatedAt - createdAt}s`,
    },
    {
      Header: '创建人',
      id: 'creator',
      accessor: 'creator',
    },
    {
      Header: '创建时间',
      id: 'createAt',
      accessor: ({ createdAt }: VersionField) => {
        return createdAt ? dayjs(parseInt(String(createdAt * 1000))).format('YYYY-MM-DD HH:mm:ss') : '—';
      },
    },
    {
      Header: '操作',
      id: 'action',
      accessor: ({ id, visibility, state }: VersionField) => {
        const _visibility = visibility || 'offline';
        return (
          <div className="flex gap-20">
            {state === 'True' && _visibility === 'online' && (
              <PopConfirm content='确认下线改版本？' onOk={() => store.offlineVer(id)} >
                <span className="operate">下线</span>
              </PopConfirm>)}
            {state === 'True' && _visibility === 'offline' && (
              <PopConfirm content='确认上线改版本？' onOk={() => store.servingVer(id)} >
                <span className="operate">上线</span>
              </PopConfirm>)}
            { _visibility !== 'online' && (
              <PopConfirm content='确认删除改版本？' onOk={() => store.deleteVer(id)} >
                <span className="cursor-pointer text-red-600">删除</span>
              </PopConfirm>
            )}
            {state === 'True' && (
              <PopConfirm content='确定生成API文档？' onOk={() => store.registerAPI(id)} >
                <span className="operate">生成API文档</span>
              </PopConfirm>
            )}
          </div>
        );
      },
    },
  ];

  const handleCancel = (): void => {
    setBeganClose(true);
    setTimeout(() => {
      setVisible(true);
      store.modalType = '';
    }, 300);
  };

  function onClickTool(id: string, modalType: string): void {
    store.buildID = id;
    store.modalType = modalType;
  }

  return (
    <div
      className={cs('page-data-drawer-modal-mask', {
        'page-data-drawer-began-close': beganClose,
        'page-data-drawer-close': visible,
      })}
    >
      <div className={cs('page-data-drawer-container', useCss({
        width: fullScreen ? '100%' : '66%',
      }))}>
        <div className='page-data-drawer-header'>
          <span className='text-h5'>{store.currentFunc?.alias}</span>
          <div className='flex items-center gap-x-12'>
            <span onClick={() => setFullScreen(!fullScreen)} className='icon-text-btn'>
              <Icon size={20} name={fullScreen ? 'unfull_screen' : 'full_screen'} />
              {fullScreen ? '非' : ''}全屏
            </span>
            <Icon onClick={handleCancel} clickable changeable name='close' size={24} />
          </div>
        </div>
        <div className='grid gap-x-16 grid-flow-row-dense grid-cols-2 my-12 mx-20'>
          <div className='flex text-12 p-8 items-center '>
            <div className='text-gray-600'>标志：</div>
            <div className='text-gray-900 flex-1  '>{store.currentFunc?.name}</div>
          </div>
          <div className='flex text-12 p-8 items-center '>
            <div className='text-gray-600'>语言：</div>
            <div className='text-gray-900 flex-1  '>{store.currentFunc?.language}</div>
          </div>
        </div>
        <div className='h-32 bg-gray-100 rounded-4 flex items-center mb-8 mx-20'>
          <hr className="title-line h-20 w-4 mr-12" />
          <div className='font-semibold text-gray-600 text-14'>版本记录</div>
        </div>
        <div className='flex-1 overflow-hidden mx-20'>
          <Table
            rowKey="id"
            data={store.versionList}
            columns={COLUMNS}
            className='h-full'
          />
        </div>
        <Pagination
          total={store.versionCount}
          renderTotalTip={() => `共 ${store.versionCount} 条数据`}
          onChange={(current, pageSize) => store.setVersionParams({ page: current, size: pageSize })}
        />
      </div>

    </div>
  );
}

export default observer(FuncDetailsDrawer);
