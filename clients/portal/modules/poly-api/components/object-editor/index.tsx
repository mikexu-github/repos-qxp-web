import React, { useMemo, useCallback } from 'react';
import { isFunction, isString } from 'lodash';
import { useUpdateEffect } from 'react-use';
import cs from 'classnames';

import useObservable from '@lib/hooks/use-observable';
import { storeValuesToDataSource } from '@polyApi/utils/object-editor';
import Icon from '@c/icon';

import { Store, createStore, ItemStore } from './store';

import './style.scss';

export type Row<T extends { children: T[]; id: string }> = T & {
  parent$?: ItemStore<T> | Store<T> | null;
  children$: ItemStore<T>[];
  current$: ItemStore<T>;
}

export interface Column<T extends { children: T[]; id: string }> {
  title: string | ((store$: Store<T>) => JSX.Element | null);
  dataIndex: string;
  render: (row: Row<T>, store$: Store<T>) => JSX.Element | null;
}

interface Props<T extends { children: T[]; id: string }> {
  columns: Column<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  onAddField: (row: Row<T> | null, store: Store<T>) => void;
  addFilter?: (row: Row<T>) => boolean;
}

function ObjectEditor<T extends { children: T[]; id: string }>(
  { columns, value, onAddField, onChange, addFilter }: Props<T>,
): JSX.Element | null {
  const store$: Store<T> = useMemo(() => createStore(value || []), []);
  const storeValues$ = useObservable(store$, []);
  const dataSource = useMemo(() => storeValuesToDataSource(storeValues$), [storeValues$]);

  useUpdateEffect(() => {
    store$.setChildren(value);
  }, [value]);

  useUpdateEffect(() => {
    onChange(dataSource);
  }, [dataSource]);

  const handleAddField = useCallback((row: Row<T> | null, store$: Store<T>) => {
    return () => onAddField(row, store$);
  }, [onAddField]);

  const handleDeleteField = useCallback(({ current$, parent$ }: Row<T>, store$: Store<T>) => {
    return () => {
      (parent$ || store$)?.removeChild(current$);
      parent$ !== store$ && store$.update();
    };
  }, []);

  const rowActionRender = useCallback((row: Row<T>, store$: Store<T>): JSX.Element => {
    const showAdd = addFilter?.(row);
    return (
      <div className="flex items-center gap-12">
        <Icon
          clickable
          name="add-object-field"
          size={20}
          onClick={() => showAdd && handleAddField(row, store$)}
          className={cs('transition duration-240', {
            'opacity-100': showAdd,
            'opacity-0 cursor-default pointer-events-none absolute': !showAdd,
          })}
        />
        <Icon clickable name="delete" size={20} onClick={handleDeleteField(row, store$)} />
      </div>
    );
  }, [addFilter]);

  const distColumns = useMemo(() => {
    return columns.concat({
      title: (store$: Store<T>) => (
        <Icon clickable name="add-object-field" size={20} onClick={handleAddField(null, store$)} />
      ),
      dataIndex: 'action',
      render: rowActionRender,
    });
  }, [columns]);

  return (
    <section className="mx-auto font-mono">
      <div className="w-full overflow-hidden mb-8 rounded-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full object-editor-table">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900">
                {distColumns.map(({ title, dataIndex }) => {
                  return (
                    <th
                      key={isString(title) ? title : dataIndex}
                      className="px-6 py-8 border align-middle whitespace-nowrap"
                    >
                      {isFunction(title) ? title(store$) : title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white">
              {dataSource.filter((data) => !data.current$.isHidden).map((row) => {
                return (
                  <tr
                    className="text-gray-700"
                    key={row.current$.id}
                  >
                    {distColumns.map(({ dataIndex, render }) => {
                      return (
                        <td
                          key={dataIndex}
                          className="px-6 py-8 border align-middle whitespace-nowrap"
                        >
                          {render?.(row, store$)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

ObjectEditor.isFieldComponent = true;

export default ObjectEditor;
