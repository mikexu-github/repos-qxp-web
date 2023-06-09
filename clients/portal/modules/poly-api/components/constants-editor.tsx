import React, { ChangeEvent, useCallback, useRef } from 'react';
import { ISchemaFieldComponentProps } from '@formily/react-schema-renderer';
import { isString, isBoolean, isNumber } from 'lodash';
import { equals } from 'ramda';

import {
  getObjectEditorNewConstantField, fromApiDataToPolyConstSchema, fromPolyConstSchemaToApiData, isObjectField,
} from '@polyApi/utils/object-editor';

import InputEditor from './input-editor';
import FieldTypeSelector from './object-editor/field-type-selector';
import ObjectEditor, { Row } from './object-editor';
import { Store, ItemStore } from './object-editor/store';
import BooleanSelector from './object-editor/boolean-selector';
import { updateErrors } from '../utils/object-editor';

function BodyEditor({ mutators, value, props }: ISchemaFieldComponentProps): JSX.Element {
  const isValidating = !!props['x-component-props']?.validating;

  const handleChange = useCallback((_value: POLY_API.PolyConstSchema[]) => {
    const distValue = fromPolyConstSchemaToApiData(_value);
    !equals(value, distValue) && mutators.change(distValue);
  }, [value]);
  const errorsRef = useRef<Record<string, string>>({});

  function handleRowChange(
    keyType: keyof POLY_API.PolyConstSchema,
    current$: ItemStore<POLY_API.PolyConstSchema>,
    store$: Store<POLY_API.PolyConstSchema>,
  ) {
    return (e: ChangeEvent<HTMLInputElement> | string | number | boolean) => {
      const value = isString(e) || isBoolean(e) || isNumber(e) ? e : e.target.value;
      keyType === 'name' && updateErrors(value, current$.id, errorsRef);
      if (keyType === 'type' && isObjectField(current$.get('type')) && !isObjectField(`${value}`)) {
        current$.removeChild();
      }
      current$.set(keyType, value);
      store$.update();
    };
  }

  function nameRender(
    { name, current$ }: Row<POLY_API.PolyConstSchema>,
    store$: Store<POLY_API.PolyConstSchema>,
  ): JSX.Element {
    isValidating && updateErrors(name, current$.id, errorsRef);
    return (
      <div className="flex items-center">
        <InputEditor
          className="flex-1"
          value={name}
          onChange={handleRowChange('name', current$, store$)}
          placeholder="请输入参数名称"
        />
        {!!errorsRef.current[current$.id] && (
          <span className="text-red-600 px-3 text-12">{errorsRef.current[current$.id]}</span>
        )}
      </div>
    );
  }

  function typeRender(
    { type, current$ }: Row<POLY_API.PolyConstSchema>,
    store$: Store<POLY_API.PolyConstSchema>,
  ): JSX.Element {
    return (
      <FieldTypeSelector
        simple
        type={type}
        onChange={handleRowChange('type', current$, store$)}
      />
    );
  }

  function valueRender(
    { data, type, current$ }: Row<POLY_API.PolyConstSchema>,
    store$: Store<POLY_API.PolyConstSchema>,
  ): JSX.Element {
    if (type === 'boolean' || isBoolean(data)) {
      return (
        <BooleanSelector value={!!data} onChange={handleRowChange('data', current$, store$)} />
      );
    }

    return (
      <InputEditor
        className="ml-2"
        type={type === 'number' ? 'number' : 'text'}
        value={data}
        onChange={handleRowChange('data', current$, store$)}
        placeholder="请输入字段值"
      />
    );
  }

  function descRender(
    { desc, current$ }: Row<POLY_API.PolyConstSchema>,
    store$: Store<POLY_API.PolyConstSchema>,
  ): JSX.Element {
    return (
      <InputEditor
        includeChinese
        limit={100}
        value={desc}
        onChange={handleRowChange('desc', current$, store$)}
        placeholder="请输入参数描述"
      />
    );
  }

  function handleAddField(
    row: Row<POLY_API.PolyConstSchema> | null,
    store$: Store<POLY_API.PolyConstSchema>,
  ): void {
    if (!row || !row?.parent$) {
      return store$?.addChild(getObjectEditorNewConstantField(), store$.Value.length);
    }
    const { parent$, index, type } = row;
    const defaultNewField = getObjectEditorNewConstantField();
    if (type === 'boolean') {
      defaultNewField.data = false;
    }
    parent$.addChild(defaultNewField, index + 1);
    return store$.update();
  }

  const columns = [
    {
      title: '参数名称',
      dataIndex: 'name',
      render: nameRender,
    },
    {
      title: '参数类型',
      dataIndex: 'type',
      render: typeRender,
    },
    {
      title: '参数值',
      dataIndex: 'data',
      render: valueRender,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      render: descRender,
    },
  ];

  return (
    <>
      <p className="mt-8 mb-4 text-h6-no-color-weight text-gray-900">常量参数</p>
      <ObjectEditor<POLY_API.PolyConstSchema>
        columns={columns}
        value={fromApiDataToPolyConstSchema((value || []) as POLY_API.PolyConstSchema[])}
        onAddField={handleAddField}
        onChange={handleChange}
      />
    </>
  );
}

BodyEditor.isFieldComponent = true;

export default BodyEditor;
