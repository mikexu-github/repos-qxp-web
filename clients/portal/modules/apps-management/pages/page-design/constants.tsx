import { Layer } from '@one-for-all/artery-engine';
import React from 'react';

import Header from './blocks/header';
import Menu from './blocks/menu';
import Simulator from './blocks/simulator';
import Fountainhead from './blocks/fountainhead';
import Structure from './blocks/structure';
import Pool from './blocks/pool';
import NodeCarve from './blocks/node-carve';
import StaticMenuPanel from './blocks/static-menu-panel';
import MiniArteries from './blocks/mini-arteries';
import { BlocksCommunicationType } from './types';

export const QUERY_KEY = {
  ARTERY: 'QUERY_ARTERY',
};

export const PAGE_DESIGN_ID = 'page-design-container';

export const LAYERS: Layer<BlocksCommunicationType>[] = [
  {
    id: 'root',
    style: {
      gridTemplateColumns: '56px 1fr 282px',
      gridTemplateRows: '44px calc(100vh - 44px)',
    },
    blocks: [
      {
        id: 'static-header',
        style: {
          gridColumnStart: 'span 3',
        },
        render: Header,
      },
      {
        style: {
          backgroundColor: '#fff',
        },
        render: Menu,
      },
      {
        id: 'static-fountainhead',
        hide: true,
        render: StaticMenuPanel,
      },
      {
        id: 'static-structure',
        hide: true,
        render: StaticMenuPanel,
      },
      {
        id: 'static-pool',
        hide: true,
        render: StaticMenuPanel,
      },
      {
        id: 'static-miniArteries',
        hide: true,
        render: StaticMenuPanel,
      },
      {
        render: Simulator,
      },
      {
        render: NodeCarve,
      },
    ],
  },
  {
    id: 'fountainhead',
    style: {
      gridTemplateColumns: '56px 1fr 282px',
      gridTemplateRows: '44px calc(100vh - 44px)',
      pointerEvents: 'none',
    },
    hide: true,
    blocks: [
      {
        style: {
          gridColumnStart: 'span 3',
        },
        render: () => <div></div>,
      },
      {
        render: () => <div></div>,
      },
      {
        style: {
          position: 'relative',
          overflow: 'hidden',
        },
        render: Fountainhead,
      },
      {
        render: () => <div></div>,
      },
    ],
  },
  {
    id: 'structure',
    style: {
      gridTemplateColumns: '56px 1fr 282px',
      gridTemplateRows: '44px calc(100vh - 44px)',
      pointerEvents: 'none',
    },
    hide: true,
    blocks: [
      {
        style: {
          gridColumnStart: 'span 3',
        },
        render: () => <div></div>,
      },
      {
        render: () => <div></div>,
      },
      {
        style: {
          position: 'relative',
          overflow: 'hidden',
        },
        render: Structure,
      },
      {
        render: () => <div></div>,
      },
    ],
  },
  {
    id: 'pool',
    style: {
      gridTemplateColumns: '56px 1fr 282px',
      gridTemplateRows: '44px calc(100vh - 44px)',
      pointerEvents: 'none',
    },
    hide: true,
    blocks: [
      {
        style: {
          gridColumnStart: 'span 3',
        },
        render: () => <div></div>,
      },
      {
        render: () => <div></div>,
      },
      {
        style: {
          position: 'relative',
          overflow: 'hidden',
        },
        render: Pool,
      },
      {
        render: () => <div></div>,
      },
    ],
  },
  {
    id: 'miniArteries',
    style: {
      gridTemplateColumns: '56px 1fr 282px',
      gridTemplateRows: '44px calc(100vh - 44px)',
      pointerEvents: 'none',
    },
    hide: true,
    blocks: [
      {
        style: {
          gridColumnStart: 'span 3',
        },
        render: () => <div></div>,
      },
      {
        render: () => <div></div>,
      },
      {
        style: {
          position: 'relative',
          overflow: 'hidden',
        },
        render: MiniArteries,
      },
      {
        render: () => <div></div>,
      },
    ],
  },
];

export const GROUP_TITLE_MAP: { [key: string]: string } = {
  fountainhead: '平台组件库',
  structure: '页面层级',
  pool: '数据源',
  miniArteries: '区块模版',
};
