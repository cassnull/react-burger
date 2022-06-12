import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './components/app/app'
import reportWebVitals from './reportWebVitals'
import { rootReducer } from './services/reducers/index'
import { compose, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import thunk from 'redux-thunk'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

const win = window as any
const composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(rootReducer, enhancer)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
