import React, { useContext, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import cs from 'classnames';
import { get, set } from 'lodash';
import { useUpdateEffect } from 'react-use';

import Select from '@c/select';
import Checkbox from '@c/checkbox';
import Icon from '@c/icon';
import ToolTip from '@c/tooltip';

import { ApiParam, ParamGroup } from './params-config';
import paramsContext from './context';
import { useQueryString } from '../hooks';

interface Props {
  className?: string;
  idx: number;
  group: ParamGroup;
}

const paramTypes = [
  { label: 'string', value: 'string' },
  { label: 'number', value: 'number' },
  { label: 'boolean', value: 'boolean' },
  { label: 'object', value: 'object' },
  { label: 'array', value: 'array' },
  { label: 'timestamp', value: 'timestamp' },
  { label: 'action', value: 'action' },
];

const timeTypes = [
  { label: 'default', value: 'YYYY-MM-DDThh:mm:ssZ' },
  { label: 'ISO8601', value: 'YYYY-MM-DDThh:mm:ss+0000' },
];

function ParamRow({
  id,
  name,
  required,
  type,
  description,
  readonlyKeys = [],
  group,
  idx,
  parentPath,
  constIn,
  constData,
  _object_nodes_,
  _array_nodes_,
}: Props & ApiParam): JSX.Element {
  const store = useContext(paramsContext);
  const { register, formState: { errors }, control } = useFormContext();
  const [expand, setExpand] = useState(false);
  const qs = useQueryString();
  const isEdit = qs.get('action') === 'edit';

  useUpdateEffect(()=> {
    if (group !== 'constant') {
      return;
    }
    if (!isEdit) {
      // set default constIn value when change method on create mode
      const constIn = ['post', 'put'].includes(store.metaInfo.method) ? 'body' : 'query';
      store.setFieldValue(getFieldName('constIn'), constIn);
    }
  }, [store.metaInfo.method]);

  /*
  level:
  query.0.name  level-1
  query.0.type
  query.0._object_nodes_.0.name    level-2 object
  query.0._object_nodes_.0._object_nodes_.0.name  level-3
  query.0._array_nodes_.1.name   level-2 array
 */
  function getFieldName(name: string): string {
    return [parentPath || group, idx, name].join('.');
  }

  function handleChangeField(fieldName: string, val: any): void {
    store.setFieldValue(fieldName, val);
  }

  function getValidTypes(): LabelValue[] {
    if (group === 'path') {
      return paramTypes.filter(({ value })=> ['string', 'number'].includes(value));
    }
    if (group === 'body') {
      return paramTypes.filter(
        ({ value })=> !['timestamp', 'action'].includes(value),
      );
    }
    if (group === 'constant') {
      return paramTypes.filter(
        ({ value })=> ['string', 'number', 'boolean', 'timestamp', 'action'].includes(value),
      );
    }
    if (['query', 'header'].includes(group)) {
      return paramTypes.filter(({ value })=> ['string', 'number', 'boolean'].includes(value));
    }
    if (group === 'response') {
      return paramTypes.filter(
        ({ value })=> !['timestamp', 'action'].includes(value),
      );
    }
    return paramTypes;
  }

  function getLevel(): number {
    return (parentPath || '').split('.').filter((v)=> Number.isInteger(parseInt(v))).length;
  }

  // When the parent collapses, the child needs to collapse with it
  function isRowExpand(parentPath: string): boolean {
    const parentPathList = parentPath.split('.');
    const isExpand: Array<boolean> = [true];
    for (let index = 2; index < parentPathList.length; index += 2) {
      if (!get(store.parameters, [...parentPath?.split('.').slice(0, index), 'expand'].join('.'), true)) {
        isExpand[0] = false;
        break;
      }
    }
    return isExpand[0];
  }

  function renderExpandBtn(): JSX.Element | null {
    if ((type === 'object' && !!_object_nodes_?.length) || (type === 'array' && !!_array_nodes_?.length)) {
      return (
        <Icon
          name={expand ? 'expand_more' : 'expand_less'}
          className='-mr-3 ml-8 cursor-pointer'
          onClick={()=> {
            setExpand((expand)=> !expand);
            set(store.parameters, [parentPath || group, idx, 'expand'].join('.'), expand);
          }}
          clickable
        />
      );
    }
    return null;
  }

  return (
    <tr
      key={id}
      className={cs({
        'from-expand': parentPath ? !isRowExpand(parentPath) : false,
      })}
    >
      <td className={cs('param-name flex items-center')} style={{
        paddingLeft: (getLevel() * 20) + 'px',
      }}>
        <input
          type="hidden"
          className='hidden'
          defaultValue={id}
          {...register(getFieldName('id'))}
        />
        {renderExpandBtn()}
        <Controller
          render={({ field })=> {
            const readonly = readonlyKeys?.includes('name');
            return (
              <input
                type="text"
                className={cs({
                  error: get(errors, getFieldName('name')),
                  'opacity-50 cursor-not-allowed': readonly,
                })}
                maxLength={32}
                placeholder='新建参数'
                {...field}
                value={name}
                onChange={(ev)=> {
                  const { value } = ev.target;
                  if (!value || /^[a-zA-Z_$][\w-$]*$/.test(value)) {
                    field.onChange(ev.target.value);
                    handleChangeField(getFieldName('name'), ev.target.value);
                  }
                }}
                onKeyDown={() => {
                  parentPath ? '' : store.addParam(group, idx);
                }}
                readOnly={readonly}
              />
            );
          }}
          name={getFieldName('name')}
          control={control}
          rules={{
            validate: (val)=> {
              if (!val) {
                return true;
              }
              return /^[a-zA-Z_$][\w-$]*$/.test(val);
            },
          }}
          shouldUnregister
        />
      </td>
      <td className='param-type'>
        <Controller
          render={({ field })=> (
            <Select
              options={getValidTypes()}
              {...field}
              value={type}
              onChange={(val)=> {
                if (val === 'action') {
                  handleChangeField(getFieldName('constData'), store.apiPath.split('?')[1]);
                } else {
                  handleChangeField(getFieldName('constData'), '');
                }
                handleChangeField(getFieldName('type'), val);
                // if type changed, should reset sub nodes
                if (type !== val) {
                  store.resetSubNodesByType(getFieldName('type'));
                }
              }}
            />
          )}
          control={control}
          name={getFieldName('type')}
          shouldUnregister
        />
      </td>
      {group === 'constant' && (
        <>
          <td className='param-data'>
            <Controller
              render={({ field })=> {
                if (type === 'timestamp') {
                  return (
                    <Select
                      options={timeTypes}
                      {...field}
                      value={constData}
                      onChange={(val)=> {
                        field.onChange(val);
                        handleChangeField(getFieldName('constData'), val);
                      }}
                    />
                  );
                } else {
                  return (
                    <input
                      type={type === 'number' ? 'number' : 'text'}
                      className={cs({
                        error: get(errors, getFieldName('constData')),
                      })}
                      maxLength={128}
                      placeholder='请输入'
                      disabled={type === 'action' ? true : false}
                      {...field}
                      value={constData}
                      onChange={(ev)=> {
                        field.onChange(ev.target.value);
                        handleChangeField(getFieldName('constData'), ev.target.value);
                      }}
                    />
                  );
                }
              }}
              name={getFieldName('constData')}
              control={control}
              // rules={{
              //   validate: (val)=> {
              //     if (!watchName) {
              //       return true;
              //     }
              //     return !!val;
              //   },
              // }}
              shouldUnregister
            />
          </td>
          <td className='param-in'>
            <Controller
              render={({ field })=> (
                <Select
                  options={[
                    { label: 'query', value: 'query' },
                    { label: 'header', value: 'header' },
                    { label: 'body', value: 'body' },
                  ]}
                  {...field}
                  value={constIn}
                  onChange={(val)=> handleChangeField(getFieldName('constIn'), val)}
                />
              )}
              control={control}
              name={getFieldName('constIn')}
              shouldUnregister
            />
          </td>
        </>
      )}
      {group !== 'constant' && (
        <td className='param-required'>
          <Controller
            render={({ field })=> {
              const readonly = readonlyKeys?.includes('required');
              return (
                <Checkbox
                  className={cs({
                    'cursor-not-allowed': readonly,
                  })}
                  {...field}
                  checked={required}
                  disabled={readonly}
                  onChange={(ev)=> handleChangeField(getFieldName('required'), ev.target.checked)}
                />
              );
            }}
            name={getFieldName('required')}
            control={control}
            shouldUnregister
          />
        </td>
      )}
      <td className='param-desc relative'>
        <Controller
          render={({ field })=> (
            <input
              type="text"
              placeholder='建议输入中文, 最多32字符'
              maxLength={32}
              {...field}
              value={description}
              onChange={(ev)=> handleChangeField(getFieldName('description'), ev.target.value)}
              onKeyDown={() => {
                parentPath ? '' : store.addParam(group, idx);
              }}
            />
          )}
          name={getFieldName('description')}
          control={control}
          shouldUnregister
        />
      </td>
      <td className='param-operation'>
        <div className='param-actions flex items-center'>
          {group !== 'path' && (idx !== store.parameters[group].length - 1 || parentPath) && (
            <div className='ml-12 mt-5'>
              {['array', 'object'].includes(type) && (
                <ToolTip
                  label='添加子集'
                  position='top'
                  labelClassName="whitespace-nowrap text-12"
                >
                  <Icon
                    name='playlist_add'
                    size={16}
                    onClick={()=> {
                      store.addSubParam(group, parentPath || '', idx, type === 'array');
                      setExpand(false);
                      set(store.parameters, [parentPath || group, idx, 'expand'].join('.'), true);
                    }}
                    className='cursor-pointer mr-8 hover:text-blue-600'
                    clickable
                  />
                </ToolTip>
              )}
              <Icon
                name='delete'
                size={16}
                onClick={()=> store.removeParam(group, parentPath || '', idx)}
                className='cursor-pointer hover:text-red-600'
                clickable
              />
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default ParamRow;
