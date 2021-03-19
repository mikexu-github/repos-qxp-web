import React from 'react';
import { twCascade } from '@mariusmarais/tailwind-cascade';

import { identity } from '@assets/lib/f';

interface ICore {
  current: number;
  maxPage: number;
  onChange?: (current: number) => void;
}

export const Core = ({ current, onChange = identity, maxPage }: ICore) => {
  const onPrev = () => {
    if (current <= 1) {
      return;
    }
    onChange(current - 1);
  };

  const onNext = () => {
    if (current >= maxPage) {
      return;
    }
    onChange(current + 1);
  };

  return (
    <div className="flex items-center mr-1">
      <div
        onClick={onPrev}
        className={twCascade(
            'w-1-dot-4 h-1-dot-4 text-center text-94A3B8 leading-1-dot-4',
            'flex justify-center items-center',
          current <= 1 ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          { /* eslint-disable-next-line max-len */ }
          <path d="M5.27301 0.94L4.33301 0L0.333008 4L4.33301 8L5.27301 7.06L2.21967 4L5.27301 0.94Z" fill="#94A3B8" />
        </svg>

      </div>
      <div className="flex flex-row items-center flex-nowrap justify-between">
        {(current + 1 > maxPage && current - 2 > 0) && (
          <div
            className={twCascade(
                'h-1-dot-4 px-2 rounded-l-dot-4 rounded-br-dot-4 cursor-pointer',
                'rounded-tr-dot-1 font-normal flex justify-center items-center fs12',
            )}
            onClick={() => onChange(current - 2)}
          >
            {current - 2}
          </div>
        )}
        {(current + 1 >= maxPage && current - 1 > 0) && (
          <div
            className={twCascade(
                'h-1-dot-4 px-2 rounded-l-dot-4 rounded-br-dot-4 cursor-pointer',
                'rounded-tr-dot-1 font-normal flex justify-center items-center fs12',
            )}
            onClick={() => onChange(current - 1)}
          >
            {current - 1}
          </div>
        )}
        <div
          className={twCascade(
              'h-1-dot-4 px-2 bg-F0F6FF text-375FF3 rounded-l-dot-4 rounded-br-dot-4',
              'rounded-tr-dot-1 font-normal flex justify-center items-center fs12',
          )}
        >
          {current}
        </div>
        {(current + 1 < maxPage) && (
          <div
            className={twCascade(
                'h-1-dot-4 px-2 rounded-l-dot-4 rounded-br-dot-4 cursor-pointer',
                'rounded-tr-dot-1 font-normal flex justify-center items-center fs12',
            )}
            onClick={() => onChange(current + 1)}
          >
            {current + 1}
          </div>
        )}
        {
          (maxPage - current > 2) && (
            <div
              className={twCascade(
                  'h-1-dot-4 px-2 rounded-l-dot-4 rounded-br-dot-4',
                  'rounded-tr-dot-1 font-normal flex justify-center items-center fs12',
              )}
            >
              ...
            </div>
          )
        }
        {
          (maxPage > current) && (
            <div
              className={twCascade(
                  'h-1-dot-4 px-2 rounded-l-dot-4 rounded-br-dot-4 cursor-pointer',
                  'rounded-tr-dot-1 font-normal flex justify-center items-center fs12',
              )}
              onClick={() => onChange(maxPage)}
            >
              {maxPage}
            </div>
          )
        }
      </div>
      <div
        onClick={onNext}
        className={twCascade(
            'w-1-dot-4 h-1-dot-4 text-center text-94A3B8 leading-1-dot-4',
            'flex justify-center items-center',
          current >= maxPage ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          { /* eslint-disable-next-line max-len */ }
          <path d="M1.66656 0L0.726562 0.94L3.7799 4L0.726562 7.06L1.66656 8L5.66656 4L1.66656 0Z" fill="#94A3B8" />
        </svg>

      </div>
    </div>
  );
};
