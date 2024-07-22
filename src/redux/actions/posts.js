import * as actionTypes from "../actionTypes";
import axiosInstance from "../../utils/axiosInstance";

export const getPosts = (data) => ({
  type: actionTypes.GET_POSTS,
  payload: data,
});

export const addPost = (data) => ({
  type: actionTypes.ADD_POST,
  payload: data,
});
