import { generateRandomFormFieldID } from '../../utils';

export interface SelectConfig {
  title: string;
  description?: string;
  displayModifier: FormBuilder.DisplayModifier;
  sortable: boolean;
  required: boolean;
  allowCustom: boolean;
  defaultValueFrom: FormBuilder.DefaultValueFrom;
  datasetId: string;
  availableOptions: Array<{ label: string; value: any; title: string }>,
}

export const defaultConfig: SelectConfig = {
  title: '下拉框',
  description: '',
  displayModifier: 'normal',
  sortable: false,
  required: false,
  allowCustom: false,
  defaultValueFrom: 'customized',
  datasetId: '',
  availableOptions: [
    { label: '选项一', value: 'option_1', title: '选项一' },
    { label: '选项二', value: 'option_2', title: '选项二' },
    { label: '选项三', value: 'option_3', title: '选项三' },
  ],
};

export function toSchema(value: SelectConfig): ISchema {
  return {
    type: 'string',
    title: value.title,
    description: value.description,
    required: value.required,
    readOnly: value.displayModifier === 'readonly',
    display: value.displayModifier !== 'hidden',
    enum: (value.availableOptions || []).map((option) => {
      return {
        ...option,
        value: option.value || generateRandomFormFieldID(),
        title: option.label,
        name: option.label,
      };
    }),
    'x-component': 'Select',
    // todo support optionsLayout
    ['x-component-props']: {
      allowCustom: value.allowCustom,
      datasetId: value.datasetId,
    },
    ['x-internal']: {
      sortable: value.sortable,
      permission: 3,
      defaultValueFrom: value.defaultValueFrom,
    },
  };
}

export function toConfig(schema: ISchema): SelectConfig {
  let displayModifier: FormBuilder.DisplayModifier = 'normal';
  if (schema.readOnly) {
    displayModifier = 'readonly';
  } else if (!schema.display) {
    displayModifier = 'hidden';
  }

  return {
    title: schema.title as string,
    description: schema.description as string,
    displayModifier: displayModifier,
    sortable: !!schema['x-internal']?.sortable,
    required: !!schema.required,
    allowCustom: schema['x-component-props']?.allowCustom,
    // todo implement this
    defaultValueFrom: schema['x-internal']?.defaultValueFrom || 'customized',
    datasetId: schema['x-component-props']?.datasetId,
    // todo refactor this
    availableOptions: schema.enum as Array<{ label: string; value: any; title: string }> || [],
  };
}
