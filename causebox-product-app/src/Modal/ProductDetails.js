import React from 'react';
import { ReactComponent as Unfilled } from '../assets/unfilled-heart.svg';
import { ReactComponent as Cancel } from '../assets/cancel.svg';
import productData from '../catalog.json';
import { Markup } from 'interweave';
import { ReactComponent as Up } from '../assets/up-pointer.svg';
import { ReactComponent as Down } from '../assets/down-pointer.svg';


class ProductDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            data: productData.products[0],
            quantity: 1,
            quanShow: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data })
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
        // this.setState({
        //     quanShow: false
        // })
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
    }

    render() {
        const { previewImage, tags, brand, title, currentPrice, retailValue, description, specs } = this.state.data
        let detailTags = tags.map((tag, id) =>
            <div key={id} className={`detail-tag ${this.props.getColor(tag)}`}>{tag.toUpperCase()}</div>
        )
        if (!this.props.show) {
            return null;
        }
        return <div id="modal">
            <div className="detail-image-container">
                <img className="detail-image" src={previewImage}></img>
                <Unfilled />
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
                            <a onClick={() => this.changeQuan(1)}>1</a>
                            <a onClick={() => this.changeQuan(2)}>2</a>
                            <a onClick={() => this.changeQuan(3)}>3</a>
                            <a onClick={() => this.changeQuan(4)}>4</a>
                            <a onClick={() => this.changeQuan(5)}>5</a>
                        </div> : null}
                    </div>
                    <button className="add-to-cart">Add to Cart
                    </button>
                </div>
            </div>
        </div >;
    }
}

export default ProductDetails;