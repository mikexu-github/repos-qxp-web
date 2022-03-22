import React, { useRef, useState, useContext } from 'react';
import { observer } from 'mobx-react';

import { Button } from '@one-for-all/headless-ui';
import Icon from '@c/icon';

import FilterForm from './filter-form';
import { StoreContext } from './context';
import { conditionBuilder } from './utils';

function PageDataFilter(): JSX.Element | null {
  const [showMoreFilter, setShowMoreFilter] = useState(false);
  const store = useContext(StoreContext);
  const filterKeys = Object.keys(store.filters);
  const filterDom = useRef<any>();
  const search = (): void => {
    if (!store.allowRequestData) {
      return;
    }

    const values = filterDom.current.getValues();
    const condition = conditionBuilder(store, values);
    store.filterData = values;
    store.setParams({ condition, page: 1 });
  };

  const reset = (): void => {
    const resObj: Record<string, ''> = {};
    filterKeys.map((id) => {
      resObj[id] = '';
    });
    filterDom.current.reset(resObj);
  };

  const noFilter = filterKeys.length === 0;

  if (noFilter) {
    return null;
  }

  return (
    <div className='form-app-data-table-container form-app-data-table-filter'>
      <FilterForm search={search} ref={filterDom} showMoreFilter={showMoreFilter} />
      <div>
        {filterKeys.length > 3 ? (
          <span
            onClick={() => setShowMoreFilter(!showMoreFilter)}
            className='form-app-data-table-filter-more'
          >
            {showMoreFilter ? '收起' : '展开'}全部
            <Icon
              size={16}
              className='ml-4 app-icon-color-inherit'
              name={showMoreFilter ? 'expand_less' : 'expand_more'}
            />
          </span>
        ) : null}
        <Button onClick={search} className='mr-16' modifier='primary'>
          查询
        </Button>
        <Button onClick={reset}>重置</Button>
      </div>
    </div>
  );
}

export default observer(PageDataFilter);
