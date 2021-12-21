import React from 'react';

import NavMsgBar from '@portal/modules/msg-center/nav-msg-bar';
import NavTaskBar from '@c/task-lists';
import UserAvatarMenu from '@c/user-avatar-menu';

export default function HeaderMenu(): JSX.Element {
  return (
    <div className="flex-2 flex justify-end items-center">
      <NavTaskBar className="mr-16" type='home'/>
      <NavMsgBar className="mr-16" type='home'/>
      {/* <Button className="mr-32">
          进入应用管理
      </Button>
      <div className="nav-icon">
        <Icon
          className='icon-hover'
          name="notifications"
          size={20}
        />
      </div>
      <div className="nav-icon">
        <Icon
          className='icon-hover'
          name="assignment"
          size={20}
        />
      </div>
      <div className="nav-icon">
        <Icon
          className='icon-hover'
          name="help_outline"
          size={20}
        />
      </div> */}
      <UserAvatarMenu className='text-white hover:text-blue-300' />
    </div>
  );
}
