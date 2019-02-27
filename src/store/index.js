import { combineReducers } from "redux";
import products from "./products.store";
import cart from "./cart.store";

const reducers = combineReducers({
    products,
    cart
});

export default reducers;
