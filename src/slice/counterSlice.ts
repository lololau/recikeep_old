import { createSlice } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../app/store'


interface State {
    value: number;
    lastError?: Error;
}

const initialState: State = {
    value: 0,
    lastError: undefined
}

const counterReducer = createSlice({
    name: 'counter',
    initialState: initialState,
      reducers: {
        increment: state => {
          // Redux Toolkit allows us to write "mutating" logic in reducers. It
          // doesn't actually mutate the state because it uses the Immer library,
          // which detects changes to a "draft state" and produces a brand new
          // immutable state based off those changes
          state.value += 1;
        },
        decrement: state => {
          state.value -= 1;
        },
        incrementByAmount: (state, action) => {
          state.value += action.payload;
        },
      }
})

export const { increment, decrement, incrementByAmount } = counterReducer.actions;

export const selectCount = (state: RootState) => state.counter.value;
export const selectLastError = (state: RootState) => state.counter.lastError;

export const incrementAsync = (amount: number) => (dispatch: AppDispatch) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount));
    }, 1000);
  };

export default counterReducer.reducer ;