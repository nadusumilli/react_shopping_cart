import { connect } from "react-redux";
import { getProducts, getProduct } from "../actions/product.actions";
import {
    getCart,
    updateCart,
    addToCart,
    clearCart
} from "../actions/cart.actions";
import Home from "../components/Home";

let MapStateToProps = ({ products, cart }) => ({
    products,
    cart
});

export default connect(
    MapStateToProps,
    { getProducts, getProduct, getCart, updateCart, clearCart, addToCart }
)(Home);
