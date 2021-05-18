import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@QCFE/lego-ui';

import Modal from '@c/modal2';

import SelectField from '@portal/modules/apps-management/components/select-field';
import { APP_ICON_LIST } from '@c/app-icon-select';
import AppIconSelect from '@c/app-icon-select';

import { fetchGroupList } from '../api';

type Props = {
  onCancel: () => void;
  onSubmit: (pageInfo: PageInfo) => void;
  appID: string;
  pageInfo?: PageInfo;
};

type GroupList = {
  id: string;
  name: string;
}

type Option = {
  value: string;
  label: string;
}

const IconSelectField = Form.getFormField(AppIconSelect);

function EditPageModal({ pageInfo, onCancel, onSubmit, appID }: Props) {
  const [groupList, setGroupList] = useState<Option[]>([]);

  useEffect(() => {
    fetchGroupList(appID).then((res) => {
      setGroupList((res.data.group || []).map(({ id, name }: GroupList) => {
        return { value: id, label: name };
      }));
    });
  }, [appID]);

  const ref: any = useRef();
  const handleSubmit = () => {
    const formRef = ref.current;
    if (formRef.validateFields()) {
      onSubmit({ ...(pageInfo || {}), ...formRef.getFieldsValue() });
    }
  };

  const { name, icon, describe, groupID, appID: curAppID } = pageInfo || { icon: APP_ICON_LIST[0] };

  return (
    <Modal
      className="static-modal"
      title={curAppID ? '修改名称与图标' : '新建页面'}
      onClose={onCancel}
      footerBtnSchema={[{
        key: 'close',
        iconName: 'close',
        onClick: onCancel,
        text: '取消',
      }, {
        key: 'check',
        iconName: 'check',
        modifier: 'primary',
        onClick: handleSubmit,
        text: '确定',
      }]}
    >
      <Form layout='vertical' ref={ref}>
        <Form.TextField
          name='name'
          defaultValue={name}
          label='页面名称'
          placeholder='请输入页面名称'
          help='不超过 30 个字符，页面名称不可重复。'
          schemas={[
            {
              help: '请输入页面名称',
              rule: { required: true },
            },
            {
              help: '名称不超过 30 字符，请修改！ ',
              rule: { maxLength: 30 },
            },
          ]}
        />
        <IconSelectField
          name='icon'
          label='显示图标'
          defaultValue={icon}
          schemas={[
            {
              help: '请选择显示图标',
              rule: { required: true },
            },
          ]}
        />
        <Form.TextAreaField
          name='describe'
          defaultValue={describe}
          label='描述'
          placeholder='选填（不超过 100 字符）'
          schemas={[
            {
              help: '备注超过 100 字符!',
              rule: { maxLength: 100 },
            },
          ]}
        />
        {!curAppID && groupList.length > 0 && (
          <SelectField
            name='groupID'
            defaultValue={groupID}
            label='所属分组'
            placeholder='选填'
            options={groupList}
          />
        )}
      </Form>
    </Modal>
  );
}

export default EditPageModal;
