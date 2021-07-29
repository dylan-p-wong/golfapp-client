import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const messages = [
    {
        firstname: 'dylan',
        lastname: 'wong',
        message: 'testing message',
        _id: '098324d',
        status: 'opened'
    },
    {
        firstname: 'dylan',
        lastname: 'wong',
        message: 'testing message',
        _id: '098324d',
        status: 'opened'
    },
    {
        firstname: 'dylan',
        lastname: 'wong',
        message: 'testing message',
        _id: '098324d',
        status: 'opened'
    },
    ,
    {
        firstname: 'dylan',
        lastname: 'wong',
        message: 'testing message',
        _id: '098324d',
        status: 'not opened'
    }
]

const Messages = (props) => (
  <Card {...props}>
    <CardHeader title="Latest Messages" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                User
              </TableCell>
              <TableCell>
                Message
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
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                hover
                key={message._id}
              >
                <TableCell>
                  {message.firstname + " " + message.lastname}
                </TableCell>
                <TableCell>
                    {message.message}
                </TableCell>
                <TableCell>
                  {moment(message.createdAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  <Chip
                    color="primary"
                    label={message.status}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);

export default Messages;
