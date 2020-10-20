import React from 'react';
import productData from '../catalog.json';

import { ReactComponent as Cancel } from '../assets/cancel.svg';
import { ReactComponent as Unfilled } from '../assets/unfilled-heart.svg';
import { ReactComponent as Filled } from '../assets/filled-heart.svg';
import { ReactComponent as Up } from '../assets/up-pointer.svg';
import { ReactComponent as Down } from '../assets/down-pointer.svg';

import { Markup } from 'interweave';


class ProductDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            data: productData.products[0],
            quantity: 1,
            quanShow: false,
            specsShow: true
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data })
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
        this.setState({
            quanShow: false,
            quantity: 1
        })
    };

    toggleQuan = () => {
        this.setState({
            quanShow: !this.state.quanShow
        });
    };

    changeQuan = (quan) => {
        this.setState({
            quantity: quan,
            quanShow: false
        })
    };

    toggleSpecs = () => {
        this.setState({
            specsShow: !this.state.specsShow
        });
    };

    render() {
        const { id, previewImage, tags, brand, title, currentPrice, retailValue, description, specs } = this.state.data
        let detailTags = tags.map((tag, id) =>
            <div key={id} className={`detail-tag ${this.props.getColor(tag)}`}>{tag.toUpperCase()}</div>
        )
        if (!this.props.show) {
            return <div className="modal">
                <div className="detail-image-container">
                    <img className="detail-image" src={previewImage} alt={title}></img>
                    {this.props.favorites.has(id) ? <Filled /> : <Unfilled />}
                    <Cancel
                    />
                </div>
                <div className="detail-body">
                    <div className="detail-tags">
                        {detailTags}
                    </div>
                    <div className="detail-brand">{brand.toUpperCase()}</div>
                    <div className="detail-title">{title}</div>
                    <div className="detail-prices">
                        <div className="detail-sale">${currentPrice.toFixed(2)}</div>
                        <div className="detail-original">${retailValue.toFixed(2)}</div>
                        <div className="detail-deal">({Math.round((retailValue - currentPrice) / retailValue * 100)}% off)</div>
                    </div>
                </div>
            </div>;
        }
        return <div className="modal open">
            <div className="detail-image-container">
                <img className="detail-image" src={previewImage} alt={title}></img>
                {this.props.favorites.has(id) ? <Filled onClick={() => { this.props.favorite(id) }} /> : <Unfilled onClick={() => { this.props.favorite(id) }} />}
                <Cancel onClick={e => {
                    this.onClose(e);
                }} />
            </div>
            <div className="detail-body">
                <div className="detail-tags">
                    {detailTags}
                </div>
                <div className="detail-brand">{brand.toUpperCase()}</div>
                <div className="detail-title">{title}</div>
                <div className="detail-prices">
                    <div className="detail-sale">${currentPrice.toFixed(2)}</div>
                    <div className="detail-original">${retailValue.toFixed(2)}</div>
                    <div className="detail-deal">({Math.round((retailValue - currentPrice) / retailValue * 100)}% off)</div>
                </div>
                <div className="detail-description">
                    <Markup content={description} />
                </div>
                <div className="cart-area">
                    <div className="dropdown">
                        <button onClick={this.toggleQuan} className="quantity-selector"><span className="current-quantity">{this.state.quantity}</span>
                            {this.state.quanShow ? <Up /> : <Down />}
                        </button>
                        {this.state.quanShow ? <div className="dropdown-content">
                            <div onClick={() => this.changeQuan(1)}><span className="quan-num">1</span></div>
                            <div onClick={() => this.changeQuan(2)}><span className="quan-num">2</span></div>
                            <div onClick={() => this.changeQuan(3)}><span className="quan-num">3</span></div>
                            <div onClick={() => this.changeQuan(4)}><span className="quan-num">4</span></div>
                            <div onClick={() => this.changeQuan(5)}><span className="quan-num">5</span></div>
                        </div> : null}
                    </div>
                    <button onClick={() => { this.props.addCart(this.state.quantity); this.onClose() }} id="add-to-cart">Add to Cart
                    </button>
                </div>
                <hr />
                <div onClick={this.toggleSpecs} className="specs-box">
                    <div className="specs-header">
                        <p className="specs">SPECS</p>
                        {this.state.specsShow ? <Up className="specs-arrow" /> : <Down className="specs-arrow" />}
                    </div>
                    {this.state.specsShow ?
                        <div className="detail-specs open">
                            <Markup content={specs} />
                        </div> : <div className="detail-specs"><Markup content={specs} /></div>}
                </div>
                <hr />
            </div>
        </div >;
    }
}

export default ProductDetails;