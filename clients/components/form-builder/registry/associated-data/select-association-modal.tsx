import React, { useRef } from 'react';

import Modal from '@c/modal';
import FormDataTable from '@c/form-app-data-table';
import { Ref } from '@c/form-app-data-table/type';
import { getBasicValue } from '@c/form-data-value-renderer';

type Props = {
  onClose: () => void;
  onSubmit: (value: LabelValue) => void;
  appID: string;
  displayField: string;
  tableID: string;
}

export default function SelectAssociationModal({
  onClose, appID, tableID, onSubmit, displayField,
}: Props): JSX.Element {
  const tableRef: React.MutableRefObject<Ref | undefined> = useRef<Ref>();
  const handleSelect = (rowData: ObjectAny): void => {
    const schema = tableRef?.current?.getSchema()?.properties?.[displayField] as ISchema;
    const value = rowData[displayField];
    const label = value ? getBasicValue(schema, value) : '--';
    onSubmit({ label, value: rowData._id });
  };

  const customColumns = [
    {
      id: 'action',
      Headers: '操作',
      accessor: (rowData: any) => {
        return (
          <div className='text-btn' onClick={() => handleSelect(rowData)}>选择</div>
        );
      },
    },
  ];

  return (
    <Modal
      title="选择关联数据"
      onClose={onClose}
    >
      <FormDataTable
        showCheckbox={false}
        className="p-20"
        allowRequestData
        customColumns={customColumns}
        ref={tableRef as React.Ref<Ref>}
        pageID={tableID}
        appID={appID}
      />
    </Modal>
  );
}
