import axios from "axios";
import setToken from "./setAuthToken";

// Action types for the redux store management.
const REQUEST_SUCCESS = "REQUEST_SUCCESS";
const REQUEST_ERROR = "REQUEST_ERROR";
const REQUEST_LOADING = "REQUEST_LOADING";

// Endpoints related to the user session management.
const product_endpoint = "products";

// Request methods to create server requests.
const HTTP_POST = "post";
const HTTP_GET = "get";
const HTTP_DELETE = "delete";
const HTTP_PUT = "put";

/** Function: productRequest
 *  Arguments:
 *      - request_data: the data to be sent with the request.
 *      - request_url: The url to send the request to.
 *      - request_method: The method to use to send the request.
 *  Defenition:
 *      Sends a request to the backend and performs actions on
 *      the products table in the database.
 *  Returns: None
 **/
const productRequest = (
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
            dispatch({ type: REQUEST_SUCCESS, payload: res.data });
        },
        err => dispatch({ type: REQUEST_ERROR, payload: err.response.data })
    );
};

/** Specialized Function: getProducts
 *  Arguments:
 *      - request_data: None
 *  Defenition:
 *      Calls the productRequest function below with the get method
 *      and returns all the products
 *  Returns: None
 **/
const getProducts = request_data => dispatch =>
    dispatch(productRequest(request_data, product_endpoint, HTTP_GET));

/** Specialized Function: getProduct
 *  Arguments:
 *      - request_data: the data to get a product
 *  Defenition:
 *      Calls the productRequest function below with the get
 *      method and returns a single product.
 *  Returns: None
 **/
const getProduct = request_data => dispatch =>
    dispatch(productRequest(request_data, product_endpoint, HTTP_DELETE));

/** Specialized Function: createProduct
 *  Arguments:
 *      - token: the data to create a product
 *  Defenition:
 *      Calls the productRequest function below with the post
 *      method to create a product.
 *  Returns: None
 **/
const createProduct = token => dispatch =>
    dispatch(productRequest(token, product_endpoint, HTTP_GET));

/** Specialized Function: updateProduct
 *  Arguments:
 *      - request_data: The data to update a product.
 *  Defenition:
 *      Calls the productRequest function below with the update
 *      method and returns a updated product.
 *  Returns: None
 **/
const updateProduct = request_data => dispatch =>
    dispatch(productRequest(request_data, register_endpoint, HTTP_POST));

/** Specialized Function: deleteProduct
 *  Arguments:
 *      - request_data: The data to delete a product
 *  Defenition:
 *      Calls the productRequest function below with the delete
 *      method and deletes a product.
 *  Returns: None
 **/
const deleteProduct = request_data => dispatch =>
    dispatch(productRequest(request_data, profile_endpoint, HTTP_PUT));

// Exporting the specialized functions and some action types.
export {
    REQUEST_ERROR,
    REQUEST_SUCCESS,
    REQUEST_LOADING,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
