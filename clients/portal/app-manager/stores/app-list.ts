import { observable, action, reaction } from 'mobx';
import { Message } from '@QCFE/lego-ui';
import { intersection } from 'lodash';

import { fetchAppList, updateAppStatus, delApp, createdApp } from '@appLib/api';

type Params = {
  status: number;
  keyword: string;
}

function findStatusList(list: AppInfo[], status: number) {
  return list.filter((appInfo) => appInfo.useStatus === status);
}

function findKeyword(list: AppInfo[], appName: string) {
  return list.filter((appInfo) => appInfo.appName.includes(appName));
}

class AppListStore {
  searchChange: any
  constructor(rootStore: any) {
    this.searchChange = reaction(() => this.params, this.setRenderList);
  }

  @observable appList: AppInfo[] = [];

  @observable appRenderList: AppInfo[] = [];

  @observable params: Params = { status: 0, keyword: '' };

  @observable isListLoading = false;

  @action
  delApp = (_id: string) => {
    return delApp(_id).then(() => {
      this.appList = this.appList.filter(({ id }) => id !== _id);
      this.appRenderList = this.appRenderList.filter(({ id }) => id !== _id);
      Message.success({ content: '删除成功！' });
    });
  }

  @action
  setRenderList = () => {
    const dataList = this.appList;
    const { status, keyword } = this.params;
    const statusList = status === 0 ? dataList : findStatusList(dataList, status);
    const keywordList = keyword === '' ? dataList : findKeyword(dataList, keyword);
    this.appRenderList = intersection(statusList, keywordList);
  }

  @action
  updateAppStatus = (id: string, useStatus: number) => {
    return updateAppStatus({ id, useStatus }).then(() => {
      this.fetchAppList();
      Message.success({ content: useStatus < 0 ? '发布成功！' : '下架成功' });
    });
  }

  @action
  fetchAppList = () => {
    this.isListLoading = true;
    return fetchAppList().then((res) => {
      this.appList = res.data;
      this.appRenderList = res.data;
      this.isListLoading = false;
    }).catch(() => {
      this.isListLoading = false;
    });
  }

  @action
  changeParams = (newParams: any) => {
    this.params = { ...this.params, ...newParams };
  }

  @action
  createdApp = (appInfo: AppInfo) => {
    return createdApp(appInfo).then((res) => {
      const newApp = { ...appInfo, ...res };
      this.appList = [newApp, ...this.appList];
      this.appRenderList = [newApp, ...this.appRenderList];
    });
  }
}

export default AppListStore;
