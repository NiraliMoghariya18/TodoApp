import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchdata = createAsyncThunk('api/fetchdata', async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/comments?_limit=5',
  );
  const data = await response.json();
  return data;
});

export const commentsfetchdata = createAsyncThunk(
  'comments/commentsfetchdata',
  async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/3/comments',
    );
    const data = await response.json();
    console.log(data);

    return data;
  },
);

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: [],
    postComments: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchdata.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchdata.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })

      .addCase(commentsfetchdata.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentsfetchdata.fulfilled, (state, action) => {
        state.loading = false;
        state.postComments = action.payload;
      })
      .addCase(commentsfetchdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default apiSlice.reducer;
