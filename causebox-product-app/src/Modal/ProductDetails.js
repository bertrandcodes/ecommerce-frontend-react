import React from 'react';

class ProductDetails extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        let { title, brand, previewImage, description, specs } = this.props.data
        if (!this.props.show) {
            return null;
        }
        return <div>modal</div>;
    }
}

export default ProductDetails;