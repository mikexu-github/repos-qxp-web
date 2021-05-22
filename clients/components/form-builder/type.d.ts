type ISchema = import('@formily/react-schema-renderer').ISchema & {
  'x-internal'?: {
    version?: string;
    sortable?: boolean;
    permission?: number;
    [key: string]: any;
  };
};

declare namespace FormBuilder {
  type ElementCategory = 'basic' | 'advance' | 'layout';

  type SourceElement<T> = {
    displayName: string;
    displayOrder: number;
    category: ElementCategory;
    icon: string;
    // use this as sourceElement key
    componentName: string;
    component: React.JSXElementConstructor<any>;
    configSchema?: ISchema;
    configForm?: React.JSXElementConstructor<any>;
    defaultConfig: T;
    // transform configuration to the node of schema used by SchemaForm
    toSchema: (value: T) => ISchema;
    toConfig: (schema: FormBuilder.Schema) => T;
    configDependencies?: Record<string, React.JSXElementConstructor<any>>;
  };

  type DropPosition = 'upper' | 'below';

  type DropResult = {
    id: string;
    item: any;
    index: number;
    dropPosition: DropPosition;
  }

  type DisplayModifier = 'normal' | 'readonly' | 'hidden';

  type Schema = ISchema & { 'x-internal'?: Record<string, unknown> };

  type ValueSource = 'customized' | 'linkage' | 'formula' | string;

  type DragObject = SourceElement<any>;

  type CompareOperator = '===' | '>' | '<' | '!==';

  type CompareRule = {
    sourceKey: string;
    compareOperator: CompareOperator;
    compareValue: string | number | string[] | number[];
  }

  type VisibleHiddenLinkage = {
    key: string;
    ruleJoinOperator: 'every' | 'some';
    rules: CompareRule[];
    targetKeys: string[];
    isShow: boolean;
  }

  type Comparator = (values: Record<string, any>) => boolean;

  interface CascadeOption {
    value: string;
    label: string;
    children?: CascadeOption[];
  }
}

// a copy of formliy Schema type definition for reference
// interface Schema {
//   title: string;
//   type: 'string' | 'object' | 'array' | 'number' | 'datetime';
//   properties?: {
//     [key: string]: Schema
//   },
//   item?: Schema;
// }

// export interface ISchema {
//   title?: SchemaMessage;
//   description?: SchemaMessage;
//   default?: any;
//   readOnly?: boolean;
//   writeOnly?: boolean;
//   type?: 'string' | 'object' | 'array' | 'number' | 'boolean' | string;
//   enum?: Array<string | number | {
//     label: SchemaMessage;
//     value: any;
//     [key: string]: any;
//   } | {
//     key: any;
//     title: SchemaMessage;
//     [key: string]: any;
//   }>;
//   const?: any;
//   multipleOf?: number;
//   maximum?: number;
//   exclusiveMaximum?: number;
//   minimum?: number;
//   exclusiveMinimum?: number;
//   maxLength?: number;
//   minLength?: number;
//   pattern?: string | RegExp;
//   maxItems?: number;
//   minItems?: number;
//   uniqueItems?: boolean;
//   maxProperties?: number;
//   minProperties?: number;
//   required?: string[] | boolean | string;
//   format?: string;
//   properties?: {
//     [key: string]: ISchema;
//   };
//   items?: ISchema | ISchema[];
//   additionalItems?: ISchema;
//   patternProperties?: {
//     [key: string]: ISchema;
//   };
//   additionalProperties?: ISchema;
//   editable?: boolean;
//   visible?: boolean | string;
//   display?: boolean | string;
//   triggerType?: 'onBlur' | 'onChange';
//   ['x-props']?: {
//     [name: string]: any;
//   };
//   ['x-index']?: number;
//   ['x-rules']?: ValidatePatternRules;
//   ['x-linkages']?: Array<{
//     target: FormPathPattern;
//     type: string;
//     [key: string]: any;
//   }>;
//   ['x-mega-props']?: {
//     [name: string]: any;
//   };
//   ['x-item-props']?: {
//     [name: string]: any;
//   };
//   ['x-component']?: string;
//   ['x-component-props']?: {
//     [name: string]: any;
//   };
//   ['x-render']?: <T = ISchemaFieldComponentProps>(props: T & {
//     renderComponent: () => React.ReactElement;
//   }) => React.ReactElement;
//   ['x-effect']?: (dispatch: (type: string, payload: any) => void, option?: object) => {
//     [key: string]: any;
//   };
// }
