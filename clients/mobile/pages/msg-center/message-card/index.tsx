import React, { useEffect } from 'react';
import HomeCard from '@m/pages/dashboard/home-card';
import Badge from '@m/qxp-ui-mobile/badge';
import Divider from '@m/qxp-ui-mobile/divider';
import { useQuery } from 'react-query';
import { getMessageList } from '@portal/modules/msg-center/api';
import msgCenter from '@portal/stores/msg-center';
import { Message } from '../types';
import { formatRelativeTime } from '@m/lib/formatter';
import { HomePageProps } from '@m/pages/dashboard/types';
import { useHistory } from 'react-router-dom';
import { pathPrefix } from '@m/constant';
import { messagesPath } from '@m/constant';
import { store } from '@m/pages/msg-center/messages/store';

function MessageCard(props: HomePageProps): JSX.Element {
  const history = useHistory();
  const { countUnread } = msgCenter;

  const { data, refetch: refetchMessages } = useQuery(
    ['all-messages', { page: 1, limit: 3 }],
    getMessageList,
    { enabled: false },
  );

  useEffect(() => {
    if (props.active) {
      store.all.loadUnreadCount();
      refetchMessages();
    }
  }, [props.active]);

  return (
    <HomeCard title='消息' className='mt-12'>
      {!!data?.mes_list?.length && (<div className='message-card body2 text-secondary'>
        {(data.mes_list as Message[]).map((m) => (
          <div className='message-card-item flex items-center pointer-8'
            key={m.id}
            onClick={() => history.push(`${pathPrefix}/messages/${m.id}`)}
          >
            <Badge dot
              color='var(--blue-600)'
              style={{ width: '.04rem', height: '.04rem' }}
              className='mr-4'/>
            <p className='flex-1 truncate mr-8'>{m.title}</p>
            <p className='caption text-placeholder'>{formatRelativeTime(new Date(m.updated_at * 1000))}</p>
          </div>
        ))}
        <Divider color='#E6ECF9' className='mt-8'/>
        <div className='btn-all-message padding-8 flex items-center justify-center pointer'
          onClick={() => history.push(messagesPath)}>
          <p className='mr-4 body1 text-highlight'>全部消息</p>
          {countUnread > 0 && <Badge dot/>}
        </div>
      </div>)}
      {!data?.mes_list?.length && <div className='padding-16 text-placeholder text-center'>暂无消息</div>}
    </HomeCard>
  );
}

export default MessageCard;
