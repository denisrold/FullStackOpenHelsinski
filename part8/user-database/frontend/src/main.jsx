import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ALL_PERSONS_ONE } from '../queries.js'
import { ApolloClient, ApolloProvider, createHttpLink, HttpLink,split, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
 })
 
 const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/', 
  options: {
    reconnect: true,
  },
}));

 const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
 )
 

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

const query = ALL_PERSONS_ONE;

client.query({ query })
  .then((response) => {
    console.log("client connect OK")
  })

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
