import { set } from 'lodash';
import { CSSProperties } from 'react';

import {
  Artery,
  HTMLNode,
  Node,
  NodeProperty,
  NodeProperties,
} from '@one-for-all/artery';
import { generateNodeId } from '@one-for-all/artery-engine';

import { PropsSpec } from '../type';

export const initConfigArtery: Artery = {
  node: createWrapperNode({ width: '100%' }),
  apiStateSpec: {},
  sharedStatesSpec: {},
};

const WILL_COMPONENT_MAP: Record<string, string> = {
  string: 'Input',
  number: 'NumberPicker',
  boolean: 'Switch',
  function: 'FunctionBind',
  object: 'VaribleBind',
};

function createWrapperNode(style?: CSSProperties, children?: Node[]): HTMLNode {
  const baseNode: HTMLNode = {
    id: generateNodeId(),
    type: 'html-element',
    name: 'div',
  };
  style &&
    set(baseNode, 'props.style', {
      type: 'constant_property',
      value: style,
    });
  if (children && children.length) {
    set(baseNode, 'children', children);
  }
  return baseNode;
}

function convertorWillProps(item: PropsSpec): NodeProperties {
  const willProps = item.willProps;
  if (!willProps) {
    return {};
  }

  const propsMap = Object.entries(willProps).map(
    ([key, value]: [string, any]): [string, NodeProperty] => {
      let _value: NodeProperty = {} as NodeProperty;
      if (!value?.type) {
        _value = { type: 'constant_property', value: value };
      }

      return [key, _value];
    },
  );

  const nodeProperties: NodeProperties = propsMap.reduce(
    (acc: NodeProperties, [key, value]) => {
      acc[key] = value;

      return acc;
    },
    {} as NodeProperties,
  );

  return nodeProperties;
}

function buildTextItem(item: PropsSpec, style?: Record<string, string>): Node {
  const textNode: Node[] = [
    {
      id: generateNodeId(),
      type: 'html-element',
      name: 'label',
      props: {
        children: {
          type: 'constant_property',
          value: item.label,
        },
      },
    },
  ];

  if (item.desc) {
    textNode.push({
      id: generateNodeId(),
      type: 'react-component',
      packageName: 'node-carve',
      packageVersion: '1.0.0',
      exportName: 'Tips',
      props: {
        label: {
          type: 'constant_property',
          value: item.desc,
        },
      },
    });
  }

  return createWrapperNode(style, textNode);
}

function buildFieldItem(item: PropsSpec, prefix?: string): Node {
  const wrapperNode = createWrapperNode({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  });

  const defaultProperties = {
    __path: {
      type: 'constant_property',
      value: `${prefix}${item.name}`,
    },
  };

  const willProperties = convertorWillProps(item);
  const will = item.will || WILL_COMPONENT_MAP[item.type] || 'Unavaliable';
  const children: Node[] = [
    createWrapperNode(
      {
        flex: '1',
      },
      [
        {
          id: generateNodeId(),
          type: 'react-component',
          packageName: 'node-carve',
          packageVersion: '1.0.0',
          exportName: will,
          props: Object.assign(defaultProperties, willProperties),
        },
      ],
    ),
  ];

  if (will !== 'FunctionBind' && will !== 'Unavaliable') {
    children.push(
      createWrapperNode(
        {
          marginLeft: '8px',
        },
        [
          {
            id: generateNodeId(),
            type: 'react-component',
            packageName: 'node-carve',
            packageVersion: '1.0.0',
            exportName: 'StateBind',
            props: Object.assign(defaultProperties, willProperties),
          },
        ],
      ),
    );
  }

  return {
    ...wrapperNode,
    children,
  };
}

export function buildConfigArtery(
  spec: PropsSpec[],
  prefix?: string,
): Artery {
  const rootNode = createWrapperNode({
    width: '100%',
  });
  rootNode.children = spec
    .filter((item) => !(item.name === 'children' && item.type === 'react-node'))
    .map((item: PropsSpec) => {
      const wrapperNode: HTMLNode = {
        id: generateNodeId(),
        type: 'html-element',
        name: 'div',
      };
      const labelNode: Node = buildTextItem(item, {
        display: 'flex',
        padding: '8px 0',
      });
      const itemNode: Node = buildFieldItem(item, prefix);
      const nodes: Node[] = [labelNode, itemNode];

      return {
        ...wrapperNode,
        children: nodes,
      };
    });

  return {
    sharedStatesSpec: {},
    apiStateSpec: {},
    node: rootNode,
  };
}

export default buildConfigArtery;
