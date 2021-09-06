import React from 'react';
import { Checkbox, Space } from 'antd';
import { ISchemaFieldComponentProps } from '@formily/react-schema-renderer';

import useEnumOptions from '@lib/hooks/use-enum-options';

type CheckboxValueType = string | number | boolean;

function CheckBoxGroup(fieldProps: ISchemaFieldComponentProps): JSX.Element {
  const options = useEnumOptions(fieldProps);
  const { optionsLayout } = fieldProps.props['x-component-props'];

  function handleCheckBoxChange(value: Array<CheckboxValueType>): void {
    fieldProps.mutators.change(value);
  }

  if (options.length === 0) {
    return <span>当前选项集无数据。</span>;
  }

  const editable = fieldProps.editable ?? !fieldProps.readOnly;

  return (
    <div className="flex items-center">
      {editable && (
        <Checkbox.Group onChange={handleCheckBoxChange} value={fieldProps.value}>
          <Space direction={optionsLayout}>
            {
              options.map((option): JSX.Element => {
                return (
                  <Checkbox key={option.value} value={option.value}>{option.label}</Checkbox>);
              })
            }
          </Space>
        </Checkbox.Group>
      )}
      {!editable && (
        <>{options.find(({ value }) => value === fieldProps.value)?.label || '-'}</>
      )}
    </div>
  );
}

CheckBoxGroup.isFieldComponent = true;

export default CheckBoxGroup;
