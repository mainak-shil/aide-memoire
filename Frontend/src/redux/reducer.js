import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //here we will write our reducer
    //Adding todos

    saveAllTodos: (state, action) => {
      state = action.payload;
      return state;
    },
    addTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },
    //remove todos
    removeTodos: (state, action) => {
      return state?.filter((item) => item?.id !== action.payload);
    },
    //update todos
    updateTodos: (state, action) => {
      return state?.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.text,
          };
        }
        return todo;
      });
    },
    //completed
    completeTodos: (state, action) => {
      return state?.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    },
  },
});

export const {
  addTodos,
  saveAllTodos,
  removeTodos,
  updateTodos,
  completeTodos,
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
