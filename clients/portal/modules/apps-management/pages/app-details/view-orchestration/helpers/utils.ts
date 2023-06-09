import { get } from 'lodash';
import { nanoid } from 'nanoid';

import { findNodeByID, appendChild, getNodeParents } from '@one-for-all/artery-utils';
import { Artery, RouteNode, Node, HTMLNode, RefNode, NodeProperties } from '@one-for-all/artery';

import { ARTERY_KEY_VERSION } from '@portal/constants';
import { getBatchGlobalConfig, setBatchGlobalConfig } from '@lib/api/user-config';

import { LAYOUT_CHILD_TYPE_ROUTES_CONTAINER, ROOT_NODE_ID } from '../constants';
import { LayoutType } from '../types.d';

export function genNodeID(): string {
  return nanoid(8);
}

export function isLayoutNode(node: Node): boolean {
  return get(node, 'props.data-internal-node.value') === true &&
    get(node, 'props.data-layout.value') === true;
}

export function genDesktopRootArteryKey(appID: string): string {
  return `app_id:${appID}:desktop_artery:root`;
}

export function genDesktopArteryKey(appID: string): string {
  return `app_id:${appID}:desktop_artery:${genNodeID()}`;
}

export function saveArtery(arteryID: string, schema: Artery): FutureErrorMessage {
  const params = {
    key: arteryID,
    value: JSON.stringify(schema),
    version: ARTERY_KEY_VERSION,
  };
  return setBatchGlobalConfig([params]).catch(() => {
    return 'failed to save schema';
  });
}

export async function fetchSchema(appID: string): Promise<Artery> {
  const key = genDesktopRootArteryKey(appID);
  const { result } = await getBatchGlobalConfig([{ key: key, version: '1.0.0' }]);
  return JSON.parse(result[key]);
}

export async function createRefSchema(appID: string, initProps?: any): Promise<string> {
  const refSchemaKey = genDesktopArteryKey(appID);
  const refedSchema: Artery = {
    node: { id: genNodeID(), type: 'html-element', name: 'div', props: initProps },
  };

  await saveArtery(refSchemaKey, refedSchema);

  return Promise.resolve(refSchemaKey);
}

export async function copyRefSchema(appID: string, arteryRefKey: string): Promise<string> {
  const refSchemaKey = genDesktopArteryKey(appID);
  await getBatchGlobalConfig([{ key: arteryRefKey, version: '1.0.0' }]).then(({ result }) => {
    saveArtery(refSchemaKey, JSON.parse(result[arteryRefKey]));
  });

  return Promise.resolve(refSchemaKey);
}

export function attachToRouteNode(node: Node, routeFor: 'layout' | 'view'): RouteNode {
  // todo generate route path by chinese
  const routePath = routeFor === 'layout' ? `l-${genNodeID()}` : `p-${genNodeID()}`;

  return {
    id: genNodeID(),
    type: 'route-node',
    path: routePath,
    node: node,
  };
}

function getLayoutRoutesContainerID(rootNode: Node, layoutID: string): string | undefined {
  const layoutNode = findNodeByID(rootNode, layoutID);
  if (!layoutNode) {
    return;
  }

  const childNode = ((layoutNode as HTMLNode).children || []).find((childNode) => {
    return get(childNode, 'props.data-layout-child.value') === LAYOUT_CHILD_TYPE_ROUTES_CONTAINER;
  });

  if (!childNode) {
    return;
  }

  return childNode.id;
}

export function addRouteNodeToLayout(
  rootNode: Node,
  layoutID: string,
  routeNode: RouteNode,
): Node | undefined {
  const routesContainerID = getLayoutRoutesContainerID(rootNode, layoutID);
  if (!routesContainerID) {
    return;
  }

  return appendChild(rootNode, routesContainerID, routeNode);
}

export function findFirstRouteParentID(rootNode: Node, id: string): string | undefined {
  const parents = getNodeParents(rootNode, id);
  if (!parents) {
    return;
  }

  return parents.reverse().find(({ type }) => type === 'route-node')?.id as string;
}

export function addRouteNodeToRootNode(rootNode: Node, routeNode: RouteNode): Node | undefined {
  const _rootNode = findNodeByID(rootNode, ROOT_NODE_ID);
  if (!_rootNode) {
    return;
  }

  if (!isLayoutNode(_rootNode)) {
    return appendChild(rootNode, _rootNode.id, routeNode);
  }

  return addRouteNodeToLayout(rootNode, _rootNode.id, routeNode);
}

export function createAppLandingPage(): Artery {
  const nodeID = genNodeID();
  const textNodeID = 'react-component' + genNodeID();

  const ARTERY_DEMO: Artery = {
    node: {
      id: nodeID,
      type: 'html-element',
      name: 'div',
      props: {
        style: {
          type: 'constant_property',
          value: {
            display: 'flex',
            fontWeight: 400,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      },
      children: [
        {
          id: textNodeID,
          type: 'html-element',
          name: 'h1',
          label: '文本',
          props: {
            children: {
              type: 'constant_property',
              value: '自定义页面示例',
            },
            style: {
              type: 'constant_property',
              value: {
                display: 'block',
                fontSize: '55px',
                fontWeight: 400,
              },
            },
          },
        },
      ],
    },
  };

  return ARTERY_DEMO;
}

export async function createAppLandingRouteNode(): Promise<RouteNode> {
  const demoViewRefArteryKey = genDesktopArteryKey(genNodeID());
  const refNode: RefNode = {
    id: genNodeID(),
    type: 'ref-node',
    arteryID: demoViewRefArteryKey,
    label: '示例页面',
  };

  const demoViewNode = attachToRouteNode(refNode, 'view');
  return saveArtery(demoViewRefArteryKey, createAppLandingPage()).then(() => {
    return demoViewNode;
  });
}

export function initSizeByLayoutType(layoutType: LayoutType): NodeProperties {
  let value: Record<string, string> = { width: '200px' };

  if (layoutType === LayoutType.HeaderContent) {
    value = { height: '50px' };
  }

  return {
    style: { type: 'constant_property', value },
  };
}
