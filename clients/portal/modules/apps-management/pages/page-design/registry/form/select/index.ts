import type { SourceElement } from '@pageDesign/types';

import Select from './select';
import ConfigForm from './config-form';

type Props = {
  name?: string
}

const defaultConfig: Props = {};

const elem: SourceElement<Props> = {
  name: 'select',
  icon: 'apps',
  label: '下拉单选',
  category: 'form',
  component: Select,
  configForm: ConfigForm,
  defaultConfig,
  order: 5,
};

export default elem;
