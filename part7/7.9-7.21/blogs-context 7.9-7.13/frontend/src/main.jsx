import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from '../redux/store.js';
import { NotificationProvider  } from "../context/notificationContext.jsx";
import { BlogsProvider  } from "../context/blogsContext.jsx";
import { UserProvider } from '../context/userContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusProvider } from '../context/statusContext.jsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <StatusProvider>
        <BlogsProvider>
          <NotificationProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </NotificationProvider>
        </BlogsProvider>
      </StatusProvider>
    </UserProvider>
  </QueryClientProvider>
)
