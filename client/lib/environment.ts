export const environment = {
  inProduction: process.env.NEXT_PUBLIC_ENVIRONMENT! === 'production',
  gitHubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
  gitHubRedirectUrl: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL!,
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  baseDomain: process.env.BASE_DOMAIN!
};
