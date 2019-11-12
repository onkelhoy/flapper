import { createSlice } from 'redux-starter-kit';

const { actions, reducer } = createSlice({
  initialState: {
    selected: null,
    users: [],
  },
  name: 'users',
  reducers: {
    selectUser(state, { payload: user }) {
      state.selected = user || null;
    },
  },
});

export const { selectUser, } = actions;
export default reducer;