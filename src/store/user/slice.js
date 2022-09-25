import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
      state.space = action.payload.space;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
      state.space = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
      state.space = action.payload.space;
    },
    storyDeleteSuccess: (state, action) => {
      const storyId = action.payload;
      state.space.stories = state.space.stories.filter((s) => s.id !== storyId);
    },
    storyCreateSuccess: (state, action) => {
      console.log(action.payload);
      state.space.stories.unshift(action.payload);
    },
    spaceUpdated: (state, action) => {
      state.space = { ...action.payload, stories: state.space.stories };
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  storyDeleteSuccess,
  storyCreateSuccess,
  storyUpdated,
  spaceUpdated
} = userSlice.actions;

export default userSlice.reducer;
