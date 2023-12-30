// import axios from 'axios';
import { AUTH_FALSE, AUTH_TRUE, LOAD_FALSE, LOAD_TRUE } from './types';

export const authTrue = () => dispatch => {
    console.log("true");
    dispatch({
        type: AUTH_TRUE,
    });
}

export const authFalse = () => dispatch => {
    console.log("false");
    dispatch({
        type: AUTH_FALSE,
    });
}

export const loadTrue = () => dispatch => {
    dispatch({
        type: LOAD_TRUE,
    });
}

export const loadFalse = () => dispatch => {
    dispatch({
        type: LOAD_FALSE,
    });
}

/*
export const gettingPairs = () => dispatch => {
    axios
        .get('http://localhost:5000/api/req')
        .then(res => {
            dispatch({
                type: ACTION,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data));
};

export const gettingAPair = (id) => dispatch => {
    axios
        .get(`http://localhost:5000/api/req/${id}`)
        .then(res => {
            dispatch({
                type: ACTION,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data));
}

export const deletingPair = (id) => dispatch => {
    axios
        .delete(`http://localhost:5000/api/req/${id}`)
        .then(res => {
            dispatch({
                type: ACTION,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data))
}

export const updatingPair = (pair) => dispatch => {
    axios
        .put(`http://localhost:5000/api/req/${pair._id}`, pair)
        .then(res => {
            dispatch({
                type: ACTION,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data))
}

export const postingPair = (pair) => dispatch => {
    axios
        .post(`http://localhost:5000/api/req/${pair}`)
        .then((res) => {
            dispatch({
                type: ACTION,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data));
};
*/