import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { ChakraProvider, Container } from '@chakra-ui/react';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import Layout from 'components/Layout';
import React from 'react';
import SocketProvider from 'context/SocketContext';
import { UserProvider } from 'context/UserContext';
import fetch from 'isomorphic-unfetch';

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/api/graphql',
    fetch: fetch,
  }),
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
      <UserProvider>
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
        <ChakraProvider>
          <SocketProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SocketProvider>
        </ChakraProvider>
      </UserProvider>
    </ApolloProvider>
  </>
);

export default MyApp;
