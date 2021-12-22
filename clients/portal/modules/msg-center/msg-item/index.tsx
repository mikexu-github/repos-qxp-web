import React, { useEffect, useRef, useState } from 'react';
import cs from 'classnames';
import { observer } from 'mobx-react';
import { MsgReadStatus, MsgType } from '@portal/modules/system-mgmt/constants';
import msgCenter from '@portal/stores/msg-center';
import dayjs from 'dayjs';

import toast from '@lib/toast';
import { useQueryClient, useMutation } from 'react-query';
import { getMsgById } from '@portal/modules/msg-center/api';
import { getQuery } from '@portal/utils';

import { useRouting } from '../hooks';

import styles from './index.module.scss';

interface Props {
  className?: string;
  hideType?: boolean;
  readonly?: boolean;
  onClick?: (...args: any[]) => void;
}

const MsgItem = ({
  id,
  title,
  createdAt,
  types,
  readStatus = 1,
  className,
  hideType,
  onClick,
  readonly,
}: Qxp.MsgItem & Props): JSX.Element => {
  const [read, setRead] = useState(readStatus);
  const refItem = useRef<HTMLDivElement>(null);
  const queryPage = useRouting();
  const queryClient = useQueryClient();
  const { curMsgId } = msgCenter;

  useEffect(() => {
    const msgId = getQuery('id') || msgCenter.curMsgId || '';
    if (msgId === id) {
      msgCenter.setCurMsgId(msgId);
      readMsg.mutate({
        queryKey: ['', {
          id,
          read: true,
        }],
        meta: undefined,
      });
    }
  }, []);

  const checkRow = (): void => {
    const activeCls = 'msg-item-active';
    if (refItem.current && refItem.current.parentNode) {
      const trElem = refItem.current.parentNode.parentNode as HTMLElement;
      if (curMsgId === id) {
        if (!trElem.classList.contains(activeCls)) {
          trElem.classList.add(activeCls);
        }
      } else {
        trElem.classList.remove(activeCls);
      }
    }
  };

  const readMsg = useMutation(getMsgById, {
    onMutate: () => {
      msgCenter.setLoadingDetail(true);
    },
    onSuccess: (data: any) => {
      msgCenter.setLoadingDetail(false);
      msgCenter.setDetail(data);
      // change msg read_status
      if (readStatus === MsgReadStatus.unread) {
        setRead(MsgReadStatus.read);
        // todo
        queryClient.invalidateQueries('count-unread-msg');
      }
    },
    onError: (err: Error) => {
      msgCenter.setLoadingDetail(false);
      toast.error(err.message);
    },
  });

  const handleClick = (): void => {
    if (readonly) {
      return;
    }
    if (id !== msgCenter.curMsgId) {
      msgCenter.setCurMsgId(id);
      queryPage('', { id });

      readMsg.mutate({
        queryKey: ['', {
          id,
          read: true,
        }],
        meta: undefined,
      });
    }

    checkRow();
    onClick && onClick();
  };

  useEffect(() => {
    checkRow();
  }, [curMsgId]);

  return (
    <div ref={refItem} className={cs(styles.msgItem, {
      [styles.active]: curMsgId === id,
    }, className)} onClick={handleClick}>
      <div className={styles.msgItemInner}>
        <span className='inline-flex items-center'>
          <span className={cs(styles.statusIcon, {
            [styles.statusUnread]: read === MsgReadStatus.unread,
            [styles.statusRead]: read === MsgReadStatus.read,
          })} />
          <span className={styles.txt} title={title}>{title}</span>
        </span>
        {!hideType && (
          <span className={cs(styles.type, {
            [styles.system]: types === MsgType.system,
            [styles.alert]: types === MsgType.notify,
          })}>
            {types === MsgType.system ? '系统消息' : '通知公告'}
          </span>
        )}
      </div>
      <div className={styles.msg_itm_time}>
        <span className={styles.time}>
          {dayjs(parseInt(String(createdAt * 1000))).format('YYYY-MM-DD HH:mm')}
        </span>
      </div>
    </div>

  );
};

export default observer(MsgItem);
