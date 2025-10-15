import { useContext, useEffect } from 'react';

import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';

const UserbackWidget = () => {
  const { authenticatedUser } = useContext(AppContext);

  useEffect(() => {
    if (window.Userback) {
      return; // Prevent multiple injections
    }

    const userbackAccessToken = getConfig().USERBACK_ACCESS_TOKEN;

    if (!userbackAccessToken) {
      // eslint-disable-next-line no-console -- intentional: warn when access token missing
      console.warn('[DEBUG]: ⚠️ Userback access token not found in config.');
      return;
    }

    window.Userback = window.Userback || {};
    window.Userback.access_token = userbackAccessToken;

    if (authenticatedUser) {
      window.Userback.user_data = {
        id: authenticatedUser.userId,
        info: {
          name: authenticatedUser.username,
          email: authenticatedUser.email,
        },
      };
    }

    const script = document.createElement('script');
    script.src = 'https://static.userback.io/widget/v1.js';
    script.async = true;
    document.head.appendChild(script);
  }, [authenticatedUser]);

  return null;
};

export default UserbackWidget;
