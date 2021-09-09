import { validateRegistryElement } from '@c/form-builder/utils';

import Prefix from './prefix';
import configSchema from './config-schema';
import { defaultConfig, toSchema, toConfig } from './convertor';
import effects from './effects';
import Serial from './serial';

const SerialField: Omit<FormBuilder.SourceElement<typeof defaultConfig>, 'displayOrder'> = {
  configSchema,
  toConfig,
  displayName: '流水号',
  icon: 'check_box',
  defaultConfig,
  toSchema,
  component: Serial,
  category: 'advance',
  componentName: 'Serial',
  configDependencies: { Prefix },
  effects,
  validate: validateRegistryElement(configSchema),
};

export default SerialField;
