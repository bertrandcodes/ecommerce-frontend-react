import React from 'react';
import './App.css';
import { ReactComponent as Cart } from './assets/cart.svg';
import { ReactComponent as Unfilled } from './assets/unfilled-heart.svg';

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
        <div className="collection-list">

          <div className="collection-item">
            <div className="collection-image-container">
              <img className="collection-image" src="https://s3-us-west-2.amazonaws.com/causebox/uploads/Ever-Eco-On-The-Go-Straw-Kit-Stainless-Steel-01.jpg">
              </img>
              <Unfilled />
              <div className="collection-tag">EDITOR'S PICKS</div>
            </div>
            <div className="collection-brand">SOFTEN</div>
            <div className="collection-title">Heather Bath Towel Set</div>
            <div className="collection-prices">
              <div className="collection-sale">$3.50</div>
              <div className="collection-original">$5.25</div>
            </div>
            <div className="collection-deal">(25% off)</div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
