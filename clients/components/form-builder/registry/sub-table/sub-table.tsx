import React, { useEffect, useState } from 'react';
import { ISchemaFieldComponentProps } from '@formily/react-schema-renderer';
import { Table } from 'antd';
import { Input, Radio, DatePicker } from '@formily/antd-components';

import { getFormTableSchema } from './api';
import logger from '@lib/logger';

type Components = typeof components;

const components = {
  input: Input,
  radiogroup: Radio.Group,
  textarea: Input.TextArea,
  datepicker: DatePicker,
};

interface Props extends ISchemaFieldComponentProps {
  props: {
    [key: string]: any;
    ['x-component-props']: {
      columns: string[];
      appID: string;
      tableID: string;
      subordination: 'foreign_table' | 'sub_table';
      tableName: string;
    }
  }
}

function SubTable(compProps: Props) {
  const [schemaData, setSchemaData] = useState<{tableID: string; schema: ISchema} | null>(null);
  const { schema: definedSchema } = compProps;
  const { tableID, appID, columns: definedColumns } = compProps.props['x-component-props'];

  useEffect(() => {
    if (!appID || !tableID) {
      return;
    }
    getFormTableSchema<{
      schema: ISchema;
      tableID: string;
    }>({ appID, tableID }).then(setSchemaData);

    return () => setSchemaData(null);
  }, [tableID, appID]);

  const schema = appID && tableID && (schemaData?.tableID === tableID) && schemaData?.schema ?
    schemaData?.schema : definedSchema.items as ISchema;

  const columns: any[] = (definedColumns?.map((v) => JSON.parse(v)) ?? [])?.map(({ dataIndex, title }: {
    title: string;
    dataIndex: string;
  }) => {
    const sc = schema?.properties?.[dataIndex];
    if (!sc) {
      return null;
    }
    const componentName = sc['x-component']?.toLowerCase() as keyof Components;
    const componentProps = sc['x-component-props'] ?? {};
    if (!components[componentName]) {
      logger.error('component %s is missing in subTable', componentName);
      return null;
    }

    return {
      title,
      dataIndex,
      render: () => {
        return React.createElement(components[componentName], {
          ...compProps,
          mutators: {
            ...compProps.mutators,
            change: (e: any) => {
              const v = e.target.value;
              compProps.value[dataIndex] = v;
              compProps.mutators.change(compProps.value);
            },
          },
          defaultValue: compProps.defaultValue,
          value: compProps.value[dataIndex],
          props: {
            ...compProps.props,
            'x-component-props': {
              ...componentProps,
            },
          },
        });
      },
    };
  }).filter(Boolean);

  const dataSource = [{ ...(schema?.properties ?? {}), key: 0 }];

  if (!columns.length) {
    return null;
  }

  return (
    <Table columns={columns} dataSource={dataSource} pagination={false} />
  );
}

SubTable.isFieldComponent = true;

export default SubTable;
