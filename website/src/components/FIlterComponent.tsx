import React, { useCallback, useState } from 'react'
import { Box, Button, MenuItem, Popover, TextField } from "@mui/material"
import { columns } from './ColumnSelector'
import { Filter } from '../types'
import { useDispatch } from 'react-redux'
import { actions } from '../reducers/filterReducer'
import AddIcon from '@mui/icons-material/Add'

const logicMethods = {
    bool: ["==", "!="],
    num: ["==", "!=", ">", "<", ">=", "<="],
    text: ["contains", "startswith", "endswith"]
  }

const numberColumns = ['seq', 'age', 'ccnumber']


function FilterComponent() {
    const dispatch = useDispatch()
    const [filterQuery, setFilterQuery] = useState<Partial<Filter>>()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    }
  
    const handleClose = () => {
        setFilterQuery(undefined)
        setAnchorEl(null)
    }
  
    const handleChange = useCallback((event) => {
        // todo validation - buggy function
        const formatValue = event.target.name != 'value' 
            ? event.target.value
            : numberColumns.includes(filterQuery?.column ?? '')
              ? Number(event.target.value) 
              : event.target.value
        
        const typeValue = (event.target.name == 'column' && numberColumns.includes(event.target.value)) || (numberColumns.includes(filterQuery?.column ?? ''))
            ? { "type": "num" }
            : { "type": "text" }

        setFilterQuery(prev => {
            return {
                ...prev,
                ...typeValue as any,
                [event.target.name]: formatValue
            }
        })
    }, [filterQuery])

    const handleSearch = () => {
        // todo: add validation - check if filterQuery has all keys
        dispatch(actions.addFilter(filterQuery as Filter))
        dispatch(actions.setTriggerFetch(true))
        handleClose()
    }

    return (
        <>
        
        <Button variant="outlined" onClick={handleClick} startIcon={<AddIcon />}>
            Filter
        </Button>
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >

            <Box display='flex' flexDirection='column' p={2} gap={2}>
                <TextField
                    size="small"
                    select
                    name="column"
                    label="Column"
                    value={filterQuery?.column}
                    onChange={handleChange}
                >
                    {columns.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    size="small"
                    select
                    name="logic"
                    label="Method"
                    value={filterQuery?.logic}
                    disabled={!Boolean(filterQuery?.type)}
                    onChange={handleChange}
                >
                    {filterQuery?.type && Object.values(logicMethods[filterQuery.type]).map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    name="value"
                    size="small"
                    label="Value"
                    value={filterQuery?.value}
                    onChange={handleChange}
                />

                <Button variant="contained" onClick={handleSearch}>
                    Add filter
                </Button>
            </Box>
        
        </Popover>
    
    </>
    )
}

export default FilterComponent