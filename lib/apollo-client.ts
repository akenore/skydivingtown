import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'http://localhost:8888/graphql',
  // uri: 'https://restapi.skydivingtown.com/graphql',
});

const csrfLink = setContext((_, { headers }) => {
  if (typeof window !== 'undefined') {
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfTokenElement ? csrfTokenElement.getAttribute('content') : '';
    return {
      headers: {
        ...headers,
        'X-CSRFToken': csrfToken,
      }
    };
  }
  return { headers };
});

const client = new ApolloClient({
  link: ApolloLink.from([csrfLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;