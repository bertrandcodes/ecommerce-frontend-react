import React from 'react';
import './App.css';
import { ReactComponent as Cart } from './assets/cart.svg';
import { ReactComponent as Unfilled } from './assets/unfilled-heart.svg';
import { ReactComponent as Filled } from './assets/filled-heart.svg';
import productData from './catalog.json';
import ProductDetails from './Modal/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      data: productData.products,
      itemData: null,
      cartQuan: 0,
      favorites: new Set
    }
  }

  getColor = (tag) => {
    if (tag === "Editor's Picks") {
      return "blue";
    } else if (tag === "Top Ten") {
      return "purple";
    } else if (tag === "Daily Deals") {
      return "pink";
    } else if (tag === "Olmost Out") {
      return "red";
    }
  };

  handleModal = (itemId) => {
    const target = this.state.data.filter((item) => {
      return item.id === itemId
    })
    this.setState({
      itemData: target[0],
      show: true
    })
  }

  hideModal = e => {
    this.setState({
      show: false
    });
  };

  addCart = (quan) => {
    this.setState({
      cartQuan: this.state.cartQuan + quan
    })
  }

  handleFavorites = (id) => {
    if (this.state.favorites.has(id)) {
      let removed = this.state.favorites
      removed.delete(id)
      this.setState({
        favorites: removed
      })
    } else {
      const added = this.state.favorites.add(id)
      this.setState({
        favorites: added
      })
    }
    // const index = this.state.data.findIndex(ele => ele.id === id)
    // if (this.state.data[id].favorite) {
    //   let newData = [...this.state.data]
    //   newData[index] = { ...newData[index], favorite: false }
    //   this.setState({
    //     data: newData
    //   })
    // } else {
    //   let newData = [...this.state.data]
    //   newData[index] = { ...newData[index], favorite: true }
    //   this.setState({
    //     data: newData
    //   })
    // }
  }

  render() {
    let productMarkup = this.state.data.map(product =>
      <div key={product.id} className="collection-item">
        <div onClick={() => {
          this.handleModal(product.id);
        }} className="collection-image-container">
          <img className="collection-image" src={product.previewImage} alt={product.title}>
          </img>
          {/* {product.favorite ? <Filled /> : <Unfilled />} */}
          {this.state.favorites.has(product.id) ? <Filled /> : <Unfilled />}
          {product.tags[0] ? <div className={`collection-tag ${this.getColor(product.tags[0])}`}>{product.tags[0].toUpperCase()}</div>
            : null}
        </div>
        <div className="collection-brand">{product.brand.toUpperCase()}</div>
        <div onClick={() => {
          this.handleModal(product.id);
        }} className="collection-title">{product.title}</div>
        <div className="collection-prices">
          <div className="collection-sale">${product.currentPrice.toFixed(2)}</div>
          <div className="collection-original">${product.retailValue.toFixed(2)}</div>
        </div>
        <div className="collection-deal">({Math.round((product.retailValue - product.currentPrice) / product.retailValue * 100)}% off)</div>
      </div>)
    return (
      <div className="app-wrap">
        <ProductDetails show={this.state.show} onClose={this.hideModal} data={this.state.itemData} getColor={this.getColor} addCart={this.addCart} favorite={this.handleFavorites} favorites={this.state.favorites}/>
        <div className="app-header">
          <div className="logo" />
          <div className="cart-container">
            <Cart />
            {this.state.cartQuan > 0 ? <div className="cart-total"><div className="cart-num">{this.state.cartQuan}</div></div> : null}
          </div>
        </div>
        <div className="collection-list">
          {productMarkup}
        </div>
      </div>
    );
  }
}

export default App;
