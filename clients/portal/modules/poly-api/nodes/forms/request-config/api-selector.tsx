import React, { useState } from 'react';
import cs from 'classnames';
import { clone } from 'ramda';
import { Cascader } from 'antd';
import { useParams } from 'react-router-dom';
import { SingleValueType, DefaultOptionType } from 'rc-cascader/lib/Cascader';

import ApiDocDetail from '@polyApi/components/api-doc-detail';
import { RawApiDocDetail } from '@polyApi/effects/api/raw';
import { getChildrenOfCurrentSelectOption } from '@polyApi/utils/request-node';
import { useGetOptions } from './hook';

type Props = {
  initRawApiPath: string;
  setApiPath: (apiPath: string) => void;
  label?: string;
  error?: string;
  className?: string;
  useInPoly?: boolean;
  simpleMode?: boolean;
  apiDocDetail?: RawApiDocDetail;
}

function ApiSelector({
  apiDocDetail, setApiPath, initRawApiPath, simpleMode, className, label = '全部API:', useInPoly = false, error,
}: Props): JSX.Element {
  const { appID } = useParams<{ appID: string }>();
  const [apiNamespacePath, setApiNamespacePath] = useState('');
  const options = useGetOptions(appID, apiNamespacePath, useInPoly);

  function onChange(value: SingleValueType | SingleValueType[], selectedOptions: DefaultOptionType[]): void {
    const leafOption = clone(selectedOptions).pop();
    if (leafOption?.isLeaf) {
      setApiPath(leafOption.path);
      return;
    }
  }

  function loadData(selectedOptions: DefaultOptionType[]): void {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    setApiNamespacePath(targetOption.path);
    targetOption.children = getChildrenOfCurrentSelectOption(targetOption.childrenData);
  }

  if (simpleMode) {
    return (
      <Cascader
        changeOnSelect
        className={cs('cascader', className)}
        defaultValue={[initRawApiPath]}
        // displayRender={(label)=> label[label.length - 1]}
        options={options}
        loadData={loadData}
        onChange={onChange}
      />
    );
  }

  return (
    <div className={cs('px-20 py-12 flex', className)}>
      <div className="poly-api-selector">
        <label className="mr-8">{label}</label>
        <Cascader
          changeOnSelect
          className="cascader"
          defaultValue={[initRawApiPath]}
          options={options}
          loadData={loadData}
          onChange={onChange}
          placeholder="请选择API"
        />
        {error && <span className="text-red-500 pt-8">{error}</span>}
      </div>
      {apiDocDetail && (
        <ApiDocDetail
          className="flex-1"
          method={apiDocDetail.doc.method}
          url={apiDocDetail.doc.url}
          identifier={apiDocDetail?.apiPath?.split('/')?.pop()?.split('.')?.shift()}
        />
      )}
    </div>
  );
}

export default ApiSelector;
