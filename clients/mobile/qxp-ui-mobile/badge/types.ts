import React from 'react';

import { Props } from '..';

export type HtmlTagType = keyof HTMLElementTagNameMap;

export interface BadgeProps extends Props {
  content?: React.ReactNode;
  dot?: boolean;
  max?: number | string;
  color?: string;
  offset?: [x: string | number, y: string | number];
  showZero?: boolean;
  tag?: HtmlTagType;
  onTouchStart?: (e: React.MouseEvent) => void;
}

export type BadgeSettingProps = Omit<
  BadgeProps,
  'children' | 'tag' | 'onClick' | 'style' | 'className'
>;
