import {createSlice} from '@reduxjs/toolkit';

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {selectedPlan: null},
  reducers: {
    selectPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
  },
});

export const {selectPlan} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
