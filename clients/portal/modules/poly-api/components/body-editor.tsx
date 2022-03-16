import React, { ChangeEvent, useCallback, useRef } from 'react';
import { equals } from 'ramda';
import { ISchemaFieldComponentProps } from '@formily/react-schema-renderer';
import { isString, isBoolean, isNull, isNumber, isObject, get, isArray } from 'lodash';

import {
  getFullPath, getObjectEditorNewField, fromApiDataToObjectSchema, fromObjectSchemaToApiData, isObjectField,
} from '@polyApi/utils/object-editor';

import InputEditor from './input-editor';
import FieldTypeSelector from './object-editor/field-type-selector';
import BooleanSelector from './object-editor/boolean-selector';
import ArrowDownTrigger from './arrow-down-trigger';
import ObjectEditor, { Row, Column } from './object-editor';
import { Store, ItemStore } from './object-editor/store';
import { updateErrors } from '../utils/object-editor';

type Props = ISchemaFieldComponentProps & {
  columnsDataIndexToOmit?: string[];
  extraColumns?: Column<POLY_API.ObjectSchema>[];
  onAddField?: () => void;
  typeConfig?: { simple?: boolean; rule?: boolean };
  defaultFieldType?: POLY_API.API_FIELD_TYPE;
}

function BodyEditor(props: Props): JSX.Element {
  const isValidating = !!props.props['x-component-props']?.validating;

  const {
    columnsDataIndexToOmit,
    extraColumns = [],
    value,
    onAddField,
    typeConfig = { simple: true },
    defaultFieldType,
  } = props;
  const isValueObject = isObject(value) && !isArray(value);
  const errorsRef = useRef<Record<string, string>>({});

  const handleChange = useCallback((_value: POLY_API.ObjectSchema[]) => {
    const distValue = fromObjectSchemaToApiData(_value);
    const newValue = isValueObject ? { type: 'object', data: distValue } : distValue;
    !equals(value, newValue) && props.mutators.change(newValue);
  }, [value]);

  function handleRowChange(
    keyType: keyof POLY_API.ObjectSchema,
    current$: ItemStore<POLY_API.ObjectSchema>,
    store$: Store<POLY_API.ObjectSchema>,
  ) {
    return (e: ChangeEvent<HTMLInputElement> | string | boolean | number) => {
      const value = isString(e) || isBoolean(e) || isNumber(e) ? e : e.target.value;
      keyType === 'name' && updateErrors(value, current$.id, errorsRef);
      if (keyType === 'type' && !isObjectField(current$.get('type')) && isObjectField(`${value}`)) {
        current$.removeChild();
        current$.set('rule', '');
      }
      current$.set(keyType, value);
      store$.update();
    };
  }

  function handleHideChildren(
    current$: ItemStore<POLY_API.ObjectSchema>, store$: Store<POLY_API.ObjectSchema>,
  ) {
    return () => {
      current$.isChildrenHidden ? current$.showChildren() : current$.hideChildren();
      store$.update();
    };
  }

  function nameRender(
    { name, parentPath, current$, index, type }: Row<POLY_API.ObjectSchema>,
    store$: Store<POLY_API.ObjectSchema>,
  ): JSX.Element {
    const path = getFullPath(parentPath, name, index);
    const level = path.split('.').length;
    isValidating && updateErrors(name || '', current$.id, errorsRef);
    const showInput = !isNull(name) && current$.parent$?.get('type') !== 'array';

    return (
      <div className="flex items-center" style={{ marginLeft: (level - 1) * 20 }}>
        {(type === 'object' || type === 'array') && !!current$.children$.length && (
          <ArrowDownTrigger
            className="mr-5"
            isContentVisible={!current$.isChildrenHidden}
            onToggle={handleHideChildren(current$, store$)}
          />
        )}
        {showInput && (
          <>
            <InputEditor
              className="flex-1"
              value={name}
              onChange={handleRowChange('name', current$, store$)}
              placeholder="请输入参数名称"
            />
            {!!errorsRef.current[current$.id] && (
              <span className="text-red-600 px-3 text-12">{errorsRef.current[current$.id]}</span>
            )}
          </>
        )}
        {!showInput && <span className="text-caption-no-color-weight text-gray-400">{index}</span>}
      </div>
    );
  }

  function typeRender(
    { type, current$ }: Row<POLY_API.ObjectSchema>,
    store$: Store<POLY_API.ObjectSchema>,
  ): JSX.Element {
    return (
      <FieldTypeSelector
        complexity
        {...typeConfig}
        type={type}
        onChange={handleRowChange('type', current$, store$)}
      />
    );
  }

  function requiredRender(
    { required, current$ }: Row<POLY_API.ObjectSchema>,
    store$: Store<POLY_API.ObjectSchema>,
  ): JSX.Element {
    return (
      <BooleanSelector value={required} onChange={handleRowChange('required', current$, store$)} />
    );
  }

  function descRender(
    { desc, current$ }: Row<POLY_API.ObjectSchema>,
    store$: Store<POLY_API.ObjectSchema>,
  ): JSX.Element {
    return (
      <InputEditor
        includeChinese
        limit={100}
        placeholder="请输入参数描述"
        value={desc}
        onChange={handleRowChange('desc', current$, store$)}
      />
    );
  }

  function handleAddField(
    row: Row<POLY_API.ObjectSchema> | null,
    store$: Store<POLY_API.ObjectSchema>,
  ): void {
    onAddField?.();
    row?.current$.showChildren();
    if (!row) {
      return store$?.addChild(
        getObjectEditorNewField(null, 'body', defaultFieldType), store$.Value.length,
      );
    }
    const { type, current$, parent$, children$, parentPath, name, index } = row;
    const defaultNewField = getObjectEditorNewField(
      getFullPath(parentPath, name, index), 'body', defaultFieldType,
    );
    if (type === 'object') {
      current$.addChild(defaultNewField, children$.length);
      return store$.update();
    }
    if (type === 'array' && children$) {
      defaultNewField.name = null;
      current$.addChild(defaultNewField, children$.length);
      return store$.update();
    }
    if (!parent$) {
      return store$?.addChild(
        getObjectEditorNewField(null, 'body', defaultFieldType), store$.Value.length,
      );
    }
    if ((parent$.Value as POLY_API.ObjectSchema)?.type === 'array') {
      defaultNewField.name = null;
    }
    defaultNewField.parentPath = parentPath;
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
      title: '是否必填',
      dataIndex: 'required',
      render: requiredRender,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      render: descRender,
    },
    ...extraColumns,
  ].filter(({ dataIndex }) => !columnsDataIndexToOmit?.includes(dataIndex));

  let valueFrom = isValueObject ? get(value, 'data', []) : value;
  const valueData = get(value, 'data', []);
  valueFrom = valueData.length && !valueFrom.length ? valueData : valueFrom;

  return (
    <>
      <p className="mt-12 mb-4 text-h6-no-color-weight text-gray-900">Body</p>
      <ObjectEditor<POLY_API.ObjectSchema>
        columns={columns}
        value={fromApiDataToObjectSchema((valueFrom || []) as POLY_API.PolyNodeInput[])}
        onAddField={handleAddField}
        onChange={handleChange}
      />
    </>
  );
}

BodyEditor.isFieldComponent = true;

export default BodyEditor;
