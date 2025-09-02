import { configureStore } from '@reduxjs/toolkit'
import { AppState } from './types'
import { reducer as columnReducer} from './reducers/columnReducer'
import { reducer as filterReducer} from './reducers/filterReducer'

export const store = configureStore<AppState>({
    reducer: {
        column: columnReducer,
        filter: filterReducer
    }
})