import { Paper, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Skeleton, TableFooter, TablePagination, TableSortLabel } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { AppState, Sort, User } from '../types'
import { columns } from './ColumnSelector'
import { useSelector } from 'react-redux'
import PreviewUser from './PreviewUser'

type Props = {
    rows: Array<User>
    loading?: boolean
    totalCount: number
    onChangePage: (newPage: number) => void
    onChangeRowsPerPage: (rows: number) => void
    onSort: (column: keyof User, currDir: 'asc' | 'desc') => void
    rowsPerPage: number
    page: number
    sortOrder?: Sort
}

function PagingTable({onSort, sortOrder, rows, loading, onChangePage, onChangeRowsPerPage, totalCount, rowsPerPage, page}: Props) {
    const { activeColumns } = useSelector((state: AppState) => state.column)
    const [togglePreview, setTogglePreview] = useState(false)
    const [user, setUser] = useState<User>({} as any)


    const handleChangePage = useCallback((_, newPage: number) => {
        onChangePage(newPage)
    }, [onChangePage])
  
    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      onChangePage(0)
      onChangeRowsPerPage(+event.target.value)
    }, [])

    const arrayColumns = Object.values(columns).filter(c => activeColumns.includes(c.id))

    return (
        <>
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            {arrayColumns.map((column) => {
                                const isActive = sortOrder?.columns.includes(column.id)
                                const getIndex = sortOrder?.columns.indexOf(column.id) ?? -1
                                const getDir = getIndex > -1 ? sortOrder?.directions[getIndex] : 'asc'
                                return (
                                <TableCell key={column.id} align={column.align}>
                                    <TableSortLabel
                                        active={isActive}
                                        direction={getDir}
                                        onClick={() => onSort(column.id, getDir!)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            )})}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {loading ? 
                        Array.from({ length: 10 }).map((_, index) => (
                            <TableRow key={index}>
                                {arrayColumns.map((_, i) => (
                                    <TableCell key={i}>
                                        <Skeleton animation="wave" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    : (rows).map((row) => (
                        <TableRow key={row.seq} onClick={() => {setUser(row); setTogglePreview(true)}}>
                            {arrayColumns.map((column) => (
                                <TableCell key={`${column.id}-${row.seq}`}>
                                    {row[column.id]}
                                </TableCell>
                            ))}
                        </TableRow>
                        ))
                    }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={arrayColumns.length}
                                count={totalCount}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <PreviewUser
                open={togglePreview}
                onClose={() => setTogglePreview(false)}
                user={user}
            />
        </>
    )
}

export default PagingTable