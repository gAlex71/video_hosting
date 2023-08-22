import { rootReducer } from '@/store/root-reducers';
import { configureStore } from '@reduxjs/toolkit';
//Позволяет сохранять данные в localstorage
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rtkQueryErrorLogger } from './middlewares/error.middleware';
import { api } from './api/api';

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['auth']
}

//Оборачиваем редюсеры
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(rtkQueryErrorLogger).concat(api.middleware)
})

//Отдельно забираем persistore
export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;
