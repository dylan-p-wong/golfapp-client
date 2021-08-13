import { TablePagination, Box, Button, Card, CardContent, CardHeader, Chip, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LessonsTable = (props) => {
    const { lessons } = props;
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
            <CardHeader title="Lessons"/>
            <CardContent>
            <PerfectScrollbar>
                <Box>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>
                        Coach
                        </TableCell>
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
                    {lessons.slice(page * limit, page * limit + limit).map(item => (
                        <TableRow
                        hover
                        key={item._id}
                        >
                        <TableCell>
                            {item.coach.firstname + " " + item.coach.lastname}
                        </TableCell>
                        <TableCell>
                            {moment.unix(item.createdAt / 1000).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => navigate(`/app/lesson/${item._id}`, { replace: true })} variant="contained" size="small">View</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={lessons.length}
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

export default LessonsTable;