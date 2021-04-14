import { nanoid } from 'nanoid';

// just for type friendly
export const defaultConfig = {
  title: '下拉框',
  description: '',
  displayModifier: '',
  optionsLayout: 'horizontal',
  sortable: false,
  required: false,
  valueFrom: 'customized',
  availableOptions: [
    { label: 'One', value: 'One', title: 'One' },
    { label: 'Two', value: 'Two', title: 'Two' },
    { label: 'Three', value: 'Three', title: 'Three' },
  ],
};

type Schema = ISchema & { 'x-internal'?: Record<string, any> };

function toSchema(value: typeof defaultConfig): Schema {
  return {
    title: value.title,
    description: value.description,
    required: value.required,
    readOnly: value.displayModifier === 'readonly',
    display: value.displayModifier !== 'hidden',
    enum: (value.availableOptions || []).map((option) => {
      return {
        ...option,
        value: nanoid(8),
        title: option.label,
        name: option.label,
      };
    }),
    'x-component': 'Select',
    // todo support optionsLayout
    ['x-component-props']: { },
    ['x-internal']: {
      sortable: value.sortable,
    },
  };
}

export default toSchema;
