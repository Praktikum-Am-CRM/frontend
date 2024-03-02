import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import './index.css';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { ThemeProvider, configure } from '@gravity-ui/uikit';
import { Provider } from 'react-redux';
import { store } from './store';

configure({
  lang: 'ru',
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="light">
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
