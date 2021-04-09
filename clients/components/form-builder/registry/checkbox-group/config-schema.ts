import { ISchema } from '@formily/react-schema-renderer';

const schema: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: '标题名称',
      default: '复选框',
      required: true,
      // https://github.com/alibaba/formily/issues/1053
      // this bug has not been fix in current release
      // description: '标题名称',
      'x-rules': {
        required: true,
        message: '请输入标题名称',
      },
      'x-component': 'Input',
      'x-index': 0,
    },
    description: {
      type: 'string',
      title: '描述内容',
      'x-component': 'Input',
      'x-index': 2,
    },
    displayModifier: {
      type: 'string',
      title: '字段属性',
      default: 'normal',
      enum: [
        {
          label: '普通',
          value: 'normal',
        },
        {
          label: '只读',
          value: 'readonly',
        },
        {
          label: '隐藏',
          value: 'hidden',
        },
      ],
      'x-component': 'RadioGroup',
      'x-index': 3,
    },
    optionsLayout: {
      type: 'string',
      title: '排列方式',
      default: 'horizontal',
      enum: [
        {
          label: '横向排列',
          value: 'horizontal',
        },
        {
          label: '纵向排列',
          value: 'vertical',
        },
      ],
      'x-component': 'RadioGroup',
      'x-index': 4,
    },
    sortable: {
      title: '是否支持列表排序',
      default: false,
      'x-component': 'Switch',
      'x-index': 5,
    },
    required: {
      title: '是否必填',
      default: false,
      'x-component': 'Switch',
      'x-index': 6,
    },
    defaultValue: {
      title: '默认值',
      enum: [
        {
          label: '自定义',
          value: '',
        },
        {
          label: '数据联动',
          value: 'linkage',
        },
        {
          label: '自定义公式',
          value: 'formula',
        },
      ],
      'x-component': 'select',
      'x-index': 7,
    },
    availableOptions: {
      title: '可选值',
      type: 'array',
      'x-component': 'ArrayTable',
      items: {
        type: 'object',
        properties: {
          label: {
            title: 'label',
            type: 'string',
            'x-component': 'Input',
          },
        },
      },
    },
  },
};

export default schema;
