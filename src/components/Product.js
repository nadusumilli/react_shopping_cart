import React, { Component } from "react";
import "../../assets/css/Product.scss";

class Product extends Component {
    render() {
        let { product } = this.props;
        return (
            <div className="product-item">
                <div className="content text-center">
                    <img
                        src={product.image}
                        alt="item"
                        height="300px"
                        width="230px"
                    />
                    <div className="content-title">{product.title}</div>
                    <div className="content-price">
                        $<b>{product.price}</b>
                    </div>
                    <div className="content-btn btn btn-primary">
                        Add to Cart
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
