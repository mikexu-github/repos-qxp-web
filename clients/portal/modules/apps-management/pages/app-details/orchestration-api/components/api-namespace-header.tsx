import React, { useState } from 'react';
import { observer } from 'mobx-react';

import Icon from '@c/icon';
import useModal from '@orchestrationAPI/effects/hooks/use-modal';
import UserGuide from '@c/user-guide';
import { ModalType } from '@orchestrationAPI/constants';
import {
  useApiNamespaceStore,
} from '@portal/modules/apps-management/pages/app-details/orchestration-api/context';

import {
  useCreateNameSpace, CreateInput, CreateResponse, CreateParams,
} from '../effects/api/api-namespace';

function APINamespaceHeader(): JSX.Element {
  const [modalType, setModalType] = useState<ModalType>();
  const apiNamespaceStore = useApiNamespaceStore();
  const [userGuideVisible, setUserGuideVisible] = useState<boolean>(
    !apiNamespaceStore?.rootNode.children?.length,
  );
  const path = `create${apiNamespaceStore?.rootNode.path}`;

  function refreshParent(): void {
    apiNamespaceStore?.loadChildren(apiNamespaceStore?.rootNode, true);
  }

  const CreateAPINamespaceModal = useModal<CreateInput, CreateResponse, CreateParams>(
    modalType,
    ModalType.CREATE_NAMESPACE,
    useCreateNameSpace,
    {
      message: '新建分组成功',
      submitText: '确认新建',
      onSuccess: refreshParent,
      onClose: () => setModalType(undefined),
      formToApiInputConvertor: (body) => {
        return { path, body };
      },
    },
  );

  function handleCreateNamespaceModal(): void {
    setModalType(ModalType.CREATE_NAMESPACE);
  }

  return (
    <header
      className="px-16 py-12 flex justify-between items-center h-44"
      style={{ zIndex: 1 }}
    >
      <span className="text-caption-no-weight font-semibold">API 编排</span>
      <UserGuide
        position="left"
        visible={userGuideVisible}
        onClose={() => setUserGuideVisible(false)}
        content="新增分组"
      >
        <Icon
          clickable
          name="icon_folder"
          onClick={handleCreateNamespaceModal}
        />
      </UserGuide>
      {CreateAPINamespaceModal}
    </header>
  );
}

export default observer(APINamespaceHeader);
