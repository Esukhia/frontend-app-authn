import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import { getThirdPartyAuthContext } from '../service';

jest.mock('@edx/frontend-platform/auth', () => ({ getAuthenticatedHttpClient: jest.fn() }));

it('resolves provider icon URLs against the LMS', async () => {
  getAuthenticatedHttpClient.mockReturnValue({
    get: jest.fn().mockResolvedValue({
      data: {
        contextData: {
          providers: [{ iconImage: '/media/google.png' }],
          secondaryProviders: [{ iconImage: 'https://cdn.example.com/icon.png' }],
        },
      },
    }),
  });

  const { thirdPartyAuthContext } = await getThirdPartyAuthContext();

  expect(thirdPartyAuthContext.providers[0].iconImage).toBe(`${getConfig().LMS_BASE_URL}/media/google.png`);
  expect(thirdPartyAuthContext.secondaryProviders[0].iconImage).toBe('https://cdn.example.com/icon.png');
});
