import React, { Component } from "react";
import css from "../../assets/css/Home.scss";
import Loading from "../pages/Loading";
import Filter from "./Filter";
import Product from "./Product";
import Cart from "./Cart";

class Home extends Component {
    state = {
        loading: true,
        products: []
    };

    componentDidMount() {
        this.props.getProducts();
        this.props.getCart();
    }

    sortByPrice = filter => {
        let { products } = this.state;
        if (filter === "low_to_high") {
            products.sort((a, b) => a.price - b.price);
        } else {
            products.sort((a, b) => a.price - b.price);
            products.reverse();
        }
        this.setState({ products });
    };

    filterBySize = filter => {
        let filtered_products;
        let products = this.props.products.data;

        if (filter === "") filtered_products = products;
        else
            filtered_products = products.filter(product =>
                product.availableSizes.includes(filter)
            );
        this.setState({ products: filtered_products });
    };

    componentDidUpdate(prevProps) {
        if (
            this.props.products.data !== prevProps.products.data &&
            this.props.cart !== prevProps.cart
        ) {
            this.setState({
                loading: false,
                products: this.props.products.data
            });
        }
    }

    render() {
        let { loading, products } = this.state;

        if (loading) return <Loading />;
        return (
            <div className="container">
                <Cart
                    cart={this.props.cart}
                    updateCart={this.props.updateCart}
                    clearCart={this.props.clearCart}
                />
                <div className="row">
                    <Filter
                        sortByPrice={this.sortByPrice}
                        filterBySize={this.filterBySize}
                    />
                </div>
                <ul className="row">
                    <div className="images-content">
                        {products.map(product => (
                            <Product
                                key={product.sku}
                                product={product}
                                addToCart={this.props.addToCart}
                            />
                        ))}
                    </div>
                </ul>
            </div>
        );
    }
}

export default Home;
