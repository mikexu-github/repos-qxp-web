import React, { createRef } from 'react';
import { useMutation } from 'react-query';
import { Form } from '@QCFE/lego-ui';

import Icon from '@c/icon';
import toast from '@lib/toast';
import Modal from '@c/modal';

import { resetUserPWD } from '../api';

const { CheckboxGroupField } = Form;

export type sendPasswordBy = {
  sendPhone: -1 | 1;
  sendEmail: -1 | 1;
};

interface Props {
  userIds: string[];
  closeModal(): void;
  clearSelectRows(): void;
}

export default function ResetPasswordModal({
  userIds,
  closeModal,
  clearSelectRows,
}: Props): JSX.Element {
  const formRef = createRef<Form>();

  const resetMutation = useMutation(resetUserPWD, {
    onSuccess: () => {
      toast.success('操作成功！');
      closeModal();
      clearSelectRows();
    },
    onError: () => {
      toast.error('操作失败！');
      closeModal();
      clearSelectRows();
    },
  });

  const handleReset = (): void => {
    if (!formRef.current?.validateForm()) {
      return;
    }
    const values: {
      sendPasswordBy: string[];
    } = formRef.current?.getFieldsValue();
    const { sendPasswordBy } = values;
    if (sendPasswordBy.length === 0) {
      toast.error('请选择发送方式');
      return;
    }
    const checkedWay: sendPasswordBy = {
      sendEmail: -1,
      sendPhone: -1,
    };
    if (sendPasswordBy.length > 0) {
      sendPasswordBy.includes('email') && (checkedWay.sendEmail = 1);
      sendPasswordBy.includes('phone') && (checkedWay.sendPhone = 1);
    }
    resetMutation.mutate({ userIDs: userIds, ...checkedWay });
  };

  return (
    <Modal
      title="重置密码"
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
          text: '发送重置密码',
          key: 'confirm',
          iconName: 'check',
          modifier: 'primary',
          onClick: handleReset,
        },
      ]}
    >
      <div className="w-full flex flex-col">
        <div className="w-full corner-4-12-12-12 px-18 py-12 mb-20 bg-blue-100 flex items-center">
          <Icon
            name="info"
            size={24}
            type="primary"
            style={{ color: '#375FF3' }}
            className="mr-10"
          />
          <span className="text-blue-600">
            系统将自动生成一个随机密码发送给员工。
          </span>
        </div>
        <Form layout="vertical" ref={formRef}>
          <CheckboxGroupField
            name="sendPasswordBy"
            label="选择重置密码的发送方式"
            options={[
              {
                label: '通过邮箱',
                value: 'email',
              },
              {
                label: '通过短信',
                value: 'phone',
              },
            ]}
          />
        </Form>
      </div>
    </Modal>
  );
}
