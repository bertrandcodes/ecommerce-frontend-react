import React from 'react';
import { ReactComponent as Unfilled } from '../assets/unfilled-heart.svg';
import { ReactComponent as Cancel } from '../assets/cancel.svg';
import productData from '../catalog.json';
import { Markup } from 'interweave';

class ProductDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            data: productData.products[0]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data })
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

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
            </div>
        </div >;
    }
}

export default ProductDetails;