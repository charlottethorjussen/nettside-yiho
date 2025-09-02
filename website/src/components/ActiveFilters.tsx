import React from "react"
import { Box, Chip, Drawer, Typography } from "@mui/material"
import { AppState, User } from "../types"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../reducers/filterReducer"


function ActiveFilters() {
    const state = useSelector((state: AppState) => state.filter)
    const dispatch = useDispatch()

    const handleDeleteFilter = (index: number) => {
        // todo removed filter
        const filtered = state.filters.filter((_, i) => i !== index)

        dispatch(actions.setFilter(filtered))
        dispatch(actions.setTriggerFetch(true))
    }

    return (
        <Box display='flex' flexDirection='row'>
            {state.filters.map((filter, i) => (
                <Chip
                    label={`${filter.column} ${filter.logic} ${filter.value}`}
                    variant="outlined"
                    onDelete={() => handleDeleteFilter(i)}
                />
            ))}
        </Box>
    )
}

export default ActiveFilters