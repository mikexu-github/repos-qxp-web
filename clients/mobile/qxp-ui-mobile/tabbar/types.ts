import React from 'react';

import { NumberString, Props } from '..';
import { BadgeSettingProps } from '../badge';

export interface TabbarProps<T = NumberString> extends Props {
  value?: T;
  defaultValue?: T;
  fixed?: boolean;
  zIndex?: number;
  activeColor?: string;
  inactiveColor?: string;
  placeholder?: boolean;
  safeAreaInsetBottom?: boolean;
  onChange?: (name: T) => void;
}

export interface TabbarItemProps<T = NumberString> extends Props {
  name?: T;
  icon?: string | ((active: boolean) => React.ReactNode);
  iconPrefix?: string;
  badge?: BadgeSettingProps;
  onClick?: (event: React.MouseEvent) => void;
  /** @private */
  index?: number;
  /** @private */
  setActive?: (active: T) => void;
  children?: React.ReactNode | ((active: boolean) => React.ReactNode);
}
