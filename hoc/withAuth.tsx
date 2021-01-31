import React from 'react';
import RedirectToLogin from 'components/RedirectToLogin';
import auth0 from 'lib/auth0';
import createLoginUrl from 'lib/url-helper';
import { fetchUser } from 'context/UserContext';

export default (Component) => {
  const withAuth = (props) => {
    if (!props.user) {
      return <RedirectToLogin />;
    }

    return <div>{<Component {...props} user={props.user} />}</div>;
  };

  withAuth.getInitialProps = async (ctx) => {
    if (!ctx.req) {
      const user = await fetchUser();
      return {
        user,
      };
    }

    const session = await auth0.getSession(ctx.req);
    if (!session || !session.user) {
      ctx.res.writeHead(302, {
        Location: createLoginUrl(ctx.req.url),
      });
      ctx.res.end();

      return;
    }

    return { user: session.user };
  };

  return withAuth;
};
