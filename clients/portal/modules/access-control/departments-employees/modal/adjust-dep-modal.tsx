import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Form } from 'antd';

import toast from '@lib/toast';
import Modal from '@c/modal';
import Loading from '@c/loading';
import DepartmentPicker from '@c/form/input/tree-picker-field';
import { departmentToTreeNode } from '@lib/utils';

import { getERPTree, batchAdjustDep } from '../api';
import { getTwoDimenArrayHead } from '@lib/utils';

type BatchDepParams = {
  usersID: string[];
  oldDepID: string;
  newDepID: string;
};

interface Props {
  users: Employee[];
  closeModal(): void;
}

function AdjustDepModal({ users: userList, closeModal }: Props): JSX.Element {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: depData, isLoading } = useQuery('GET_ERP_TREE', getERPTree, {
    refetchOnWindowFocus: false,
  });

  const depMutation = useMutation(batchAdjustDep, {
    onSuccess: () => {
      toast.success('操作成功');
      closeModal();
      queryClient.invalidateQueries('GET_USER_ADMIN_INFO');
    },
    onError: () => {
      toast.error('操作失败');
      closeModal();
    },
  });

  function handleSubmit(): void {
    form.submit();
  }

  function handleFinish(values: any): void {
    const isHaveLeader = userList.find((user) => {
      const dep = getTwoDimenArrayHead(user.departments);
      return dep?.attr === '1';
    });
    if (isHaveLeader) {
      toast.error('当前已选择员工列表中存在部门主管，不能参与调整部门！');
      return;
    }

    const params: BatchDepParams = {
      usersID: [],
      oldDepID: '',
      newDepID: '',
    };

    const dep = getTwoDimenArrayHead(userList[0].departments);

    params.newDepID = values.pid;
    params.oldDepID = dep?.id || '';
    userList.forEach((user) => params.usersID.push(user.id));
    depMutation.mutate(params);
  }

  return (
    <Modal
      title="调整部门"
      className="static-modal"
      onClose={closeModal}
      footerBtns={[
        {
          text: '取消',
          key: 'cancel',
          iconName: 'close',
          onClick: closeModal,
        },
        {
          text: '确定',
          key: 'confirm',
          iconName: 'check',
          modifier: 'primary',
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="w-full p-20">
        <div className="w-full">
          <p className="text-gray-600 text-14">已选择员工</p>
          <ul className="flex items-center flex-wrap">
            {userList.map((user) => {
              return (
                <li key={user.id} className="rounded-tl-4 rounded-br-4
                px-8 bg-blue-200 mr-8 mb-8 whitespace-nowrap">
                  <span className="text-blue-600 text-14">{user.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          {isLoading ? (
            <Loading />
          ) : (
            <Form.Item
              name="pid"
              label="选择要调整的部门"
              rules={[
                { required: true, message: '请选择部门' },
              ]}
            >
              <DepartmentPicker
                treeData={departmentToTreeNode(depData as Department)}
                labelKey="name"
              />
            </Form.Item>
          )}
        </Form>
      </div>
    </Modal>
  );
}

export default AdjustDepModal;
