import React, { useState } from 'react';
import { Input } from 'antd';

import Icon from '@c/icon';
import Modal from '@c/modal';
import toast from '@lib/toast';

import store from '../store';
import { validateTemplateName } from '../api';
import AppIconPicker from '../../app-list/app-edit/app-icon-picker';

type Props = {
  modalType: string;
  templateInfo: TemplateInfo;
  onCancel: () => void;
}

function EditTemplateModal({ modalType, templateInfo, onCancel }: Props): JSX.Element {
  const isEdit = modalType === 'editTemplate';
  const { addTemplate, editTemplate } = store;
  const [templateName, setAppName] = useState(templateInfo?.name ?? templateInfo.appName);
  const [appIcon, setAppIcon] = useState(templateInfo.appIcon);

  async function handleSubmit(): Promise<void> {
    if (templateName.length > 30) {
      toast.error('应用名称不超过30个字符');
      return;
    }

    if (isEdit) {
      await editTemplate(templateInfo.id, templateName, appIcon);
      return onCancel();
    }

    validateTemplateName(templateName).then(async () => {
      await addTemplate({ ...templateInfo, name: templateName, appIcon });
      onCancel();
    }).catch(() => toast.error('模版名称校验失败'));
  }

  return (
    <Modal
      title={isEdit ? '修改模版信息' : '确定保存为模版'}
      onClose={onCancel}
      className="static-modal text-12"
      footerBtns={[
        {
          key: 'close',
          iconName: 'close',
          onClick: onCancel,
          text: '取消',
        },
        {
          key: 'check',
          iconName: 'check',
          modifier: 'primary',
          onClick: handleSubmit,
          text: isEdit ? '确定修改' : '确定保存',
        },
      ]}
    >
      <div className="flex-1 p-20">
        <p className="mb-8 bg-gray-50 px-16 py-8 text-blue-600 rounded-12 rounded-tl-4 flex items-center">
          <Icon size={20} className='mr-8 app-icon-color-inherit' name='info' />
          模版不包含应用数据，{isEdit ? '' : '且保存为模版后，'}对模版的修改不会影响应用
        </p>
        <div className="px-20 py-16 text-12">
          <div>
            模版名称
            <Input
              className="mt-8 mb-4 rounded-12 rounded-tl-4"
              placeholder='请输入模版应用名称'
              value={templateName}
              onChange={(e) => setAppName(e.target.value)}
            />
            <span>不超过30个字符，应用名称不可重复。</span>
          </div>
          <div className="mt-8">
            模版图标
            <div className='mt-8'>
              <AppIconPicker onChange={(value) => setAppIcon(value)} value={appIcon} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditTemplateModal;