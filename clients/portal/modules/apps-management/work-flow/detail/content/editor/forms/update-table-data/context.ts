import React from 'react';
import { TableDataUpdateData } from '@flowEditor/type';

type ContextType = {
  data: Partial<TableDataUpdateData>,
  setData: (val: Partial<TableDataUpdateData>) => void;
}

export default React.createContext<ContextType>({
  data: {},
  setData(val: any) {
    Object.assign(this.data, { ...val });
  },
});
