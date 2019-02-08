import { connect } from "react-redux";
import { getProducts, getProduct } from "../actions/product";
import Home from "../components/Home";

let MapStateToProps = ({ products }) => ({
    products
});

export default connect(
    MapStateToProps,
    { getProducts, getProduct }
)(Home);
