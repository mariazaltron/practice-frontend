import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spaces: [],
  spaceDetails: {},
};

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    allSpaces: (state, action) => {
      // console.log("spacesFetched action", action);
      state.loading = false;
      state.spaces = action.payload;
    },
    spaceById: (state, action) => {
      // console.log("spacesById", action);
      state.loading = false;
      state.spaceDetails = action.payload;
    },
  },
});

export const { allSpaces, startLoading, spaceById } = spaceSlice.actions;
export default spaceSlice.reducer;
