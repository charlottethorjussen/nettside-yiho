import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ColumnSelector from './ColumnSelector'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/filterReducer'
import { AppState } from '../types'
import useDebounce from '../hooks/useDebounce'
import FilterComponent from './FIlterComponent'


export default function SearchBar() {
    const [searchValue, setSearchValue] = useState<string>('')
    const debouncedValue = useDebounce(searchValue, 1000)

    const state = useSelector((state: AppState) => state.filter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (debouncedValue != state.freeSearch) {
            dispatch(actions.setSearch(debouncedValue))
            dispatch(actions.setTriggerFetch(true))
        }
    }, [debouncedValue])

    const resetSearch = () => {
        dispatch(actions.setInitials())
        dispatch(actions.setTriggerFetch(true))
    }

    return (
        <Box display='flex' justifyContent='space-between' flexDirection='row' mb={2} mt={2}>
            <Box display='flex' gap={2} alignItems={'center'}>
                <TextField
                    autoFocus
                    placeholder='Search'
                    size='small'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    slotProps={{
                        input: {
                        startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                        }
                    }}
                />
                <FilterComponent/>
                <Button onClick={resetSearch} variant="outlined">
                    Reset
                </Button>
            </Box>
            <ColumnSelector/>
        </Box>
    )
}