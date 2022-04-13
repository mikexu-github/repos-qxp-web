import { action, observable, reaction } from 'mobx';

import { SocketData } from '@lib/push';

import {
  checkHasGroup,
  checkInGroup,
  checkIsDeveloper,
  createGroup,
  createDeveloper,
  addToGroup,
  fetchFuncList,
  createFaasFunc,
  getFuncInfo,
  updateFuncDesc,
  getFuncVersionList,
  defineFunc,
  buildFunc,
  deleteFunc,
  updateVerDesc,
  offlineVer,
  servingVer,
  deleteVer,
  registerAPI,
  getApiPath,
  getVersionInfo,
  getVersion,
  getBuildProcessStatus,
} from './api';
import toast from '@lib/toast';
import { getApiDoc } from '../api-documentation/api';
import { INIT_API_CONTENT } from '../api-documentation/constants';

const INIT_CURRENT_FUNC = {
  id: '',
  name: '',
  state: 'Unknown' as FaasProcessStatus,
  description: '',
  creator: '',
  createdAt: 0,
  message: '',
  updatedAt: 0,
  alias: '',
  tag: '',
  language: '',
  versionNum: 0,
};

function getBuildStatusMap(statusList: FaasBuildStatus[]): Record<string, FaasProcessStatus> {
  return statusList.reduce<Record<string, FaasProcessStatus>>((acc, _status) => {
    if (_status.children) {
      return { ...acc, ...getBuildStatusMap(_status.children), [_status.name]: _status.status };
    }

    return { ...acc, [_status.name]: _status.status };
  }, {});
}

class FaasStore {
  @observable appDetails: AppInfo = {
    id: '',
    appName: '',
    appIcon: '',
    useStatus: 0,
    appSign: '',
  };
  @observable User: { id: string; email: string } = {
    id: '',
    email: '',
  };
  @observable hasGroup = false;
  @observable isDeveloper = false;
  @observable developerInGroup = false;
  @observable initLoading = false;
  @observable funcListLoading = true;
  @observable modalType = '';
  @observable buildIsError = true;
  @observable checkUserLoading = true;
  @observable apiIsError = false;
  @observable groupID = '';
  @observable currentFuncID = '';
  @observable buildID = '';
  @observable funcList: FuncField[] = [];
  @observable currentFunc: FuncField = INIT_CURRENT_FUNC;
  @observable versionList: VersionField[] = [];
  @observable currentVersionFunc: VersionField | null = null;
  @observable initErr = false;
  @observable APiContent: APiContent = INIT_API_CONTENT;
  @observable isAPILoadingErr = '';
  @observable isAPILoading = false;
  @observable searchAlias = '';
  @observable apiPath = '';
  @observable buildSteps: string[] = [];
  @observable buildStatusMap: Record<string, FaasProcessStatus> = {};
  @observable versionsParams: VersionListParams = {
    state: '',
    page: 1,
    size: 10,
  };

  constructor() {
    reaction(() => this.versionsParams, this.fetchVersionList);
  }

  @action
  setVersionParams = (newParam: Partial<VersionListParams>): void => {
    this.versionsParams = { ...this.versionsParams, ...newParam };
  };

  @action
  setModalType = (type: string): void => {
    this.modalType = type;
  };

  @action
  developerCheck = (): Promise<boolean | void> => {
    return checkIsDeveloper().then((res) => {
      this.isDeveloper = res.isDeveloper;
      return res.isDeveloper;
    }).catch((err) => toast.error(err));
  };

  @action
  mutateFuncStatus = (id: string, status: FaasProcessStatus): void => {
    this.funcList = this.funcList.map((func) => {
      if (func.id === id) {
        return {
          ...func,
          state: status,
        };
      }

      return func;
    });
  };

  @action
  isGroup = (): Promise<void> => {
    return checkHasGroup({
      group: this.appDetails.appSign,
      appID: this.appDetails.id,
    }).then((res) => {
      this.hasGroup = Boolean(res.groupID);
      this.groupID = res.groupID;
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  isDeveloperInGroup = (): Promise<void> => {
    return checkInGroup({
      group: this.appDetails.appSign,
    }).then((res) => {
      this.developerInGroup = res.isMember;
    },
    ).catch((err) => {
      toast.error(err);
    });
  };

  @action
  checkUserState = async (): Promise<void> => {
    this.checkUserLoading = true;
    await this.developerCheck();
    await this.isGroup();
    if (this.hasGroup && this.isDeveloper) {
      await this.isDeveloperInGroup();
    }
    this.checkUserLoading = false;
  };

  @action
  createDeveloper = (email: string, publicKey: string): Promise<void> => {
    return createDeveloper({
      email,
      publicKey,
    }).then(() => {
      const intervalBox = setInterval(async () => {
        await this.developerCheck();
        if (this.isDeveloper) {
          clearInterval(intervalBox);
        }
      }, 5000);
    }).catch((error) => {
      toast.error(error);
      this.initLoading = false;
      this.initErr = true;
    });
  };

  @action
  createGroup = (): Promise<void> => {
    return createGroup({
      group: this.appDetails.appSign,
      appID: this.appDetails.id,
    }).then((res) => {
      this.initLoading = false;
      this.hasGroup = true;
      this.groupID = res.id;
    }).catch((err) => {
      this.initLoading = false;
      this.initErr = true;
      toast.error(err);
    });
  };

  @action
  addUserToGroup = (): void => {
    addToGroup(this.groupID, { memberID: this.User.id }).then(() => {
      this.developerInGroup = true;
    }).catch((err) => {
      this.initLoading = false;
      this.initErr = true;
      toast.error(err);
    });
  };

  @action
  initFaas = async (): Promise<void> => {
    if (this.initErr) {
      await this.checkUserState();
    }
    this.initLoading = true;
    this.initErr = false;
    if (!this.hasGroup && this.isDeveloper) {
      await this.createGroup();
    }
    if (!this.developerInGroup && this.isDeveloper && this.hasGroup) {
      await this.addUserToGroup();
    }
    this.initLoading = false;
  };

  @action
  fetchFuncList = (searchAlias: string, page: number, size: number): void => {
    fetchFuncList(this.groupID, {
      alias: searchAlias,
      appID: this.appDetails.id,
      page,
      size,
    }).then((res) => {
      const { projects } = res;
      this.funcList = projects;
    }).catch((err) => {
      toast.error(err);
      this.funcList = [];
    }).finally(() => {
      this.funcListLoading = false;
    });
  };

  @action
  createFunc = (data: creatFuncParams): void => {
    createFaasFunc(this.groupID, { ...data, tag: '1.16' }).then((res) => {
      this.currentFuncID = res.id;
      this.currentFunc = { ...res, ...data, state: 'Unknown' };
      this.funcList = [this.currentFunc, ...this.funcList];
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  fetchFuncInfo = (): Promise<void> => {
    return getFuncInfo(this.groupID, this.currentFuncID).then((res) => {
      this.currentFunc = res.info;
    });
  };

  @action
  updateFuncDesc = (id: string, describe: string): void => {
    updateFuncDesc(this.groupID, id, { describe }).then(() => {
      this.funcList = this.funcList.map((_func) => {
        if (_func.id === id) {
          this.currentFunc = { ..._func, description: describe };
          return { ..._func, description: describe };
        }
        return _func;
      });
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  defineFunc = (id: string): void => {
    Promise.all([
      defineFunc(this.groupID, id),
      fetch('/_otp').then((response) => response.json()),
    ]).then(([{ url }, { token }]) => {
      window.open(`${url}?token=${token}`, '_blank');
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  buildFunc = (buildData: { tag: string, describe: string }): void => {
    buildFunc(this.groupID, this.currentFuncID, buildData).then(() => {
      this.modalType = '';
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  deleteFunc = (): void => {
    deleteFunc(this.groupID, this.currentFuncID).then(() => {
      this.modalType = '';
      toast.success('函数删除成功');
      this.funcList = this.funcList.filter((func) => this.currentFuncID !== func.id);
      this.currentFuncID = '';
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  fetchVersionList = (params: VersionListParams): void => {
    getFuncVersionList(this.groupID, this.currentFuncID, params).then((res) => {
      const { builds } = res;
      this.versionList = builds;
    }).catch((err) => {
      toast.error(err);
      this.funcList = [];
    }).finally(() => {
      this.funcListLoading = false;
    });
  };

  @action
  updateVerDesc = (describe: string): void => {
    updateVerDesc(this.groupID, this.currentVersionFunc?.id || '', this.buildID, { describe }).then(() => {
      this.versionList = this.versionList.map((_version) => {
        if (_version.id === this.currentVersionFunc?.id) {
          this.currentVersionFunc = { ..._version, describe };
          return { ..._version, description: describe };
        }
        return _version;
      });
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  offlineVer = (id: string): void => {
    offlineVer(this.groupID, this.currentFuncID, id).then(() => {
      this.setVersionParams({});
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  servingVer = (id: string): void => {
    servingVer(this.groupID, this.currentFuncID, id).then(() => {
      this.setVersionParams({});
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  deleteVer = (id: string): void => {
    deleteVer(this.groupID, this.currentFuncID, id).then(() => {
      this.versionList = this.versionList.filter((version) => id !== version.id);
      toast.success('删除成功');
    }).catch((err) => {
      toast.error(err);
    });
  };

  getVersion = (): void => {
    getVersion(this.groupID, this.currentFuncID, this.buildID).then((res) => {
      const { build } = res;
      this.currentVersionFunc = build;
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  registerAPI = (id: string): void => {
    registerAPI(this.groupID, this.currentFunc?.id || '', id).then(() => {
      toast.success('注册文档成功');
    }).catch((err) => {
      toast.error(err);
    });
  };

  @action
  getApiPath = (): void => {
    this.isAPILoading = true;
    this.isAPILoadingErr = '';
    getApiPath(this.groupID, this.currentFuncID, this.buildID).then((res) => {
      this.apiPath = res.path;
    }).catch((err) => {
      toast.error(err);
      this.isAPILoadingErr = err;
    }).finally(() => this.isAPILoading = false);
  };

  @action
  fetchApiDoc = (path: string): void => {
    this.isAPILoadingErr = '';
    getApiDoc(path, {
      docType: 'curl',
      titleFirst: false,
    }).then((res: QueryDocRes) => {
      const { doc } = res || {};
      this.APiContent = doc;
      this.isAPILoading = false;
    }).catch((err) => {
      toast.error(err);
      this.APiContent = INIT_API_CONTENT;
      this.isAPILoadingErr = err.message;
      this.isAPILoading = false;
    });
  };

  @action
  versionStateChangeListener = async (buildID: string, socket: SocketData, type: 'state' | 'serverState',
  ): Promise<void> => {
    const { key, topic }: FaasSoketData = socket?.content || {};
    if (key !== buildID || topic !== 'builder') {
      return;
    }

    const versionInfo = await getVersionInfo(this.groupID, this.currentFuncID, buildID);
    if (!['Unknown', ''].includes(versionInfo.build.state)) {
      this.versionList = this.versionList.map((version) => {
        if (version.id === buildID) {
          return {
            ...version,
            [type]: versionInfo.build[type],
            completionTime: versionInfo.build.completionTime,
          };
        }

        return version;
      });

      if (this.currentVersionFunc?.id === buildID) {
        this.currentVersionFunc = {
          ...this.currentVersionFunc,
          [type]: versionInfo.build[type],
          completionTime: versionInfo.build.completionTime,
        };
      }

      toast.success('操作成功！');
    }
  };

  @action
  updateBuildStatus = (): void => {
    getBuildProcessStatus(this.groupID, this.currentFuncID, this.buildID).then((status) => {
      this.buildStatusMap = getBuildStatusMap(status.events);
    });
  };

  @action
  clear = (): void => {
    this.isAPILoading = false;
    this.isAPILoadingErr = '';
    this.initErr = false;
  };
}

export default new FaasStore();
