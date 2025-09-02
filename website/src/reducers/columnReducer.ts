import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { User } from '../types'

export type ColumnState = {
    activeColumns: Array<keyof User>
}

const initialState = {
    activeColumns: ['firstName', 'lastName', 'street', 'state', 'city'] as Array<keyof User>
}

const columnReducer = createSlice({
    name: 'column',
    initialState,
    reducers: {
        setActiveColumns: (
            state: ColumnState,
            { payload }: PayloadAction<Array<keyof User>>
        ) => {
            state.activeColumns = payload
        }
    }

})

export const { actions, reducer } = columnReducer