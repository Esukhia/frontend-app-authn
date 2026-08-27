import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const resolveProviderIconUrl = iconImage => (
  iconImage ? new URL(iconImage, getConfig().LMS_BASE_URL).href : iconImage
);

// eslint-disable-next-line import/prefer-default-export
export async function getThirdPartyAuthContext(urlParams) {
  const requestConfig = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: urlParams,
    isPublic: true,
  };

  const { data } = await getAuthenticatedHttpClient()
    .get(
      `${getConfig().LMS_BASE_URL}/api/mfe_context`,
      requestConfig,
    )
    .catch((e) => {
      throw (e);
    });
  const thirdPartyAuthContext = data.contextData || {};
  const resolveProviderIcons = providers => (providers || []).map(provider => ({
    ...provider,
    iconImage: resolveProviderIconUrl(provider.iconImage),
  }));

  return {
    fieldDescriptions: data.registrationFields || {},
    optionalFields: data.optionalFields || {},
    thirdPartyAuthContext: {
      ...thirdPartyAuthContext,
      providers: resolveProviderIcons(thirdPartyAuthContext.providers),
      secondaryProviders: resolveProviderIcons(thirdPartyAuthContext.secondaryProviders),
    },
  };
}
