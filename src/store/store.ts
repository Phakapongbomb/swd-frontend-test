import { configureStore } from '@reduxjs/toolkit';
import test_1Reducer from './slices/test_1';
import test_3Reducer from './slices/test_3';

export const store = configureStore({
    reducer: {
        test_1: test_1Reducer,
        test_3: test_3Reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;