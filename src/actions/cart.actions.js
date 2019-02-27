import axios from "axios";

// Action types for the redux store management.
const REQUEST_CART_SUCCESS = "REQUEST_CART_SUCCESS";
const REQUEST_CART_ERROR = "REQUEST_CART_ERROR";
const REQUEST_CART_LOADING = "REQUEST_CART_LOADING";

// Endpoints related to the user session management.
const cart_endpoint = "cart";

// Request methods to create server requests.
const HTTP_POST = "post";
const HTTP_GET = "get";
const HTTP_DELETE = "delete";
const HTTP_PUT = "put";

/** Function: cartRequest
 *  Arguments:
 *      - request_data: the data to be sent with the request.
 *      - request_url: The url to send the request to.
 *      - request_method: The method to use to send the request.
 *  Defenition:
 *      Sends a request to the backend and performs actions on
 *      the products table in the database.
 *  Returns: None
 **/
const cartRequest = (
    request_data = undefined,
    request_url,
    request_method
) => dispatch => {
    let settings = {
        baseURL: "http://localhost:3000/"
    };

    // Creating settings and performing actions for requests.
    if (request_method == "get") {
        settings.params = request_data;
        settings.url = request_url;
    } else {
        settings.data = request_data;
        settings.url = request_url;
    }

    // Settings the axios request settings.
    settings.method = request_method;

    // Request to the backend.
    axios(settings).then(
        res => {
            dispatch({ type: REQUEST_CART_SUCCESS, payload: res.data });
        },
        err =>
            dispatch({ type: REQUEST_CART_ERROR, payload: err.response.data })
    );
};

/** Specialized Function: getCart
 *  Arguments:
 *      - request_data: the data to get a product
 *  Defenition:
 *      Calls the cartRequest function below with the get
 *      method and returns a single product.
 *  Returns: None
 **/
const getCart = request_data => dispatch =>
    dispatch(cartRequest(request_data, cart_endpoint, HTTP_GET));

/** Specialized Function: addToCart
 *  Arguments:
 *      - request_data: the data to get a product
 *  Defenition:
 *      Calls the cartRequest function below with the post
 *      method to create a product.
 *  Returns: None
 **/
const addToCart = request_data => dispatch =>
    dispatch(cartRequest(request_data, cart_endpoint, HTTP_POST));

/** Specialized Function: updateCart
 *  Arguments:
 *      - request_data: The data to update a product.
 *  Defenition:
 *      Calls the cartRequest function below with the update
 *      method and returns a updated product.
 *  Returns: None
 **/
const updateCart = request_data => dispatch =>
    dispatch(cartRequest(request_data, cart_endpoint, HTTP_PUT));

/** Specialized Function: clearCart
 *  Arguments:
 *      - request_data: The data to delete a product
 *  Defenition:
 *      Calls the cartRequest function below with the delete
 *      method and deletes a product.
 *  Returns: None
 **/
const clearCart = request_data => dispatch =>
    dispatch(cartRequest(request_data, cart_endpoint, HTTP_DELETE));

// Exporting the specialized functions and some action types.
export {
    REQUEST_CART_ERROR,
    REQUEST_CART_SUCCESS,
    REQUEST_CART_LOADING,
    getCart,
    addToCart,
    updateCart,
    clearCart
};
