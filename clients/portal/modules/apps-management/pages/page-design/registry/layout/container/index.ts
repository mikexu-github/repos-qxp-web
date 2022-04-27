import { Container } from '@one-for-all/ui';

import type { SourceElement } from '@pageDesign/types';

import ConfigForm from './config-form';

type Props = {
  name?: string
}

const defaultConfig: Props = {};

const elem: SourceElement<Props> = {
  name: 'container',
  icon: 'single-container',
  label: '容器',
  category: 'layout',
  component: Container,
  configForm: ConfigForm,
  defaultConfig,
  order: 2,
  acceptChild: true,
  exportActions: ['onClick'],
  defaultStyle: {},
};

export default elem;
