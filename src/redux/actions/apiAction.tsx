// actions.js

import { Action, Dispatch } from '@reduxjs/toolkit';

export interface FetchDataSuccessPayload {
  userId: number;
  id: number;
  name: string;
  body: string;
}
export const fetchDataRequest = () => ({
  type: 'FETCH_DATA_REQUEST',
});

export const fetchDataSuccess = (data: FetchDataSuccessPayload) => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: data,
});

export const fetchDataFailure = (error: string) => ({
  type: 'FETCH_DATA_FAILURE',
  payload: error,
});

// Thunk function
export const fetchData = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchDataRequest());
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/10/comments',
      );
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
