import React from 'react';

class ProductDetails extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return <div id="modal">
            Hello
        </div>;
    }
}

export default ProductDetails;