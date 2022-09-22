import axios from "axios";
import { allSpaces, startLoading, spaceById } from "./slice";

const API_URL = `http://localhost:4000`;

export const fetchSpaces = () => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${API_URL}/spaces`);
    // console.log("response thunk", response); //ALWAYS CONSOLE.LOG WHAT YOU GET BACK!!
    const spaces = response.data;
    dispatch(allSpaces(spaces));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchSpaceById = (id) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${API_URL}/spaces/${id}`);
    // console.log("response thunk ID", response); //ALWAYS CONSOLE.LOG WHAT YOU GET BACK!!
    const spacesById = response.data;
    dispatch(spaceById(spacesById));
  } catch (e) {
    console.log(e.message);
  }
};

