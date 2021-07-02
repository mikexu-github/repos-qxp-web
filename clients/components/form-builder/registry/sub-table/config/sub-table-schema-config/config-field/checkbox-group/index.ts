import { Checkbox } from '@formily/antd-components';

import configSchema from './config-schema';
import { defaultConfig, toSchema, toConfig } from './convertor';

const CheckboxGroupField: Omit<FormBuilder.SourceElement<typeof defaultConfig>, 'displayOrder'> = {
  configSchema,
  toConfig,
  displayName: '复选框',
  icon: 'check_box',
  defaultConfig,
  toSchema,
  component: Checkbox.Group,
  category: 'basic',
  componentName: 'CheckboxGroup',
  compareOperators: ['⊇', '⊋'],
};

export default CheckboxGroupField;