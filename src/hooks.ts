// import the TypedUseSelectorHook, useSelector and useDispatch hooks from react-redux
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
// import the RootState and AppDispatch types from the store.ts file
import { AppDispatch, RootState } from './store';

// Redux provides the useDispatch and useSelector hooks to access the store's dispatch and
// state inside a React component. But in order to have them aware of the Typescript types
// defined in the store.ts file, we need to re-export new functions that are type aware.
// Use useAppDispatch & useAppSelector throughout your app instead of plain `useDispatch`
// and `useSelector`

// create a custom hook that returns the AppDispatch type
export const useAppDispatch = () => useDispatch<AppDispatch>();
// create a custom hook that returns the RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
