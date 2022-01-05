import React from 'react';
import { observer } from 'mobx-react';

import { NodeRenderProps } from '@c/headless-tree/types';

export default observer(<T, >({ node }: NodeRenderProps<T>) => {
  return (
    <div
      className="transition-all py-8 w-full flex items-center justify-between"
    >
      <div className="flex items-center w-full">
        <div className="ml-2 truncate w-full px-5">
          {node.name}
        </div>
      </div>
    </div>
  );
});
