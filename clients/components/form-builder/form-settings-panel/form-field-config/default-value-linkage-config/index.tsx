import React, { useContext, useEffect, useRef, useState } from 'react';
import { omit } from 'lodash';
import { from } from 'rxjs';
import { switchMap, filter, tap, skip } from 'rxjs/operators';
import {
  SchemaForm,
  FormButtonGroup,
  FormEffectHooks,
  createFormActions,
  IFieldState,
  IForm,
} from '@formily/antd';
import {
  Input,
  Select as AntdSelect,
  DatePicker,
  NumberPicker,
  Switch,
  Radio,
} from '@formily/antd-components';
import { FormPath } from '@formily/shared';

import Modal from '@c/modal';
import Button from '@c/button';
import { StoreContext } from '@c/form-builder/context';
import { JoinOperatorSelect, RulesList } from '@c/form-builder/customized-fields';
import { getCompareOperatorOptions, getSourceElementOperator } from '@c/form-builder/utils/operator';
import { getLinkageTables } from '@c/form-builder/utils/api';

import { fetchLinkedTableFields } from './get-tables';
import SCHEMA from './schema';
import { convertFormValues, convertLinkage } from './convertor';

const { onFieldValueChange$ } = FormEffectHooks;
const COMPONENTS = {
  RulesList,
  Input,
  AntdSelect,
  DatePicker,
  NumberPicker,
  Switch,
  RadioGroup: Radio.Group,
  JoinOperatorSelect,
};

const DEFAULT_VALUE_LINKAGE: FormBuilder.DefaultValueLinkage = {
  linkedAppID: '',
  linkedTable: { id: '', name: '' },
  linkedTableSortRules: [],
  linkedField: '',
  targetField: '',
  ruleJoinOperator: 'every',
  rules: [{
    fieldName: '',
    compareOperator: '==',
    compareTo: 'currentFormValue',
    compareValue: '',
  }],
};

export type LinkedTableFieldOptions = FormBuilder.Option & {
  fieldEnum: Array<FormBuilder.Option>;
  componentName: string;
}

type Option = {
  label: string,
  value: string,
}

type Props = {
  form: IForm;
  targetField: SchemaFieldItem | undefined;
  currentFormFields: SchemaFieldItem[];
  onClose: () => void;
  onSubmit: (linkage: FormBuilder.DefaultValueLinkage) => void;
  linkage?: FormBuilder.DefaultValueLinkage;
  isLinkedFieldHide?: boolean;
  isLinkedTableReadonly?: boolean;
}

function LinkageConfig({
  onClose, onSubmit, linkage, isLinkedFieldHide, isLinkedTableReadonly, form, currentFormFields, targetField,
}: Props): JSX.Element {
  const actions = createFormActions();
  const { setFieldState, getFieldValue, setFieldValue } = actions;
  const [linkageTables, setLinkageTables] = useState<Array<FormBuilder.Option>>([]);
  const linkedTableFieldsRef = useRef<LinkedTableFieldOptions[]>([]);
  const store = useContext(StoreContext);
  const defaultValue = linkage || DEFAULT_VALUE_LINKAGE;

  function resetFormDefaultValueOnLinkTableChanged(fields: LinkedTableFieldOptions[]): void {
    setFieldValue('sortBy', fields[0]?.value);
    setFieldValue('sortOrder', '+');
    setFieldValue('ruleJoinOperator', DEFAULT_VALUE_LINKAGE.ruleJoinOperator);
    setFieldValue('rules', DEFAULT_VALUE_LINKAGE.rules);
    setFieldValue('linkedField', DEFAULT_VALUE_LINKAGE.linkedField);
  }

  function updateFieldsEnumOnLinkedTableChanged(fields: LinkedTableFieldOptions[]): void {
    const options = fields.map(({ label, value }) => ({ label, value }));

    setFieldState('rules.*.fieldName', (state) => state.props.enum = options);
    setFieldState('linkedField', (state) => {
      const currentComponent = targetField ? targetField.componentName :
        store.activeField?.componentName.toLowerCase();
      state.props.enum = fields.filter((field) => {
        // todo match type
        return field.componentName === currentComponent;
      }).map(({ label, value }) => ({ label, value }));
    });
    setFieldState('sortBy', (state) => state.props.enum = options);

    linkedTableFieldsRef.current = fields;

    setFieldState('rules.*.fieldName', updateCompareOperatorFieldOnFieldNameChanged);
    setFieldState('rules.*.fieldName', updateCompareValueFieldEnumAndComponent);
    setFieldState('rules.*.compareOperator', updateCompareValueFieldOnCompareOperatorChanged);
    setFieldState('rules.*.compareTo', updateCompareValueFieldEnumAndComponent);
  }

  useEffect(() => {
    // find all available linkage tables
    getLinkageTables(store.appID).then((options) => {
      const filteredOptions = options.filter(({ value }) => value !== store.pageID);
      setLinkageTables(filteredOptions);
      setFieldState('linkedTableID', (state) => state.props.enum = filteredOptions);
      if (isLinkedTableReadonly) {
        form.getFieldState('Fields.linkedTable', (state) => {
          setFieldValue('linkedTableID', state.value.tableID);
        });
        return;
      }
      if (!defaultValue.linkedTable.id) {
        setFieldValue('linkedTableID', filteredOptions[0]?.value);
      }
    });
  }, []);

  function formEffect(): void {
    onFieldValueChange$('linkedTableID').pipe(
      filter(({ value }) => !!value),
      switchMap(({ value }) => from(fetchLinkedTableFields(store.appID, value))),
      tap(updateFieldsEnumOnLinkedTableChanged),
      skip(1),
    ).subscribe(resetFormDefaultValueOnLinkTableChanged);

    // todo why this observable emit value when un-mount?
    onFieldValueChange$('rules.*.fieldName').pipe(
      filter(({ value }) => !!value),
      tap(updateCompareOperatorFieldOnFieldNameChanged),
    ).subscribe(updateCompareValueFieldEnumAndComponent);

    onFieldValueChange$('rules.*.compareOperator').pipe(
      filter(({ value }) => !!value),
    ).subscribe(updateCompareValueFieldOnCompareOperatorChanged);

    onFieldValueChange$('rules.*.compareTo').pipe(
      filter(({ name, value }) => name && value),
    ).subscribe(updateCompareValueFieldEnumAndComponent);
  }

  function updateCompareOperatorFieldOnFieldNameChanged({ name, value }: IFieldState): void {
    const xComponent = linkedTableFieldsRef.current.find((field) => {
      return field.value === value;
    })?.componentName;

    if (!xComponent) {
      return;
    }

    const operators = getSourceElementOperator(xComponent) || [];
    const operatorOptions = getCompareOperatorOptions(operators);
    const compareOperatorPath = FormPath.transform(name, /\d/, ($1) => `rules.${$1}.compareOperator`);
    const currentOperator = getFieldValue(compareOperatorPath);
    const shouldReset = !operators.includes(currentOperator);

    setFieldState(compareOperatorPath, (state) => {
      state.props.enum = operatorOptions;
      if (shouldReset) {
        state.value = operatorOptions[0].value;
      }
    });
  }

  function updateCompareValueFieldOnCompareOperatorChanged({ name, value }: IFieldState): void {
    const isMultiple = ['∩', '∈', '∉'].includes(value);
    const fieldNamePath = FormPath.transform(name, /\d/, ($1) => `rules.${$1}.fieldName`);
    const compareToPath = FormPath.transform(name, /\d/, ($1) => `rules.${$1}.compareTo`);
    const currentFieldNameValue = getFieldValue(fieldNamePath);
    const currentCompareToValue = getFieldValue(compareToPath);
    let compareValueOptions: Option[] | undefined = [];
    if (currentCompareToValue === 'fixedValue') {
      compareValueOptions = linkedTableFieldsRef.current.find(
        (field) => field.value === currentFieldNameValue,
      )?.fieldEnum.map(({ label, value })=> ({ label, value }));
    }
    if (currentCompareToValue === 'currentFormValue') {
      compareValueOptions = currentFormFields
        .map((field) => ({ label: field.title as string, value: field.id }));
    }

    updateCompareValueFieldMode(name, isMultiple, compareValueOptions);
  }

  function updateCompareValueFieldEnumAndComponent({ name }: IFieldState): void {
    const fieldNamePath = FormPath.transform(name, /\d/, ($1) => `rules.${$1}.fieldName`);
    const operatePath = FormPath.transform(name, /\d/, ($1) => `rules.${$1}.compareOperator`);
    const compareToPath = FormPath.transform(name, /\d/, ($1) => `rules.${$1}.compareTo`);
    const compareValuePath = FormPath.transform(name, /\d/, ($1) => `rules.${$1}.compareValue`);
    const currentFieldNameValue = getFieldValue(fieldNamePath);
    const currentCompareToValue = getFieldValue(compareToPath);
    const linkTableField = linkedTableFieldsRef.current.find(
      (field) => field.value === currentFieldNameValue,
    );

    if (!linkTableField) {
      return;
    }

    const enumerable = !!(linkTableField.fieldEnum || []).length;
    setFieldState(compareValuePath, (state) => {
      const compareOperator = getFieldValue(operatePath);
      const preComponent = state.props['x-component'];
      const currentValue = getFieldValue(compareValuePath); // could not use 'state.value', because value is proxy when field is multiple select;

      if (currentCompareToValue === 'fixedValue' && enumerable) {
        state.props['x-component'] = 'antdselect';
        state.props['x-component-props'] = ['⊇', '⊋', '∩', '∈', '∉']
          .includes(compareOperator) ? { mode: 'multiple' } : {};
        state.props.enum = linkTableField?.fieldEnum;

        if (linkTableField.fieldEnum?.length) {
          const optionValues = linkTableField.fieldEnum;
          if (Array.isArray(currentValue)) {
            state.value = currentValue.filter((value: any) => optionValues.includes(value));
            return;
          }

          if (currentValue) {
            state.value = optionValues.includes(currentValue) ? currentValue : undefined;
            return;
          }
        }

        if (preComponent !== 'antdselect') {
          state.value = undefined;
          return;
        }

        return;
      }

      if (currentCompareToValue === 'fixedValue') {
        state.props['x-component'] = linkTableField.componentName;
        state.props.enum = undefined;

        if (!!preComponent && linkTableField.componentName !== preComponent) {
          state.value = undefined;
        }
        return;
      }

      const compareFields = currentFormFields
        .filter(({ componentName }) => {
          return componentName === linkTableField.componentName;
        })
        .map((field) => ({ label: field.title as string, value: field.id }));
      state.props['x-component'] = 'antdselect';
      state.props.enum = compareFields;
      state.props['x-component-props'] = ['∩', '∈', '∉']
        .includes(compareOperator) ? { mode: 'multiple' } : {};
      if (compareFields.length) {
        if (preComponent !== 'antdselect') {
          state.value = undefined;
          return;
        }

        const optionValues = compareFields.map(({ value }) => value);
        if (Array.isArray(currentValue)) {
          state.value = currentValue.filter((value: any) => optionValues.includes(value));
          return;
        }

        if (!!currentValue && !optionValues.includes(currentValue)) {
          state.value = undefined;
          return;
        }
      }
    });
  }

  function updateCompareValueFieldMode(
    name: string, isMultiple: boolean, options: Option[] | undefined,
  ): void {
    const compareValuePath = FormPath.transform(name, /\d/, ($1) => `rules.${$1}.compareValue`);
    setFieldState(compareValuePath, (state) => {
      const compareValue = getFieldValue(compareValuePath);
      state.props['x-component-props'] = isMultiple ? { mode: 'multiple' } : {};

      if (options && !!options?.length) {
        if (isMultiple && !Array.isArray(compareValue)) {
          const shouldResetToValue = options.find(({ value }) => {
            return value === compareValue;
          })?.value;

          state.value = [shouldResetToValue];
          return;
        }

        if (!isMultiple && Array.isArray(compareValue)) {
          const shouldResetToValue = options.find(({ value }) => {
            return compareValue.includes(value);
          })?.value;

          state.value = shouldResetToValue;
          return;
        }
      }
    });
  }

  if (isLinkedFieldHide) {
    SCHEMA.properties = omit(SCHEMA.properties, 'linkedField');
  }
  if (isLinkedTableReadonly && SCHEMA.properties) {
    SCHEMA.properties['linkedTableID'].readOnly = true;
  }

  return (
    <Modal
      title={`设置数据联动: ${targetField ? targetField.title : store.activeField?.configValue.title}`}
      className="setting-data-linkage"
      onClose={onClose}
    >
      <SchemaForm
        className="p-20"
        actions={actions}
        schema={SCHEMA}
        components={COMPONENTS}
        defaultValue={convertLinkage(defaultValue)}
        effects={formEffect}
        onSubmit={(values) => onSubmit(convertFormValues(values, store.appID, linkageTables))}
      >
        <FormButtonGroup offset={8}>
          <Button type="submit" modifier="primary">保存</Button>
          <Button type="submit" onClick={onClose}>关闭</Button>
        </FormButtonGroup>
      </SchemaForm>
    </Modal>
  );
}

export default LinkageConfig;
