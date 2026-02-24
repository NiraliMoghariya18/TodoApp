import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  assignedTo: string;
  isCompleted: boolean;
  createdAt: string;
  editedAt: string | null;
}

interface TodoState {
  items: TodoItem[];
}

const initialState: TodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.items.push(action.payload);
    },

    updateTodo: (state, action: PayloadAction<TodoItem>) => {
      state.items = state.items.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    setTodos: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addTodo, updateTodo, removeTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
