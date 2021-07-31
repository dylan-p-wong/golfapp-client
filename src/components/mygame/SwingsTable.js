import { TablePagination, Autocomplete, DialogActions, Dialog, DialogTitle, DialogContent, TextField, Box, Container, Grid, Card, CardHeader, Button, CardContent, Divider, Typography, Chip, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import { useNavigate } from 'react-router';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useState } from 'react';

const SwingsTable = (props) => {
    const { swings } = props;
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card>
        <CardHeader title="Saved Swings" action={<Button color="primary" variant="contained" size="small" onClick={() => navigate('/app/swing/add', { replace: true })}>Add Swing</Button>}/>
        <CardContent>
        <PerfectScrollbar>
                <Box>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell sortDirection="desc">
                        <Tooltip
                            enterDelay={300}
                            title="Sort"
                        >
                            <TableSortLabel
                            active
                            direction="desc"
                            >
                            Date
                            </TableSortLabel>
                        </Tooltip>
                        </TableCell>
                        <TableCell>
                        Actions
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {swings.slice(page * limit, page * limit + limit).map(item => (
                        <TableRow
                        hover
                        key={item._id}
                        >
                        <TableCell>
                            {moment.unix(item.createdAt / 1000).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => navigate(`/app/swing/${item._id}`, { replace: true })} variant="contained" size="small">View</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={swings.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
            </CardContent>
        </Card>
    )
}

export default SwingsTable;