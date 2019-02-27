import React, { Component } from "react";
import "../../assets/css/Cart.scss";

class Cart extends Component {
    openCart = e => {
        let $cart_div = document.getElementById("cart");
        $cart_div.style.width = "400px";
    };

    closeCart = e => {
        let $cart_div = document.getElementById("cart");
        $cart_div.style.width = "0px";
    };

    increaseQuantity = product => e => {
        this.props.updateCart({ item: product, remove: false });
    };

    decreaseQuantity = product => e => {
        this.props.updateCart({ item: product, remove: true });
    };

    calculateSubTotal = item => {
        return item.price * item.quantity;
    };

    render() {
        const cart = this.props.cart.data;
        return (
            <div>
                <div>
                    {cart.items && cart.items.length > 0 && (
                        <div className="cart-number">{cart.total_quantity}</div>
                    )}
                    <span className="cart-btn" onClick={this.openCart}>
                        <i className="fas fa-shopping-cart" />
                    </span>
                </div>

                <div id="cart" className="cart">
                    <span className="close-btn" onClick={this.closeCart}>
                        <i className="fas fa-times" />
                    </span>
                    {cart.items && cart.items.length > 0 ? (
                        <div>
                            <div className="cart-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>action</th>
                                            <th>quantity</th>
                                            <th>action</th>
                                            <th>total</th>
                                        </tr>
                                    </thead>
                                    {cart.items.map(item => (
                                        <tbody key={item.sku}>
                                            <tr>
                                                <td>
                                                    <img
                                                        className="cart-image"
                                                        src={item.image}
                                                        alt=""
                                                    />
                                                </td>
                                                <td>
                                                    <span
                                                        className="cart-remove"
                                                        onClick={this.decreaseQuantity(
                                                            item
                                                        )}
                                                    >
                                                        <i className="fas fa-minus" />
                                                    </span>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="quantity"
                                                        id="quantity"
                                                        className="cart-quantity"
                                                        readOnly
                                                        value={item.quantity}
                                                    />
                                                </td>
                                                <td>
                                                    <span
                                                        className="cart-add"
                                                        onClick={this.increaseQuantity(
                                                            item
                                                        )}
                                                    >
                                                        <i className="fas fa-plus" />
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="cart-sub-total">
                                                        {this.calculateSubTotal(
                                                            item
                                                        ).toFixed(2)}
                                                        $
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                                <div className="cart-total">
                                    <div>
                                        <strong>Total:</strong>
                                    </div>
                                    <div className="cart-price-total">
                                        {cart.total_price.toFixed(2)}$
                                    </div>
                                </div>
                                <div className="cart-btns">
                                    <button
                                        className="clear-cart btn"
                                        onClick={this.props.clearCart}
                                    >
                                        Clear Cart
                                    </button>
                                    <button
                                        className="checkout-cart btn"
                                        // onClick={this.props.showModal}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="cart-body">
                            <div className="cart-empty">Cart is Empty</div>
                            <div className="cart-total">
                                <div>
                                    <strong>Total:</strong>
                                </div>
                                <div className="cart-price-total">0$</div>
                            </div>
                            <div className="cart-btns">
                                <button className="clear-cart btn">
                                    Clear Cart
                                </button>
                                <button
                                    className="checkout-cart btn"
                                    // onClick={this.props.showModal}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Cart;
