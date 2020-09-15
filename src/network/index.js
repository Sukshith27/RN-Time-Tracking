import {ApolloClient, InMemoryCache} from '@apollo/client';
import {AUTH_TOKEN} from '../utils/constants';

// Create the client as outlined in the setup guide
export const client = new ApolloClient({
  uri: 'https://test-323.herokuapp.com/v1/graphql',
  headers: {
    Authorization: AUTH_TOKEN,
  },
  cache: new InMemoryCache(),
});
