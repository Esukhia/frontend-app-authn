import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink, Image } from '@openedx/paragon';

import messages from './messages';

const LargeLayout = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="w-50 d-flex">
      <div className="col-md-9 bg-primary-400">
        <Hyperlink destination={getConfig().MARKETING_SITE_BASE_URL}>
          <Image className="logo" alt={getConfig().SITE_NAME} src={getConfig().LOGO_WHITE_URL} />
          <span className="auth-brand-name d-none" aria-hidden="true">{getConfig().SITE_NAME}</span>
        </Hyperlink>
        <div className="min-vh-100 d-flex align-items-center">
          <div className="large-blue-line mr-n4.5" />
          <div className="auth-brand-copy">
            <h1 className="display-2 text-white mw-xs auth-heading-text">
              <span className="auth-heading-highlight">{formatMessage(messages['authn.brand.learn'])}</span>{' '}
              <span>{formatMessage(messages['authn.brand.practice'])}</span>{' '}
              <span>{formatMessage(messages['authn.brand.connect'])}</span>
            </h1>
            <p className="auth-tagline d-none">{formatMessage(messages['authn.brand.tagline'])}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 bg-white p-0">
        <svg className="ml-n1 w-100 h-100 large-screen-svg-primary" preserveAspectRatio="xMaxYMin meet">
          <g transform="skewX(171.6)">
            <rect x="0" y="0" height="100%" width="100%" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default LargeLayout;
