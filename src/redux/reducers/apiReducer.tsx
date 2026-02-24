const initialState = {
  loading: false,
  data: [],
  error: '',
};

interface Action {
  type: string;
  payload?: any;
}
const dataReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_DATA_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: '' };
    case 'FETCH_DATA_FAILURE':
      return { ...state, loading: false, data: [], error: action.payload };
    default:
      return state;
  }
};

export default dataReducer;
