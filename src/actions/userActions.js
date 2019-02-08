import axios from "axios";
import setToken from "./setAuthToken";

const REQUEST_SUCCESS = "REQUEST_SUCCESS";
const REQUEST_FAILURE = "REQUEST_FAILURE";
const REQUEST_LOADING = "REQUEST_LOADING";

const HTTP_POST = "post";
const HTTP_GET = "get";
const HTTP_DELETE = "delete";

const SESSION_ENDPOINT = "/api/v1/session/";
const REGISTER_ENDPOINT = "/api/v1/register/";

const userRequest = (
    user_details,
    request_method,
    request_endpoint
) => dispatch => {
    let settings, token;

    settings = {
        method: request_method,
        url: request_endpoint
    };

    if (request_method === "post" && localStorage.todo_token) {
        localStorage.removeItem("todo_token");
        setToken(false);
    }

    if (request_method === "get") settings.params = user_details;
    else settings.data = user_details;

    // axios request to fetch data.
    axios(settings).then(
        res => {
            // Setting the auth token for further requests.
            // Storing the token in localstorage.
            // dispatching the actions.
            token = res.data.token || "";
            setToken(token);
            localStorage.setItem("todo_token", token);
            dispatch({
                type: REQUEST_SUCCESS,
                payload: { ...res.data, status: res.status }
            });
        },
        err => dispatch({ type: REQUEST_FAILURE, payload: err.response.data })
    );
};

const userStatus = user_details => dispatch =>
    dispatch(userRequest(user_details, HTTP_GET, SESSION_ENDPOINT));

const loginUser = user_details => dispatch =>
    dispatch(userRequest(user_details, HTTP_POST, SESSION_ENDPOINT));

const logoutUser = user_details => dispatch =>
    dispatch(userRequest(user_details, HTTP_DELETE, SESSION_ENDPOINT));

const registerUser = user_details => dispatch =>
    dispatch(userRequest(user_details, HTTP_POST, REGISTER_ENDPOINT));

export {
    userStatus,
    loginUser,
    logoutUser,
    registerUser,
    REQUEST_SUCCESS,
    REQUEST_FAILURE,
    REQUEST_LOADING
};
