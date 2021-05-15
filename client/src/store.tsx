import React, { createContext, useState, useContext } from 'react';
import { WebSocketCon } from './WebSocketCon';

const initialState = {
  autoDetectDarkMode: true,
  prefersDarkMode: false,
  webSocketCon: new WebSocketCon()
};

const useGameEditorState = () => useState(initialState);

const GameEditorContext = createContext<ReturnType<typeof useGameEditorState> | null>(null);

export const useSharedState = () => {
  const value = useContext(GameEditorContext);
  if (value === null) throw new Error('Please add SharedStateProvider');
  return value;
};

export const SharedStateProvider: React.FC = ({ children }) => (
  <GameEditorContext.Provider value={useGameEditorState()}>{children}</GameEditorContext.Provider>
);