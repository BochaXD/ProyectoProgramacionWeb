const {
   EVENTOS_LIST_REQUEST,
   EVENTOS_LIST_SUCCESS,
   EVENTOS_LIST_FAIL,
   EVENTOS_DETAILS_REQUEST,
   EVENTOS_DETAILS_SUCCESS,
   EVENTOS_DETAILS_FAIL,
   EVENTOS_CREATE_REQUEST,
   EVENTOS_CREATE_SUCCESS,
   EVENTOS_CREATE_FAIL,
   EVENTOS_CREATE_RESET,
   EVENTOS_UPDATE_REQUEST,
   EVENTOS_UPDATE_SUCCESS,
   EVENTOS_UPDATE_FAIL,
   EVENTOS_UPDATE_RESET,
   EVENTOS_DELETE_REQUEST,
   EVENTOS_DELETE_SUCCESS,
   EVENTOS_DELETE_FAIL,
   EVENTOS_DELETE_RESET,
   EVENTOS_CATEGORY_LIST_REQUEST,
   EVENTOS_CATEGORY_LIST_SUCCESS,
   EVENTOS_CATEGORY_LIST_FAIL,
   EVENTOS_REVIEW_CREATE_REQUEST,
   EVENTOS_REVIEW_CREATE_SUCCESS,
   EVENTOS_REVIEW_CREATE_FAIL,
   EVENTOS_REVIEW_CREATE_RESET,
  } = require('../constants/eventoConstants');
  

  export const eventoListReducer = (
    state = { loading: true, eventos: [] },
    action
  ) => {
    switch (action.type) {
      case EVENTOS_LIST_REQUEST:
        return { loading: true };
      case EVENTOS_LIST_SUCCESS:
        return {
          loading: false,
          eventos: action.payload.eventos,
          pages: action.payload.pages,
          page: action.payload.page,
        };
      case EVENTOS_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const eventoCategoryListReducer = (
    state = { loading: true, eventos: [] },
    action
  ) => {
    switch (action.type) {
      case EVENTOS_CATEGORY_LIST_REQUEST:
        return { loading: true };
      case EVENTOS_CATEGORY_LIST_SUCCESS:
        return { loading: false, categories: action.payload };
      case EVENTOS_CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const eventoDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case EVENTOS_DETAILS_REQUEST:
        return { loading: true };
      case EVENTOS_DETAILS_SUCCESS:
        return { loading: false, evento: action.payload };
      case EVENTOS_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const eventoCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENTOS_CREATE_REQUEST:
        return { loading: true };
      case EVENTOS_CREATE_SUCCESS:
        return { loading: false, success: true, evento: action.payload };
      case EVENTOS_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case EVENTOS_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const eventoUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENTOS_UPDATE_REQUEST:
        return { loading: true };
      case EVENTOS_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case EVENTOS_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case EVENTOS_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const eventoDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENTOS_DELETE_REQUEST:
        return { loading: true };
      case EVENTOS_DELETE_SUCCESS:
        return { loading: false, success: true };
      case EVENTOS_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case EVENTOS_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const eventoReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENTOS_REVIEW_CREATE_REQUEST:
        return { loading: true };
      case EVENTOS_REVIEW_CREATE_SUCCESS:
        return { loading: false, success: true, review: action.payload };
      case EVENTOS_REVIEW_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case EVENTOS_REVIEW_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  