import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink, Image } from '@openedx/paragon';

import messages from './messages';

const SmallLayout = () => {
  const { formatMessage } = useIntl();

  return (
    <span className="bg-primary-400 w-100">
      <div className="col-md-12 small-screen-top-stripe" />
      <div>
        <Hyperlink destination={getConfig().MARKETING_SITE_BASE_URL}>
          <Image className="logo-small" alt={getConfig().SITE_NAME} src={getConfig().LOGO_WHITE_URL} />
          <span className="auth-brand-name d-none" aria-hidden="true">{getConfig().SITE_NAME}</span>
        </Hyperlink>
        <div className="d-flex align-items-center m-3.5">
          <div className="small-blue-line mr-n2.5" />
          <div className="auth-brand-copy">
            <h1 className="text-white auth-heading-text">
              <span className="auth-heading-highlight">{formatMessage(messages['authn.brand.learn'])}</span>{' '}
              <span>{formatMessage(messages['authn.brand.practice'])}</span>{' '}
              <span>{formatMessage(messages['authn.brand.connect'])}</span>
            </h1>
            <p className="auth-tagline d-none">{formatMessage(messages['authn.brand.tagline'])}</p>
          </div>
        </div>
      </div>
    </span>
  );
};

export default SmallLayout;
