import React, { JSXElementConstructor, useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';

import { getTableSchema } from '@lib/http-client';
import type { NodeWorkForm, Data, BusinessData } from '@flowEditor/type';

import FormDataForm from './form-data';
import ApproveForm from './intermidiate/approve';
import ProcessVariableAssignmentConfig from './process-variable-assignment-config';
import FlowTableContext from './flow-source-table';
import CreateTableData from './create-table-data';
import FlowContext from '../../../flow-context';
import ProcessBranch from './process-branch';
import ProcessBranchTarget from './process-branch-target';

interface Props {
  workForm: NodeWorkForm;
  defaultValue: Data;
  onSubmit: (data: BusinessData) => void;
  onCancel: () => void;
}

function Placeholder(): JSX.Element | null {
  return null;
}

function useTableSchema(appID: string, tableID: string): ISchema | null {
  const [schema, setSchema] = useState<ISchema | null>(null);

  const { data, isLoading, isError } = useQuery<ISchema>(['FETCH_TABLE_SCHEMA', appID, tableID], () => {
    if (!tableID) {
      return Promise.resolve({});
    }

    return getTableSchema(appID, tableID).then(({ schema }) => (schema || {}));
  });

  useEffect(() => {
    if (isLoading || isError) {
      return;
    }

    if (!data) {
      return setSchema({});
    }

    setSchema(data);
  }, [data, isLoading, isError]);

  return schema;
}

const components: Record<string, JSXElementConstructor<any>> = {
  formData: FormDataForm,
  approve: ApproveForm,
  fillIn: ApproveForm,
  processBranch: ProcessBranch,
  processBranchTarget: ProcessBranchTarget,
  processVariableAssignment: ProcessVariableAssignmentConfig,
  tableDataCreate: CreateTableData,
  tableDataUpdate: Placeholder,
  sendEmail: Placeholder,
  cc: Placeholder,
  webMessage: Placeholder,
};

export default function Form({
  workForm,
  defaultValue,
  onSubmit,
  onCancel,
}: Props): JSX.Element {
  function getConfigForm(): JSX.Element {
    const component = components[defaultValue.type];
    return React.createElement(component, {
      defaultValue: defaultValue.businessData,
      onSubmit,
      onCancel,
      nodeType: defaultValue.type,
    });
  }
  const { appID } = useContext(FlowContext);
  const sourceTableSchema = useTableSchema(appID, workForm?.value || '');

  if (!sourceTableSchema) {
    // todo handle error case
    return (<div>loading...</div>);
  }

  return (
    <FlowTableContext.Provider
      value={{
        tableID: workForm?.value || '',
        tableName: workForm?.name || '',
        tableSchema: sourceTableSchema,
      }}
    >
      <div className="flex-1" style={{ height: 'calc(100% - 56px)' }}>
        {getConfigForm()}
      </div>
    </FlowTableContext.Provider>
  );
}
