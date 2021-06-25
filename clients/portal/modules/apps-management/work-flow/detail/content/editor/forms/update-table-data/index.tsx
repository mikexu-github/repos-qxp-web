import React, { useContext, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { every } from 'lodash';

import Select from '@c/select';
import Toggle from '@c/toggle';
import Modal from '@c/modal';

import SaveButtonGroup from '@flowEditor/components/_common/action-save-button-group';
import { getFormDataOptions } from '@c/form-table-selector/api';
import FlowContext from '@flow/detail/flow-context';
import FlowTableContext from '../flow-source-table';
import toast from '@lib/toast';

import { BusinessData, TableDataUpdateData } from '@flowEditor/type';
import Context from './context';
import FilterRule, { RefType as FilterRuleRef } from './filter-rule';
import UpdateRules, { RefType as UpdateRuleRef } from './update-rules';

import './styles.scss';

interface Props {
  defaultValue: TableDataUpdateData;
  onSubmit: (data: BusinessData) => void;
  onCancel: () => void;
}

const initialValue = {
  targetTableId: '',
  silent: true,
  filterRule: '', // formula rule
  updateRule: [],
};

export default function UpdateTableData({ defaultValue, onSubmit, onCancel }: Props): JSX.Element {
  const { appID } = useContext(FlowContext);
  const { tableID } = useContext(FlowTableContext);
  const [value, setValue] = useState<TableDataUpdateData>(defaultValue || {});
  const filterRef = useRef<FilterRuleRef>(null);
  const updateRef = useRef<UpdateRuleRef>(null);
  const [nextTable, setNextTable] = useState<string>('');
  const [switchTableModal, setSwitchTableModal] = useState(false);

  const {
    data: allTables = [],
    isLoading,
    isError,
  } = useQuery(['GET_WORK_FORM_LIST', appID], getFormDataOptions, {
    enabled: !!appID,
  });

  const onSave = () => {
    if (!value.targetTableId) {
      toast.error('请选择目标数据表');
      return;
    }
    const filterRule = filterRef.current?.getRule();
    const updateRule = updateRef.current?.getValues();
    if (!every(updateRule, (v) => !!v.fieldName)) {
      toast.error('更新规则的目标表字段不能为空');
      return;
    }
    Object.assign(value, { filterRule: filterRule || '', updateRule });
    onSubmit(value);
  };

  const onClose = () => {
    onCancel();
  };

  const onChange = (val: Partial<TableDataUpdateData>): void => {
    setValue((v) => ({ ...v, ...val }));
  };

  const onChangeTargetTable = (table_id: string) => {
    if (!value.targetTableId) {
      onChange({ targetTableId: table_id });
      return;
    }
    if (value.targetTableId && table_id !== value.targetTableId) {
      setNextTable(table_id);
      setSwitchTableModal(true);
    }
  };

  if (isLoading) {
    return (
      <div>Loading..</div>
    );
  }

  if (isError) {
    return (
      <div>获取目标表失败</div>
    );
  }

  return (
    <Context.Provider value={{ data: value, setData: onChange }}>
      <div className="flex flex-col">
        <div className="inline-flex items-center">
          <span className="text-body mr-10">目标数据表:</span>
          <Select
            options={allTables.filter((tb) => tb.value !== tableID)}
            placeholder="选择数据表"
            value={value.targetTableId}
            onChange={onChangeTargetTable}
          />
        </div>
        {value.targetTableId && (
          <>
            <div className="inline-flex items-center mt-10">
              <span className="text-body mr-10">表单数据是否触发工作流执行:</span>
              <Toggle
                onChange={(silent) => {
                  onChange({ silent });
                }}
                defaultChecked={value.silent}
              />
            </div>
            <FilterRule
              defaultValue={value.filterRule}
              ref={filterRef}
            />
            <UpdateRules
              appId={appID}
              tableId={value.targetTableId}
              defaultValue={value.updateRule}
              ref={updateRef}
            />
          </>
        )}
        <SaveButtonGroup onSave={onSave} onCancel={onClose} />
        {switchTableModal && (
          <Modal
            title='切换目标数据表'
            footerBtns={[
              {
                key: 'cancel',
                text: '取消',
                onClick: () => setSwitchTableModal(false),
              },
              {
                key: 'confirm',
                text: '确认',
                onClick: () => {
                  setSwitchTableModal(false);
                  setValue({ ...initialValue, targetTableId: nextTable }); // reset value
                },
                modifier: 'primary',
              },
            ]}
          >
            <p>切换数据表之后数据更新的配置将清空，是否继续？</p>
          </Modal>
        )}
      </div>
    </Context.Provider>

  );
}
