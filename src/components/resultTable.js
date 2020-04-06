import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { red, blueGrey } from "@material-ui/core/colors";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 13,
        color: theme.palette.grey,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        maxWidth: '70%',
        maxHeight: 400,
    },
    row: {
        maxHeight: '10px',
    },
});

const getBackgroundColor = (value) => {
    let backgroundColor;
    const val = parseInt(value);
    if (val < 50) {
        return { backgroundColor : red[800] };
    }
    [
        [60, blueGrey[300]],
        [70, blueGrey[400]],
        [75, blueGrey[500]],
        [80, blueGrey[600]],
        [85, blueGrey[700]],
        [90, blueGrey[800]],
        [95, blueGrey[900]],
    ].forEach(([threshold, color]) => {
        if (val >= threshold) {
            backgroundColor = color;
        }
    });
    return {
        backgroundColor
    };
};

export default function ResultTable(props) {
    const classes = useStyles();

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table size="small" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Card</StyledTableCell>
                        <StyledTableCell align="center">Ratio</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.data}>
                    {props.rows.map((row) => (
                        <StyledTableRow className={classes.row} key={row.key} style={getBackgroundColor(row.ratio)}>
                            <StyledTableCell className={classes.row} component="th" scope="row" align="left">
                                {row.key}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.ratio}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
