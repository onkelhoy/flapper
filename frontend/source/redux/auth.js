import { createSlice } from 'redux-starter-kit';

// https://developer.okta.com/blog/2019/08/12/build-secure-react-application-redux-jwt
const { actions, reducer } = createSlice({
  initialState: {
    loading: true,
    user: null,
    token: undefined,
  },
  reducers: {
    setAuth(state, { payload }) {
      state.loading = false;
      state.token = payout.token;

      if (payload.token) {
        try {
          state.user = JSON.parse(atob(payload.token.split('.')[1]));
        } catch (error) {
          state.user = null;
        }
      } else state.user = null;
    },
  },
});

export const { setAuth } = actions;

export default reducer;