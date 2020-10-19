import React from 'react';
import { ReactComponent as Unfilled } from '../assets/unfilled-heart.svg';
import { ReactComponent as Cancel } from '../assets/cancel.svg';

class ProductDetails extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return <div id="modal">
            <div className="detail-image-container">
                <img className="detail-image" src={this.props.data.previewImage}></img>
                <Unfilled />
                <Cancel onClick={e => {
                    this.onClose(e);
                }} />
            </div>
        </div >;
    }
}

export default ProductDetails;