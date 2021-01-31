const createLoginUrl = (redirectTo?: string): string =>
  redirectTo
    ? `/api/login?redirectTo=${encodeURIComponent(redirectTo)}`
    : `/api/login`;

export default createLoginUrl;
