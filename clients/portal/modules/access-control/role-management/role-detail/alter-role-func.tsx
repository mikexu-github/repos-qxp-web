import React, { useState, useRef, ChangeEvent } from 'react';

import Card from '@c/card';
import Checkbox from '@c/checkbox';
import { searchByKey, deepClone } from '@lib/utils';

import { IRoleFunc, IRoleFuncItem } from '../api';

export interface IAlterRoleFunc {
  funcs: IRoleFunc;
  tag: string;
  lastSaveTime?: number;
  id: string | number;
}

export default function AlterRoleFunc({ funcs: functions }: IAlterRoleFunc): JSX.Element {
  const [funcs, setFuncs] = useState<IRoleFunc>(deepClone(functions));
  // const [addSets, setAddSets] = useState<string[]>([]);
  // const [deleteSets, setDeleteSets] = useState<string[]>([]);
  const originTags = useRef<string[]>([]);

  const getFuncIds = (func: IRoleFunc | IRoleFuncItem): string[] => {
    const tags: string[] = [];

    Object.keys(func ?? {}).forEach((_key) => {
      const key = _key as keyof (IRoleFunc | IRoleFuncItem);
      if (key === 'id' && func.has) {
        tags.push(func.id as string);
      } else if (key !== 'id') {
        const funcValue = func[key];
        if (typeof funcValue === 'object') {
          tags.push(...getFuncIds(funcValue));
        }
      }
    });

    return tags;
  };
  if (!originTags.current.length) {
    originTags.current = getFuncIds(functions);
  }

  // useEffect(() => {
  // const allSets = getFuncIds(funcs);
  // const adds = allSets.filter((item) => !originTags.current.includes(item));
  // const deletes = originTags.current.filter((item) => !allSets.includes(item));
  // setAddSets(adds);
  // setDeleteSets(deletes);
  // }, [funcs]);

  function getCount(funcs: IRoleFunc): [number, number] {
    let ckeckcount = 0;
    let total = 0;
    Object.values(funcs).forEach((func) => {
      Object.values(func.child).forEach((funcChild) => {
        total += 1;
        if (funcChild.has) ckeckcount += 1;
      });
    });
    return [ckeckcount, total];
  }

  const [checkcount, total] = getCount(funcs);

  const updateFuncs = (funcTag: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFuncs((s: IRoleFunc) => {
      const newS = { ...s };
      const data = searchByKey<string, IRoleFunc, IRoleFuncItem>('funcTag', funcTag, newS);
      if (data) {
        data.has = e.target.checked;
        return newS;
      }
      return s;
    });
  };

  // const selectAll = (func: IRoleFuncItem) => () => {
  //   const ev = new Event('click');
  //   const needSelect = !isAllChildSelected(func);
  //   needSelect && updateFuncs(func.funcTag)(ev, needSelect);
  //   Object.values(func.child).forEach((i) => {
  //     updateFuncs(i.funcTag)(ev, needSelect);
  //     if (i.child) {
  //       selectAll(i);
  //     }
  //   });
  // };

  // const isAllChildSelected = (func: IRoleFuncItem) => {
  //   return Object.values(func.child).every((i) => i.has);
  // };

  const renderFuncCard = (funcs: IRoleFunc): JSX.Element => {
    return (
      <>
        {Object.values(funcs).map((func) => {
          if (!func.child) {
            return (
              <Checkbox
                disabled
                checked={func.has}
                className="text-caption border-1 border-gray-200 py-8 pl-16 func-child rounded-8"
                key={func.id}
                value={func.funcTag}
                onChange={updateFuncs(func.funcTag)}
                label={func.name}
              />
            );
          }

          return (
            <Card
              key={func.id}
              headerClassName="px-16 bg-gray-100 rounded-8"
              title={
                (<Checkbox
                  disabled
                  checked={func.has}
                  value={func.funcTag}
                  onChange={updateFuncs(func.funcTag)}
                  label={func.name}
                />
                )
              }
              itemTitleClassName="role-header"
              // action={
              //   <span onClick={selectAll(func)}>
              //     {func.child && !isSuper
              //       ? `${isAllChildSelected(func) ? '反选' : '全选'}${
              //           Object.keys(func.child).length
              //         }项`
              //       : ''}
              //   </span>
              // }
              headerActionClassName="no-underline text-gray-400
              text-12 leading-4 cursor-pointer"
              content={<>{renderFuncCard(func.child)}</>}
              contentClassName="pt-12 pb-20 px-16 flex justify-start whitespace-nowrap flex-wrap gap-16"
            />
          );
        })}
      </>
    );
  };

  // const getSaveTime = (time: number) => {
  //   const date = new Date(time * 1000);
  //   const month = `${date.getMonth() + 1}`.padStart(2, '0');
  //   const d = `${date.getDate()}`.padStart(2, '0');
  //   const hour = `${date.getHours()}`.padStart(2, '0');
  //   const minutes = `${date.getMinutes()}`.padStart(2, '0');
  //   return `${date.getFullYear()}-${month}-${d} ${hour}:${minutes}`;
  // };

  // const saveRoleFunctions = () => {
  //   let params = [];
  //   if (deleteSets.length) {
  //     params = ['setRoleFunctions', id, addSets, deleteSets];
  //   } else {
  //     params = ['setRoleFunctions', id, addSets];
  //   }
  //   setRoleFunctions({
  //     queryKey: params,
  //   }).then(({ code }) => {
  //     if (code == 0) {
  //       setAddSets([]);
  //       setDeleteSets([]);
  //       toast.success('保存成功');
  //     }
  //   });
  // };

  return (
    <div className="overflow-scroll h-full">
      <header className="mx-4 flex flex-row items-center justify-between py-3">
        <div className='text-12 text-gray-400'>已选 {checkcount} 项，共 {total} 项</div>
        {/* {!isSuper && (
          <div className="flex flex-row items-center justify-between">
            {!!lastSaveTime && (
              <span className="text-12 text-gray-400 mr-8">
                最近保存时间：{getSaveTime(lastSaveTime)}
              </span>
            )}
            <Button
              modifier="primary"
              textClassName="text-white ml-2"
              icon={<img src="/dist/images/save.svg" />}
              onClick={saveRoleFunctions}
            >
              保存
            </Button>
          </div>
        )} */}
      </header>
      {renderFuncCard(funcs)}
    </div>
  );
}
