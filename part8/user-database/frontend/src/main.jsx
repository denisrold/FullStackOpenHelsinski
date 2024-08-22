import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ALL_PERSONS_ONE } from '../queries.js'
import { ApolloClient, ApolloProvider, createHttpLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
 })
 
 const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
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
