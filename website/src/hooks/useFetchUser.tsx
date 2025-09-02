import { useState, useCallback, useEffect } from 'react'
import { AppState, SearchBody, User } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/filterReducer'

export default function useFetchUser() {
    const state = useSelector((state: AppState) => state.filter)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<Array<User>>([])
    const [total, setTotal] = useState<number>(100000) // should initialize number like this

  

    const fetchSearchUsers = useCallback(async () => {

        const payload: SearchBody = {
          filters: state.filters,
          search: state.freeSearch,
          page: state.page,
          limit: state.limit,
          sort: state.sort?.columns ? {
            columns: state.sort.columns,
            directions: state.sort.directions
          } : undefined
        }

        setLoading(true)
  
        const responseApi = await fetch("http://localhost:80/search/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        return  responseApi.json()
          .then((response) => {
            console.log(response)
            setUsers(response.rows)
            // setPage(response.page)
            // setRowsPerPage(response.limit)
            setTotal(response.total)
          })
          .finally(() => {
            setLoading(false)
            dispatch(actions.setTriggerFetch(false))
          })
      }, [state])

    useEffect(() => {
      if (!Boolean(users.length) || Boolean(state.tiggerFetch))
        fetchSearchUsers()
    }, [state.tiggerFetch])


  return {
    loading,
    users,
    total,
    fetchSearchUsers
  }
}
