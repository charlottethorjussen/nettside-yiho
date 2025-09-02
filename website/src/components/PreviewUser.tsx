import React from "react"
import { Box, Drawer, Typography } from "@mui/material"
import { User } from "../types"

type Props = {
    open: boolean
    onClose: () => void
    user: User
}

function PreviewUser({
    open,
    onClose,
    user
}: Props) {

    

    return (
        <Drawer
            anchor={'right'}
            open={open}
            onClose={onClose}
        >
            <Box display='flex' flexDirection='column' width={300} p={2} gap={1.5}>
            <Typography>
                <strong>Full Name:</strong><br/> {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography>
                <strong>Age:</strong><br/> {`${user.age}`}
            </Typography>
            <Typography>
                <strong>Address:</strong><br/> {`${user.street}`} <br/> {`${user.city}, ${user.state}`}
            </Typography>
            <Typography>
                <strong>Coordinates:</strong><br/> {`${user.longitude}, ${user.latitude}`}
            </Typography>
            </Box>
        </Drawer>
    )
}

export default PreviewUser