import { IconButton, Popover, List, ListItem, ListItemButton, ListItemText, Checkbox } from '@mui/material'
import React, { useState } from 'react'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, User } from '../types';
import { actions } from '../reducers/columnReducer'

type Columns = {
    id: keyof User
    align?: any
    label: string
}

export const columns:  Array<Columns> = [
    { id: 'seq', label: 'Sequence' },
    { id: 'firstName', label: 'First name' },
    { id: 'lastName', label: 'Last name' },
    { id: 'age', label: 'Age' },
    { id: 'street', label: 'Street' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State' },
    { id: 'latitude', label: 'Latitude' },
    { id: 'longitude', label: 'Longitude' },
    { id: 'ccnumber', label: 'Cerdit card' }
  ]


function ColumnSelector() {

    const [anchorEl, setAnchorEl] = useState(null)
    const { activeColumns } = useSelector((state: AppState) => state.column)

    const dispatch = useDispatch()

    const handleActive = (checked, id) => {
        const newColumns = checked
            ? [...activeColumns, id]
            : activeColumns.filter((key) => key !== id) 
        
        dispatch(actions.setActiveColumns(newColumns))
    }

    const handleToggle = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <div>
            <IconButton
                onClick={handleToggle}
            >
                <ViewColumnIcon/>
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                >
                <List>
                    {Object.values(columns).map(c => (
                        <ListItem
                            key={c.id}
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={(e) => handleActive(e.target.checked, c.id)}
                                    checked={activeColumns.includes(c.id)}
                                />
                            }
                            disablePadding
                            >
                            <ListItemButton>
                                <ListItemText primary={c.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Popover>
      </div>
    )
}

export default ColumnSelector