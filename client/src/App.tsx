import React from 'react';

import { SharedStateProvider } from './store';
import { AppComponent } from './components/AppComponent';

import { createHashHistory, History } from "history";

import './App.css';

const history: History<unknown> = createHashHistory();

function App() {
  return (
    <SharedStateProvider>
      <AppComponent history={history} />
    </SharedStateProvider>
  )
}

export default App;
