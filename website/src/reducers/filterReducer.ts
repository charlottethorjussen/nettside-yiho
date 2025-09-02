import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Filter, Sort } from '../types'

export type FilterState = {
    filters: Array<Filter>
    freeSearch: string
    page: number
    limit: number
    sort: Sort 
    tiggerFetch: boolean
}

const initialState = {
    filters: [] as any,
    freeSearch: '',
    page: 0,
    limit: 10,
    sort: {} as any,
    tiggerFetch: false
}

const filterReducer = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch: (
            state: FilterState,
            { payload }: PayloadAction<string>
        ) => {
            state.freeSearch = payload
        },
        setSort: (
            state: FilterState,
            { payload }: PayloadAction<Sort>
        ) => {
            state.sort = {
                columns: payload.columns,
                directions: payload?.directions
              }},
        setPage: (
            state: FilterState,
            { payload }: PayloadAction<number>
        ) => {
            state.page = payload
        },
        setLimit: (
            state: FilterState,
            { payload }: PayloadAction<number>
        ) => {
            state.limit = payload
        },
        setTriggerFetch: (
            state: FilterState,
            { payload }: PayloadAction<boolean>
        ) => {
            state.tiggerFetch = payload
        },
        setFilter: (
            state: FilterState,
            { payload }: PayloadAction<Array<Filter>>
        ) => {
            state.filters = payload
        },
        addFilter: (
            state: FilterState,
            { payload }: PayloadAction<Filter>
        ) => {
            state.filters = [...state.filters, payload]
        },
        setInitials: (state: FilterState)  => {
            state.filters = []
            // state.freeSearch = ''
            state.page = 0
            state.limit = 10
            state.sort = {} as any
        }   
    }

})

export const { actions, reducer } = filterReducer