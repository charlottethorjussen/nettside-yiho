import React, { useCallback, useState } from 'react'
import { AppState, Sort, User } from '../types'
import PagingTable from './PagingTable'
import SearchBar from './SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/filterReducer'
import useFetchUser from '../hooks/useFetchUser'
import ActiveFilters from './ActiveFilters'

function UserTable() {
    const state = useSelector((state: AppState) => state.filter)
    const dispatch = useDispatch()

    const [page, setPage] = useState<number>(state.page)
    const [rowsPerPage, setRowsPerPage] = useState<number>(state.limit)
    const [columnsSort, setColumnsSort] = useState<Sort>() // TODO bugfix: reset local state when 
    
    const { loading, users, total} = useFetchUser()
  
    const handleChangePage = useCallback((newPage: number) => {
      setPage(newPage)
      dispatch(actions.setPage(newPage))
      dispatch(actions.setTriggerFetch(true))
    }, [])
  
    const handleChangeRowsPerPage = useCallback((value: number) => {
      setRowsPerPage(value)
      setPage(0)
      dispatch(actions.setLimit(value))
      dispatch(actions.setPage(0))
      dispatch(actions.setTriggerFetch(true))
    }, [])

    const handleSort = useCallback((column: keyof User, currDir) => {
      const newDir = currDir == 'asc' ? 'desc' : 'asc'

      setColumnsSort((prev) => {
        const prevColumns = prev?.columns ?? [];
        const prevDirections = prev?.directions ?? [];
    
        const filteredColumns = prevColumns.filter((c) => c !== column);
        const filteredDirections = prevDirections.filter((_, i) => prevColumns[i] !== column);
      
        return {
          columns: [...filteredColumns, column],
          directions: [...filteredDirections, newDir],
        };
      })

      dispatch(actions.setSort({
        columns: [...(columnsSort?.columns?.filter((c) => c !== column) ?? []), column],
        directions: [...(columnsSort?.directions?.filter((_, i) => columnsSort?.columns[i] !== column) ?? []), newDir]
      }))
      // setPage(0)
      // dispatch(actions.setPage(0))
      dispatch(actions.setTriggerFetch(true))
    }, [columnsSort])

  return (
    <>
      <SearchBar/>
      <ActiveFilters/>
      <PagingTable
        sortOrder={columnsSort}
        rows={users}
        loading={loading}
        totalCount={total}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
        onSort={handleSort}
      />
    </>
  )
}

export default UserTable
