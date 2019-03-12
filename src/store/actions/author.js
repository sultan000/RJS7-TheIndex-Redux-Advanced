import * as actionTypes from "./actionTypes";
import axios from "axios";
import { dispatch } from "rxjs/internal/observable/pairs";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

export const fetchAuthorDetail = author_id => {
  return async dispatch => {
    try {
      const res = await instance.get(`/api/authors/${author_id}/`);
      const author = res.data;
      dispatch({
        type: actionTypes.FETCH_AUTHOR_DETAIL,
        payload: author
      });
    } catch (err) {}
  };
};
