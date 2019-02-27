import * as product_actions from "../actions/product.actions";

// Provides the initial state for the event model
// This is paseed to components as initial state.
const initial_state = {
    data: null,
    error: null
};

/** Function: products
 *  Arguments:
 *      - state: The state of the event model.
 *      - action: The type and payload from the event actions.
 *  Defenition:
 *      This function checks the type of action and based on
 *      the type it performs changes to the event models state.
 *  Returns:
 *      - state: the state of the event model.
 **/
const products = (state = initial_state, action) => {
    switch (action.type) {
        case product_actions.REQUEST_PRODUCT_SUCCESS:
            return {
                data: action.payload,
                error: action.payload.error
            };
        case product_actions.REQUEST_PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case product_actions.REQUEST_PRODUCT_LOADING:
            return {
                ...state
            };
        default:
            return {
                ...state
            };
    }
};

export default products;
