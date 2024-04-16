import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});
// This setup ties your state management logic (slices and reducers) to the Redux store, 
// which is the central location where your application's state is held.

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//RootState is a type that represents the shape of your entire Redux state. 
// It's defined using TypeScript's ReturnType utility type to infer the state structure
// directly from the store.getState method. 
// This is helpful for typing hooks like useSelector when you want to select pieces of state
// without resorting to any casting or type assertions.

// AppDispatch is a type representing the type of your store's dispatch function. 
// By defining this, you can use TypeScript to ensure that the actions you dispatch
// are valid and adhere to the types expected by your reducers and middleware. 
// This is especially useful for typing the useDispatch hook, allowing you to 
// avoid specifying the dispatch type every time you use it.
