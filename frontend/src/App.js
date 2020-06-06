import React from "react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';

import './global.css';

import Routes from "./routes";

// optional configuration
const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE
}

function App() {

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Routes />
    </AlertProvider>
  );
}

export default App;
