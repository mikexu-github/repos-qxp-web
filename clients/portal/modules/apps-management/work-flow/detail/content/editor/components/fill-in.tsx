import React, { useRef, useState } from 'react';
import cs from 'classnames';

import { updateStore, Data } from '../store';
import NodeHeader from './_common/node-header';
import NodeRemover from './_common/node-remover';

interface Props {
  data: Data;
  id: string;
}

export default function FillInNodeComponent({ data, id }: Props) {
  const lastTime = useRef(+new Date());
  const [showRemover, setShowRemover] = useState(false);

  const { nodeData, businessData: { basicConfig } } = data;

  function onMouseUp() {
    if (+new Date - lastTime.current < 200) {
      updateStore(null, () => ({ asideDrawerType: 'fillInForm' }));
    }
  }

  function getRule() {
    return `常规填写; ${basicConfig.multiplePersonWay === 'or' ? '任填' : '全填'}`;
  }

  function getPerson() {
    return [
      ...basicConfig.approvePersons.users,
      ...basicConfig.approvePersons.departments,
    ].map((v) => v.ownerName || v.departmentName).join('; ');
  }

  function onMouseEnter() {
    setShowRemover(true);
  }

  function onMouseLeave() {
    setShowRemover(false);
  }

  const hasFillInRule = !!basicConfig.multiplePersonWay;
  const hasFillInPerson = !!basicConfig.approvePersons.departments.length ||
    !!basicConfig.approvePersons.users.length;

  return (
    <div
      className={cs(
        'shadow-title rounded-tl-8 rounded-tr-8 rounded-br-2',
        'rounded-bl-8 bg-white flex flex-col',
        `w-${nodeData.width}`, `h-${nodeData.height}`
      )}
      onMouseDown={() => lastTime.current = +new Date()}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <NodeHeader
          title={nodeData.name}
          type="fillIn"
          className="bg-teal-500"
          iconName="edit"
          iconClassName="text-white"
          titleClassName="text-white bg-teal-500"
        />
        <NodeRemover visible={showRemover} id={id} type="light" />
      </div>
      <footer className="p-8 flex items-center flex-1">
        {(hasFillInRule || hasFillInPerson) && (
          <div
            className="bg-gray-100 py-4 px-8 rounded-4 flex flex-col justify-center"
          >
            {hasFillInRule && (
              <div className="text-caption-no-color text-gray-400">
                规则: <span className="text-gray-600">{getRule()}</span>
              </div>
            )}
            {hasFillInPerson && (
              <div className="text-caption-no-color text-gray-400">
                填写人: <span className="text-gray-600">{getPerson()}</span>
              </div>
            )}
          </div>
        )}
        {!hasFillInPerson && !hasFillInRule && (
          <span className="text-caption text-gray-400 px-4">设置填写规则</span>
        )}
      </footer>
    </div>
  );
}
