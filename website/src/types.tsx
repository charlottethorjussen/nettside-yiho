import { ColumnState } from "./reducers/columnReducer"
import { FilterState } from "./reducers/filterReducer"

export type User = {
    seq: number
    firstName: string
    lastName: string
    age: number
    street: string
    city: string
    state: string
    latitude: string
    longitude: string
    ccnumber: number
}

export type Filter = {
    column: string
    type: 'bool' | 'num' | 'text'
    logic: '==' | '!=' | 'startswith' | 'endswith' | 'contains'
    value: number | string | boolean
}

export type Sort = {
    columns: Array<keyof User>
    directions: Array<'asc' | 'desc'>
}

export type SearchBody = {
    search?: string
    filters?: Array<Filter>
    sort?: Sort
    page: number
    limit: number // limit of rows in on page
}

export type AppState = {
    column: ColumnState
    filter: FilterState
}