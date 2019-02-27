import * as cart_actions from "../actions/cart.actions";

// Provides the initial state for the event model
// This is paseed to components as initial state.
const initial_state = {
    data: null,
    error: null
};

/** Function: cart
 *  Arguments:
 *      - state: The state of the event model.
 *      - action: The type and payload from the event actions.
 *  Defenition:
 *      This function checks the type of action and based on
 *      the type it performs changes to the event models state.
 *  Returns:
 *      - state: the state of the event model.
 **/
const cart = (state = initial_state, action) => {
    switch (action.type) {
        case cart_actions.REQUEST_CART_SUCCESS:
            return {
                data: action.payload,
                error: action.payload.error
            };
        case cart_actions.REQUEST_CART_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case cart_actions.REQUEST_CART_LOADING:
            return {
                ...state
            };
        default:
            return {
                ...state
            };
    }
};

export default cart;
