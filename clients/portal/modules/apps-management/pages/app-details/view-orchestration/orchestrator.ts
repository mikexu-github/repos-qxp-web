import { get } from 'lodash';
import { action, computed, observable } from 'mobx';
import {
  Schema,
  RefNode,
  SchemaNode,
  APIStatesSpec,
  SharedStatesSpec,
  ReactComponentNode,
} from '@one-for-all/schema-spec';
import { deleteByID, findNodeByID, patchNode } from '@one-for-all/schema-utils';

import addLayoutToRoot from './helpers/add-layout-to-root';
import addViewToRoot from './helpers/add-view-to-root';
import addViewToLayout from './helpers/add-view-to-layout';
import findLayouts from './helpers/find-layouts';
import findViews from './helpers/find-views';
import {
  findFirstRouteParentID,
  genNodeID,
  genDesktopRootViewSchemaKey,
  saveSchema,
  fetchSchema,
  genDesktopViewSchemaKey,
} from './helpers/utils';
import type {
  Layout,
  View,
  ViewGroup,
  LayoutType,
  CreateViewParams,
  ExternalView,
} from './types';
import { ROOT_NODE_ID } from './constants';
import { createBlank } from '../api';

class Orchestrator {
  @observable loading = true;
  @observable rootNode: SchemaNode;
  appID: string;
  rootSchemaKey: string;
  apiStateSpec: APIStatesSpec | undefined;
  sharedStatesSpec: SharedStatesSpec | undefined;
  appLayout: LayoutType | undefined;

  constructor(appID: string, rootSchema: Schema) {
    this.appID = appID;
    this.rootSchemaKey = genDesktopRootViewSchemaKey(appID);
    const { node, apiStateSpec, sharedStatesSpec } = rootSchema;

    this.rootNode = node;
    this.apiStateSpec = apiStateSpec;
    this.sharedStatesSpec = sharedStatesSpec;

    const _rootNOde = findNodeByID(node, ROOT_NODE_ID);
    this.appLayout = get(_rootNOde, 'props.data-layout-type.value', undefined);
  }

  @computed get layouts(): Array<Layout> {
    if (!this.rootNode) {
      return [];
    }

    // todo filter root layout
    return findLayouts(this.rootNode);
  }

  @computed get views(): Array<View | ViewGroup> {
    if (!this.rootNode) {
      return [];
    }

    return findViews(this.rootNode);
  }

  // async createGroup(name: string): FutureErrorMessage {

  // }

  // async renameGroup(oldName: string, newName: string): FutureErrorMessage {

  // }

  // async deleteGroup(name: string): FutureErrorMessage {

  // }

  // async changeViewGroup(viewID: string, from: string, to?: string): FutureErrorMessage {

  // }
  @action
  async addLayout(name: string, layoutType: LayoutType): FutureErrorMessage {
    const rootNode = await addLayoutToRoot({
      appID: this.appID,
      rootNode: this.rootNode,
      layoutType,
      layoutName: name,
    });

    return this.saveSchema(rootNode);
  }

  @action
  async addTableSchemaView(params: CreateViewParams): FutureErrorMessage {
    if (!this.rootNode) {
      return 'no root node found for this app, please init root node again!';
    }
    return createBlank(this.appID).then(({ tableID: id }) => {
      // todo create empty table schema?
      const tableID = id;
      const renderTableSchemaViewNode: ReactComponentNode = {
        id: genNodeID(),
        type: 'react-component',
        label: params.name,
        // todo implement this
        packageName: 'package_name',
        // todo implement this
        packageVersion: '1.0.0',
        // todo implement this
        exportName: 'TableSchemaViewRender',
        props: {
          tableID: {
            type: 'constant_property',
            value: tableID,
          },
          name: {
            type: 'constant_property',
            value: params.name,
          },
          appID: {
            type: 'constant_property',
            value: this.appID,
          },
        },
      };

      if (!params.layoutID) {
        return this.saveSchema(addViewToRoot(this.rootNode, renderTableSchemaViewNode));
      }

      const rootNode = addViewToLayout(this.rootNode, params.layoutID, renderTableSchemaViewNode);

      return this.saveSchema(rootNode);
    });
  }

  async addSchemaView(params: CreateViewParams): FutureErrorMessage {
    if (!this.rootNode) {
      return 'no root node found for this app, please init root node again!';
    }

    const pageSchemaKey = genDesktopViewSchemaKey(this.appID);
    const InitPageSchema = {
      node: {
        id: genNodeID(),
        pid: '',
        type: 'react-component',
        packageName: 'ofa-ui',
        packageVersion: 'latest',
        exportName: 'page',
        label: '页面',
        props: {
          style: {
            type: 'constant_property',
            value: {
              width: '100%',
              height: '100%',
            },
          },
        },
        children: [],
      },
      apiStateSpec: {},
      sharedStatesSpec: {},
    } as Schema;
    saveSchema(pageSchemaKey, InitPageSchema);

    const renderSchemaView: RefNode = {
      id: genNodeID(),
      type: 'ref-node',
      schemaID: pageSchemaKey,
      label: params.name,
    };

    if (!params.layoutID) {
      return this.saveSchema(addViewToRoot(this.rootNode, renderSchemaView));
    }

    const rootNode = addViewToLayout(this.rootNode, params.layoutID, renderSchemaView);

    return this.saveSchema(rootNode);
  }

  async addStaticView(params: CreateViewParams & { fileUrl: string; }): FutureErrorMessage {
    return Promise.reject(new Error('todo, implement this'));
  }
  async addExternalView(params: CreateViewParams & { link: string; }): FutureErrorMessage {
    return Promise.reject(new Error('todo, implement this'));
  }

  // async editTableSchemaView(view: TableSchemaView): FutureErrorMessage;
  // async editSchemaView(view: SchemaView): FutureErrorMessage;
  // async editStaticView(view: StaticView): FutureErrorMessage;

  async editExternalView(view: ExternalView): FutureErrorMessage {
    if (!this.rootNode) {
      return 'no root node found for this app, please init root node again!';
    }

    const externalViewNode: ReactComponentNode = {
      id: view.id,
      label: view.name,
      type: 'react-component',
      packageName: 'todo_implement_this',
      packageVersion: 'todo_implement_this',
      exportName: 'todo_implement_this',
      props: {
        link: { type: 'constant_property', value: view.link },
      },
    };

    const rootNode = patchNode(this.rootNode, externalViewNode);
    return this.saveSchema(rootNode);
  }

  async deleteViewOrLayout(id: string): FutureErrorMessage {
    const routeNodeID = findFirstRouteParentID(this.rootNode, id);
    if (!routeNodeID) {
      return '';
    }

    return this.saveSchema(deleteByID(this.rootNode, routeNodeID));
  }

  @action
  async saveSchema(rootNode: SchemaNode | undefined): FutureErrorMessage {
    if (!rootNode) {
      // todo implement this!!!
      return Promise.resolve('todo some error message');
    }

    this.loading = true;
    this.rootNode = rootNode;

    return saveSchema(this.rootSchemaKey, {
      node: this.rootNode,
      apiStateSpec: this.apiStateSpec,
      sharedStatesSpec: this.sharedStatesSpec,
    }).then(() => {
      this.loading = false;
      return '';
    });
  }

  @action
  fetchSchema = async (): Promise<void> => {
    const { node } = await fetchSchema(this.appID);
    this.rootNode = node;
  };
}

export default Orchestrator;
