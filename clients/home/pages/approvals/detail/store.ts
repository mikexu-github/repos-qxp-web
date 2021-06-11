import { action, observable } from 'mobx';
import toast from '@lib/toast';

import actionMap from './action-map';

type ModalInfo = {
  title: string,
  payload: Record<string, any>
}

class TaskDetailStore {
  @observable action = '';
  @observable modalOpen = false;
  @observable showTips = false;

  @observable modalInfo: ModalInfo = {
    title: '',
    payload: {},
  };

  @action
  setModalInfo = (info: Partial<ModalInfo> = {}) => {
    Object.assign(this.modalInfo, info);
  }

  @action
  setAction = (action: TaskHandleType | string) => {
    this.action = action;
  }

  @action
  openModal = (open?: boolean) => {
    this.modalOpen = Boolean(open);
  }

  @action
  handleClickAction = (action: TaskHandleType | string): void => {
    if (!Object.prototype.hasOwnProperty.call(actionMap, action)) {
      toast.error(`action=${action} 未定义的操作`);
      return;
    }

    this.setAction(action);
    this.openModal(true);
    this.setModalInfo({
      title: actionMap[action]?.text,
    });
  }

  @action
  setShowTips = (show?: boolean) => {
    this.showTips = Boolean(show);
  }

  reset = () => {
    this.action = '';
    this.modalOpen = false;
    this.modalInfo = { title: '', payload: {} };
    this.showTips = false;
  }
}

export default new TaskDetailStore();