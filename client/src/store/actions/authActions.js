import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    LOAD_USER,
    LOAD_USER_FAIL
} from "./actionTypes";

export const register = userData => {
    return async dispatch => {
        try {
            await axios.post("/api/users/register", userData);
            dispatch({
                type: REGISTER_SUCCESS
            });
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            });
        }
    };
};

export const login = userData => {
    return async dispatch => {
        try {
            const res = await axios.post("/api/users/login", userData);

            // Create and set token in header and localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwtDecode(token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: decoded
            });
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            });
        }
    };
};

export const logout = () => {
    return dispatch => {
        // Remove token from localStorage and header
        localStorage.removeItem("jwtToken");
        setAuthToken(false);

        dispatch({
            type: LOGOUT
        });
    };
};

export const loadUser = data => {
    return async dispatch => {
        try {
            dispatch({
                type: LOAD_USER,
                payload: data
            });
        } catch (err) {
            dispatch({
                type: LOAD_USER_FAIL
            });
        }
    };
};

export const getUserData = async id => {
    try {
        const res = await axios.get(`/api/users/${id}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateUser = async userData => {
    try {
        const res = await axios.post(`/api/users/${userData.id}`, userData);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const verifyEmail = async token => {
    try {
        const res = await axios.post(`/api/users/verification/${token}`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};
