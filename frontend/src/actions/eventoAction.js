import Axios from 'axios';
import {
    EVENTOS_CREATE_FAIL,
    EVENTOS_CREATE_REQUEST,
    EVENTOS_CREATE_SUCCESS,
    EVENTOS_DETAILS_FAIL,
    EVENTOS_DETAILS_REQUEST,
    EVENTOS_DETAILS_SUCCESS,
    EVENTOS_LIST_FAIL,
    EVENTOS_LIST_REQUEST,
    EVENTOS_LIST_SUCCESS,
    EVENTOS_UPDATE_REQUEST,
    EVENTOS_UPDATE_SUCCESS,
    EVENTOS_UPDATE_FAIL,
    EVENTOS_DELETE_REQUEST,
    EVENTOS_DELETE_FAIL,
    EVENTOS_DELETE_SUCCESS,
    EVENTOS_CATEGORY_LIST_SUCCESS,
    EVENTOS_CATEGORY_LIST_REQUEST,
    EVENTOS_CATEGORY_LIST_FAIL,
    EVENTOS_REVIEW_CREATE_REQUEST,
    EVENTOS_REVIEW_CREATE_SUCCESS,
    EVENTOS_REVIEW_CREATE_FAIL,
  } from '../constants/eventoConstants';
  export const listEventos = ({
    pageNumber = '',
    seller = '',
    name = '',
    category = '',
    order = '',
    min = 0,
    max = 0,
    rating = 0,
  }) => async (dispatch) => {
    dispatch({
      type: EVENTOS_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/evento?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
      );
      dispatch({ type: EVENTOS_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: EVENTOS_LIST_FAIL, payload: error.message });
    }
  };
  
  export const listEventoCategories = () => async (dispatch) => {
    dispatch({
      type: EVENTOS_CATEGORY_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(`/api/evento/categories`);
      dispatch({ type: EVENTOS_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: EVENTOS_CATEGORY_LIST_FAIL, payload: error.message });
    }
    
  };
  
  
  export const detailsEvento = (eventoId) => async (dispatch) => {
    dispatch({ type: EVENTOS_DETAILS_REQUEST, payload: eventoId });
    try {
      const { data } = await Axios.get(`/api/evento/${eventoId}`);
      dispatch({ type: EVENTOS_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type:EVENTOS_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const createEvento = () => async (dispatch, getState) => {
    dispatch({ type: EVENTOS_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/evento',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: EVENTOS_CREATE_SUCCESS,
        payload: data.evento,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENTOS_CREATE_FAIL, payload: message });
    }
  };
  export const updateEvento = (evento) => async (dispatch, getState) => {
    dispatch({ type: EVENTOS_UPDATE_REQUEST, payload: evento });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/evento/${evento._id}`, evento, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: EVENTOS_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENTOS_UPDATE_FAIL, error: message });
    }
  };
  export const deleteEvento = (eventoId) => async (dispatch, getState) => {
    dispatch({ type: EVENTOS_DELETE_REQUEST, payload: eventoId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/evento/${eventoId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: EVENTOS_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENTOS_DELETE_FAIL, payload: message });
    }
  };
  export const createReview = (eventoId, review) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: EVENTOS_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/evento/${eventoId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: EVENTOS_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENTOS_REVIEW_CREATE_FAIL, payload: message });
    }
  };
  