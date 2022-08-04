import React from 'react';
import cs from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import Icon from '@c/icon';

export default function HeaderLeft(): JSX.Element {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Link to="/" className="flex-2">
      <div className="w-100 group">
        <div className={cs(
          'mr-20 p-6 flex items-center rounded-8 rounded-tr-2',
          'group-hover:bg-enfi-500 group-hover:text-gray-50',
        )}>
          <Icon size={20} name='home_qxp' style={{ fill: 'var(--blue-300)' }} />
          <span className="ml-4">工作台</span>
        </div>
      </div>
    </Link>
  );
}
