import { action, observable, reaction, IReactionDisposer, computed } from 'mobx';

import FormStore from '@c/form-builder/store';
import toast from '@lib/toast';
import {
  createFormScheme,
  fetchFormScheme,
  updateFormScheme,
  createPageScheme,
  createPerGroup,
  fetchRights,
  deleteRights,
  movePerGroup,
  updatePerGroup,
} from '@portal/modules/apps-management/lib/api';
import appPageDataStore from '@c/app-page-data/store';
import { PageTableShowRule } from '@c/app-page-data/utils';

import { getFilterField, getAttribute } from './utils';

class FormDesignStore {
  destroyFetchScheme: IReactionDisposer;
  destroySetTableColumn: IReactionDisposer;
  destroySetTableConfig: IReactionDisposer;
  destroySetFiltrates: IReactionDisposer;
  destroySetAllFiltrate: IReactionDisposer;
  @observable pageID = '';
  @observable appID = '';
  @observable saveSchemeLoading = false;
  @observable initScheme = {};
  @observable pageLoading = true;
  @observable formStore: FormStore | null = null;
  @observable hasSchema = false;
  @observable pageTableConfig: Record<string, any> = {};
  @observable pageTableShowRule: PageTableShowRule = {};
  @observable rightsList: Rights[] = [];
  @observable allFiltrate: PageField[] = [];
  @observable rightsLoading = false;

  @computed get fieldList(): PageField[] {
    const fieldsMap:any = this.formStore?.schema?.properties || {};
    return Object.keys(fieldsMap).filter((_key: string) => {
      return _key !== '_id';
    }).map((key: string) => {
      return {
        id: key,
        label: fieldsMap[key].title || '',
        type: fieldsMap[key].type,
        enum: fieldsMap[key].enum,
        isSystem: fieldsMap[key]['x-internal'].isSystem ? true : false,
        cProps: fieldsMap[key]['x-component-props'],
        ...getAttribute(this.pageTableConfig[key], fieldsMap[key]['x-index']),
      };
    });
  }

  constructor() {
    this.destroyFetchScheme = reaction(() => this.pageID, this.fetchFormScheme);

    this.destroySetAllFiltrate = reaction(() => this.fieldList.length, () => {
      if (!this.formStore) {
        return;
      }
      this.allFiltrate = this.allFiltrate.filter(({ id }) => {
        if (!this.formStore?.schema?.properties) {
          return false;
        }

        return id in this.formStore?.schema?.properties;
      });
    });

    this.destroySetFiltrates = reaction(() => {
      return this.allFiltrate.map((field: PageField) => {
        return getFilterField(field);
      });
    }, appPageDataStore.setFiltrates);

    this.destroySetTableColumn = reaction(() => {
      const column: any[] = [];
      let recordColNum = 0;
      let fixedColumnIndex: number[] = [];
      let action: any = {
        id: 'action',
        Header: '操作',
      };
      switch (this.pageTableShowRule.fixedRule) {
      case 'one':
        fixedColumnIndex = [0];
        break;
      case 'previous_two':
        fixedColumnIndex = [0, 1];
        break;
      case 'action':
        action = { ...action, fixed: true, width: 150 };
        break;
      case 'one_action':
        fixedColumnIndex = [0];
        action = { ...action, fixed: true, width: 150 };
        break;
      }

      [...this.fieldList].sort((a: PageField, b: PageField) => {
        return a.sort - b.sort;
      }).forEach((field) => {
        if (field.visible) {
          const isFixed = fixedColumnIndex.includes(recordColNum);
          column.push({
            id: field.id,
            Header: field.label,
            accessor: field.id,
            fixed: isFixed,
            width: isFixed ? 150 : 0,
          });
          recordColNum += 1;
        }
      });
      return [...column, action];
    }, appPageDataStore.setTableColumns);

    this.destroySetTableConfig = reaction(() => {
      return this.pageTableShowRule;
    }, appPageDataStore.setTableConfig);
  }

  @action
  setFilterList = (filtrates: PageField[]) => {
    this.allFiltrate = filtrates;
  }

  @action
  addRight = (rights: RightsCreate) => {
    const _rights = {
      ...rights,
      sequence: this.rightsList.length,
      formID: this.pageID,
      appID: this.appID,
    };
    return createPerGroup(_rights).then((res) => {
      this.rightsList = [...this.rightsList, { ..._rights, ...res.data }];
    });
  }

  @action
  deleteRight = (id: string) => {
    const delAfter = this.rightsList.filter((rights) => id !== rights.id);
    deleteRights({
      id, moveArr: delAfter.map((AFrights, sequence) => {
        return { id: AFrights.id, sequence };
      }),
    }).then(() => {
      toast.success('删除成功!');
      this.rightsList = delAfter;
    });
  }

  @action
  setPageID = (pageID: string) => {
    this.pageID = pageID;
  }

  @action
  setAllPageTableConfig = (values: any[]) => {
    values.forEach((value) => {
      this.pageTableConfig[value.id] = { ...this.pageTableConfig[value.id], ...value };
    });
  }

  @action
  setPageTableShowRule = (newRule: PageTableShowRule) => {
    this.pageTableShowRule = { ...this.pageTableShowRule, ...newRule };
  }

  @action
  setPageTableConfig = (key: string, newConfig: any) => {
    const _config = { [key]: { ...this.pageTableConfig[key], ...newConfig } };
    this.pageTableConfig = { ...this.pageTableConfig, ..._config };
  }

  @action
  reSetFormScheme = () => {
    this.formStore = new FormStore({ schema: this.initScheme });
  }

  @action
  fetchFormScheme = (pageID: string) => {
    if (!pageID) {
      return;
    }

    this.pageLoading = true;
    fetchFormScheme(pageID).then((res) => {
      const { schema = {}, config } = res.data || {};
      this.hasSchema = res.data ? true : false;
      this.initScheme = schema;
      this.formStore = new FormStore({ schema });
      if (config) {
        this.pageTableConfig = config.pageTableConfig || {};
        this.allFiltrate = config.filtrate || [];
        this.pageTableShowRule = config.pageTableShowRule || {};
      }
      this.pageLoading = false;
    }).catch(() => {
      this.pageLoading = false;
    });
  }

  @action
  saveFormScheme = () => {
    this.saveSchemeLoading = true;
    return (this.hasSchema ? updateFormScheme : createFormScheme)({
      schema: this.formStore?.schema,
      tableID: this.pageID,
    }).then(() => {
      (this.formStore as FormStore).hasEdit = false;
      toast.success(this.hasSchema ? '保存成功!' : '创建成功!');
      this.saveSchemeLoading = false;
    }).catch(() => {
      this.saveSchemeLoading = false;
    });
  }

  @action
  clear = () => {
    this.pageID = '';
    this.formStore = null;
    this.pageTableConfig = {};
    this.pageTableShowRule = {};
    this.allFiltrate = [];
    appPageDataStore.clear();
  }

  @action
  savePageConfig = () => {
    createPageScheme({
      tableID: this.pageID, config: {
        pageTableConfig: this.pageTableConfig,
        filtrate: this.allFiltrate,
        pageTableShowRule: this.pageTableShowRule,
      },
    }).then(() => {
      toast.success('保存成功!');
    });
  }

  @action
  fetchRights = () => {
    this.rightsLoading = true;
    fetchRights(this.pageID).then((res) => {
      this.rightsList = res.data.list;
      this.rightsLoading = false;
    }).catch(() => {
      this.rightsLoading = false;
    });
  }

  @action
  updatePerGroup = (rights: Rights) => {
    return updatePerGroup(rights).then(() => {
      this.rightsList = this.rightsList.map((_rights) => {
        if (rights.id === _rights.id) {
          return { ..._rights, ...rights };
        }
        return _rights;
      });
      toast.success('修改成功！');
      return true;
    });
  }

  @action
  rightsGroupSort = (rightsIdList: string[]) => {
    const newRightsList: Rights[] = [];
    movePerGroup({
      moveArr: rightsIdList.map((id, index) => {
        const rights = this.rightsList.find((_rights) => _rights.id === id);
        if (rights) {
          newRightsList.push({
            ...rights,
            sequence: index,
          });
        }
        return {
          id,
          sequence: index,
        };
      }),
    });
    this.rightsList = newRightsList;
  }
}

export default new FormDesignStore();
