import React from 'react';
import './App.css';
import { ReactComponent as Cart } from './assets/cart.svg';
import { ReactComponent as Unfilled } from './assets/unfilled-heart.svg';
import productData from './catalog.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }


  render() {
    let productMarkup = productData.products.map(product =>
      <div key={product.id} className="collection-item">
        <div className="collection-image-container">
          <img className="collection-image" src={product.previewImage} alt={product.title}>
          </img>
          <Unfilled />
          <div className="collection-tag">EDITOR'S PICKS</div>
        </div>
        <div className="collection-brand">{product.brand.toUpperCase()}</div>
        <div className="collection-title">{product.title}</div>
        <div className="collection-prices">
          <div className="collection-sale">${product.currentPrice.toFixed(2)}</div>
          <div className="collection-original">${product.retailValue.toFixed(2)}</div>
        </div>
        <div className="collection-deal">({Math.round((product.retailValue - product.currentPrice) / product.retailValue * 100)}% off)</div>
      </div>)
    return (
      <div className="app-wrap">
        <div className="app-header">
          <div className="logo" />
          <Cart />
        </div>
        <div className="collection-list">
          {productMarkup}
        </div>
      </div>
    );
  }
}

export default App;
