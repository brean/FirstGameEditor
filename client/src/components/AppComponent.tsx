import React from 'react';

import { Router, Route } from "react-router-dom";
import { GameSelection } from './GameSelection';
import { GameEditor } from './GameEditor';
import { useSharedState } from '../store';
import { History } from "history";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';


function AppComponent(props: {history: History<unknown>}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [state] = useSharedState();

  if (state.autoDetectDarkMode) {
    // setDarkMode(prefersDarkMode);
    state.prefersDarkMode = prefersDarkMode;
  }

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: state.prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [state.prefersDarkMode],
  );

  return (
  // TODO: create game by type inside of GameSelection using rest
  // TODO: use /editor/id
    <Router history={props.history}>
      <Route exact path="/" render={() => (
        <GameSelection theme={theme} />
      )} />
      <Route path="/editor/:gameId" render={({ match }) => (
        <GameEditor theme={theme} />
      )} />
    </Router>
  )
}

export { AppComponent }