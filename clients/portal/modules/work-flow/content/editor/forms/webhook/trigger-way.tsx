import React from 'react';
import type { UseFormSetValue } from 'react-hook-form';

import Checkbox from '@c/checkbox';

interface Props {
  value: 'request' | 'send';
  onChange: (v: 'request' | 'send') => void;
  setFormValue: UseFormSetValue<any>;
}

export default function TriggerWay({ value, onChange, setFormValue }: Props): JSX.Element {
  return (
    <div className="mb-8">
      <p className="mt-16 mb-8 text-caption-no-color-weight text-gray-600">触发方式</p>
      <div className="flex items-center justify-between">
        <Checkbox
          rounded
          label="获取数据"
          checked={value === 'request'}
          value="request"
          onChange={() => {
            onChange('request');
            setFormValue('inputs', []);
          }}
        />
        <Checkbox
          rounded
          label="推送数据"
          checked={value === 'send'}
          value="send"
          onChange={() => {
            onChange('send');
            setFormValue('inputs', []);
          }}
        />
      </div>
    </div>
  );
}