export interface NumberPickerConfig {
  title: string;
  description?: string;
  displayModifier: FormBuilder.DisplayModifier;
  placeholder?: string;
  sortable: boolean;
  precision: number;
  required: boolean;
  valueSource: FormBuilder.ValueSource;
}

// just for type friendly
export const defaultConfig: NumberPickerConfig = {
  title: '数字',
  description: '',
  displayModifier: 'normal',
  placeholder: '',
  sortable: false,
  precision: 2,
  required: false,
  valueSource: 'customized',
};

export function toSchema(value: typeof defaultConfig): FormBuilder.Schema {
  return {
    title: value.title,
    description: value.description,
    required: value.required,
    readOnly: value.displayModifier === 'readonly',
    display: value.displayModifier !== 'hidden',
    'x-component': 'NumberPicker',
    ['x-component-props']: {
      placeholder: value.placeholder,
      precision: value.precision,
      step: 1 / Math.pow(10, value.precision),
    },
    ['x-internal']: {
      sortable: value.sortable,
      permission: 3,
    },
  };
}

export function toConfig(schema: FormBuilder.Schema): NumberPickerConfig {
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
    placeholder: schema['x-component-props']?.placeholder || '',
    sortable: !!schema['x-internal']?.sortable,
    precision: schema['x-component-props']?.precision,
    required: !!schema.required,
    // todo implement this
    valueSource: 'customized',
  };
}

