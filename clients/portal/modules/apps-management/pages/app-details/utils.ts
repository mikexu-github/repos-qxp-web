import moment from 'moment';
import { UnionColumn } from 'react-table';
import { flattenDeep, isEmpty } from 'lodash';

import toast from '@lib/toast';

import { fetchCorrelationFlows, fetchCorrelationRoles } from './api';
import { CardListInfo, CardList, CustomPageInfo, Description, SchemaPageInfo, MenuType } from './type';
import { Menu } from './page-menu-design/menu-tree/type';

export const SYSTEM_FIELDS: Record<string, ModelFieldSchema> = {
  _id: {
    type: 'string',
    title: 'id',
    readOnly: false,
    display: false,
    'x-component': 'Input',
    not_null: false,
    'x-internal': { isSystem: true },
    'x-index': 0,
  },
  created_at: {
    type: 'datetime',
    title: '创建时间',
    readOnly: false,
    display: false,
    'x-component': 'DatePicker',
    not_null: false,
    'x-component-props': { isNow: false, showTime: false },
    'x-internal': { isSystem: true },
    'x-index': 0,
  },
  updated_at: {
    type: 'datetime',
    title: '修改时间',
    readOnly: false,
    display: false,
    'x-component': 'DatePicker',
    not_null: false,
    'x-component-props': { isNow: false, showTime: false },
    'x-internal': { isSystem: true },
    'x-index': 0,
  },
  creator_name: {
    type: 'string',
    title: '创建者',
    readOnly: false,
    display: false,
    not_null: false,
    'x-component': 'Input',
    'x-internal': { isSystem: true },
    'x-index': 0,
  },
  creator_id: {
    type: 'string',
    title: '创建者 ID',
    readOnly: false,
    display: false,
    'x-component': 'Input',
    not_null: false,
    'x-internal': { isSystem: true },
    'x-index': 0,
  },
  modifier_name: {
    type: 'string',
    title: '修改者',
    readOnly: false,
    display: false,
    'x-component': 'Input',
    not_null: false,
    'x-internal': { isSystem: true },
    'x-index': 0,
  },
  modifier_id: {
    type: 'string',
    title: '修改者 ID',
    readOnly: false,
    display: false,
    'x-component': 'Input',
    not_null: false,
    'x-internal': { isSystem: true },
    'x-index': 0,
  },
};

export const FIELD_COLUMNS: UnionColumn<ModelField>[] = [
  {
    Header: '字段编码',
    id: 'id',
    accessor: 'id',
  },
  {
    Header: '字段名称',
    id: 'title',
    accessor: 'title',
  },
  {
    Header: '数据格式',
    id: 'type',
    accessor: 'type',
  },
  {
    Header: '是否允许为空',
    id: 'not_null',
    accessor: (rowData) => rowData.not_null ? '不允许' : '允许',
  },
];

export const INIT_MODEL_SCHEMA = {
  tableID: '',
  schema: {
    properties: SYSTEM_FIELDS,
    title: '',
    type: 'object',
    description: '',
  },
};

export function filterDeletedPage(
  groupID: string, pageID: string, pageList: PageInfo[],
): PageInfo[] {
  if (groupID === 'ROOT') {
    return pageList.filter((page) => page.id !== pageID);
  }

  return pageList.map((page) => {
    if (page.id === groupID) {
      page.child = page.child?.filter((childPage) => {
        return childPage.id !== pageID;
      });
      page.childCount = page.child?.length;
    }
    return page;
  });
}

export function getValueOfPageDescription(key: string, data: CustomPageInfo & SchemaPageInfo): string | undefined {
  switch (key) {
  case 'createdBy':
    return data.createdBy;
  case 'updatedBy':
    return data.updatedBy;
  case 'updatedAt':
    return !data.updatedAt ? '-' : moment(data.updatedAt, 'X').format('YYYY-MM-DD');
  case 'createdAt':
    return !data.createdAt ? '-' : moment(data.createdAt, 'X').format('YYYY-MM-DD');
  case 'fileSize':
    return data.fileSize;
  case 'fieldLen':
    return data.fieldLen;
  default:
    return undefined;
  }
}

export function mapToSchemaPageDescription(
  { id, title, value }: Description, data: SchemaPageInfo,
): Description {
  const test = getValueOfPageDescription(id, { ...data, id: data.tableID || '' });

  if (id === 'type') {
    return { id, title, value: '表单' };
  }

  if (id === 'fileSize') {
    return { id: 'fieldLen', title: '已配置字段总数', value: data.fieldLen || '' };
  }

  return { id, title, value: test ? test : value };
}

export function mapToCustomPageDescription(
  { id, title, value }: Description, data: CustomPageInfo,
): Description {
  const test = getValueOfPageDescription(id, data);

  if (id === 'type') {
    return { id, title, value: '自定义页面' };
  }

  if (id === 'fieldLen') {
    return { id: 'fileSize', title: '文件大小', value: data.fileSize || '' };
  }

  return { id, title, value: test ? test : value };
}

export async function getPageCardList(
  appID: string,
  pageID: string,
  cardList: CardList[],
  menuType: number | undefined,
): Promise<CardList[]> {
  let flowList: CardListInfo[] = [];
  let roleList: CardListInfo[] = [];
  await fetchCorrelationRoles(appID, pageID).then((res) => {
    roleList = res.perGroups;
  }).catch((err) => {
    toast.error(err.message);
  });

  if (menuType === MenuType.schemaForm) {
    await fetchCorrelationFlows({ appID, formID: pageID }).then((res: CardListInfo[]) => {
      flowList = res;
    }).catch((err) => {
      toast.error(err.message);
    });
  }

  return cardList.map(({ id, title }) => {
    if (id === 'linkedFlows') {
      return {
        id,
        title,
        list: flowList.map(({ name, id, status }) => {
          return { name, id, status };
        }),
      };
    }

    if (id === 'AuthorizedRoles') {
      return {
        id,
        title,
        list: roleList.map(({ name, id, status }) => {
          return { name, id, status };
        }),
      };
    }

    return { id, title, list: [] };
  });
}

export function formatFileSize(fileSize: number): string {
  if (fileSize === 0) return '0 Bytes';

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(fileSize) / Math.log(1024));

  return parseFloat((fileSize / Math.pow(1024, i)).toFixed(2)) + ' ' + units[i];
}

function getFlatMenu(menus: Menu[] = []): Menu[] {
  return flattenDeep(menus.map((menu: Menu) => menu.child?.length ? [menu, menu.child] : menu));
}

type MenuMap = Record<string, Menu>;
function getReduceMap(menus: Menu[]): MenuMap {
  const reducerFn = (acc: MenuMap, menu: Menu): MenuMap => {
    acc[menu.id] = menu;
    return acc;
  };
  return getFlatMenu(menus).reduce(reducerFn, {});
}

export function hasActiveMenu(list: Menu[], { id }: Menu): boolean {
  return !!id && !isEmpty(getReduceMap(list)?.[id]);
}

export function updateNode(nodeList: Menu[], node: Menu): Menu[] {
  return nodeList.map((currentNode) => {
    if (currentNode.id === node.id) {
      return node;
    } else if (currentNode.child?.length) {
      currentNode.child = updateNode(currentNode.child, node);
    }
    return currentNode;
  });
}
