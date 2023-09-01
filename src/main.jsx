import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-tooltip/dist/react-tooltip.css'
import { WebsocketProvider } from './components/websocket/WebSocketContext.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WebsocketProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </WebsocketProvider>
  </React.StrictMode>,
)
