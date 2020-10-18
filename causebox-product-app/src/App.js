import React from 'react';
import './App.css';
import { ReactComponent as Cart } from './cart.svg';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    return (
      <div className="app-wrap">
        <div className="app-header">
          <div className="logo" />
          <Cart />
        </div>
      </div>
    );
  }
}

export default App;
