import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import useCss from 'react-use/lib/useCss';
import { Tree, TreeNode, Dropdown, Message } from '@QCFE/lego-ui';

import { ActionsList, IActionListItem } from '@portal/components/ActionsList';
import DepartmentModal from './DepartmentModal';
import { DeleteModal } from './DeleteModal';

import { deleteDEP } from './api';
import { Func } from 'mocha';

export interface TreeNodeItem extends ITreeNode {
  addDepartment: (val: string, id: string) => void;
  openDeptModal: (type: string, deptInfo: DeptInfo) => void;
  openDeleteDeptModal: (deptInfo: DeptInfo) => void;
  onSelect: (deptInfo: any) => void;
}

const Title = ({ openDeptModal, openDeleteDeptModal, onSelect, ...treenode }: TreeNodeItem) => {
  const actions = (bol: boolean) => {
    const acts = [
      {
        id: '1',
        iconName: 'network-router',
        text: '添加部门',
        onclick: (params: DeptInfo) => openDeptModal('add', params),
      },
      {
        id: '2',
        iconName: 'pen',
        text: '修改部门',
        onclick: (params: DeptInfo) => openDeptModal('edit', params),
      },
    ];
    if (bol) {
      acts.push({
        id: '3',
        iconName: 'trash',
        text: '删除',
        onclick: (params: DeptInfo) => openDeleteDeptModal(params),
      });
    }
    return acts;
  };

  const { departmentName, id, pid } = treenode

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div onClick={() => onSelect(treenode)} className="text-dot-7 flex-1">{departmentName}</div>
        <div className="h-auto relative">
          <Dropdown
            content={
              <ActionsList<TreeNodeItem>
                actions={actions(pid ? true : false)}
                params={{
                  id,
                  departmentName,
                  pid,
                }}
              />
            }
          >
            <span>...</span>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export interface ITreeNode {
  id: string;
  departmentName: string;
  departmentLeaderId: string;
  useStatus: number;
  superId: string;
  child: ITreeNode[];
  pid?: string;
}

interface DepartmentTreeProps {
  treeData: ITreeNode[];
  setCurrDept: (treeNode: DeptTree) => void;
  departmentId: string;
}

export const DepartmentTree = ({ departmentId, treeData, setCurrDept }: DepartmentTreeProps) => {
  const [modalType, setModalType] = useState('');
  const [curDept, setCurDept] = useState<TreeNodeItem | null>(null);
  const [deptModalType, setDeptModalType] = useState<'add' | 'edit'>('add');
  const client = useQueryClient();

  const closeModal = () => {
    setCurDept(null);
    setModalType('');
  }

  const openDeptModal = (type: 'add' | 'edit', params: TreeNodeItem) => {
    setDeptModalType(type);
    setCurDept(params);
    setModalType('department');
  };

  const openDeleteDeptModal = (params: TreeNodeItem) => {
    setCurDept(params);
    setModalType('delDept');
  };

  const onSelect = (treeNode: DeptTree) => {
    setCurrDept(treeNode);
  };

  const renderTreeNodes = (childData: ITreeNode[]) =>
    childData.length > 0 &&
    childData.map((treenode: any) => {
      const { child } = treenode;
      if (child) {
        return (
          <TreeNode
            title={
              <Title
                {...treenode}
                onSelect={onSelect}
                openDeptModal={openDeptModal}
                openDeleteDeptModal={openDeleteDeptModal}
              />
            }
            key={treenode.id}
            dataRef={treenode}
          >
            {renderTreeNodes(child)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={
            <Title
              {...treenode}
              onSelect={onSelect}
              openDeptModal={openDeptModal}
              openDeleteDeptModal={openDeleteDeptModal}
            />
          }
          key={treenode.id}
          dataRef={treenode}
        />
      );
    });

  const deleteDept = () => {
    deleteDEP((curDept as TreeNodeItem).id).then((res) => {
      if (res && res.code === 0) {
        closeModal();
        client.invalidateQueries('getERPTree');
      }
    });
  };

  return (
    <div className="w-auto h-full">
      <Tree
        defaultExpandAll
        defaultSelectedKeys={[departmentId]}
        className={useCss({
          '.tree-title': {
            width: '100%',
          },
          '.tree-node-wrap': {
            height: '2.7rem',
            padding: '0 1rem',
          },
          '&': {
            'li.tree-node .tree-node-wrap:hover:before': {
              height: '2.7rem',
              'background-color': '#F0F6FF',
              opacity: '0.5',
            },
            'li.tree-node .tree-node-wrap.tree-node-wrap-selected:before': {
              height: '2.7rem',
              'background-color': '#F0F6FF',
              opacity: '1',
            },
            'li.tree-node .tree-node-wrap.tree-node-wrap-selected .tree-title': {
              '> div > .text-dot-7': {
                color: '#375FF3',
              },
              '.text-dot-7': {
                'font-weight': 'normal',
              },
            },
            'li.tree-node span.tree-switcher:hover': {
              background: 'none',
            },
            'li.tree-node .tree-node-content-wrapper': {
              width: '100%',
            },
          },
        })}
      >
        {treeData.length > 0 ? renderTreeNodes(treeData) : null}
      </Tree>
      {modalType === 'department' && (
        <DepartmentModal deptModalType={deptModalType} department={curDept as DeptInfo} closeModal={closeModal} />
      )}
      {modalType === 'delDept' && (
        <DeleteModal closeModal={closeModal} okModal={deleteDept} />
      )}
    </div>
  );
};
