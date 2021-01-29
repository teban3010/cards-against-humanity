import 'tailwindcss/tailwind.css';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import React from 'react';

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({ uri: '/api/graphql' }),
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <ApolloProvider client={client}>
      <DefaultSeo
        title="CAH"
        openGraph={{
          url: 'CAH',
          title: 'CAH',
          description: 'CAH',
          site_name: 'CAH',
          type: 'website',
        }}
      />
      <Component {...pageProps} />
    </ApolloProvider>
  </>
);

export default MyApp;
