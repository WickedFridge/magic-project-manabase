import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from "@material-ui/core/Tooltip";
import Paper from '@material-ui/core/Paper';
import { red, blueGrey } from "@material-ui/core/colors";
import {defaultDecklist} from "../data/defaultInputs";

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

const useStylesMobile = makeStyles({
    table: {
        maxWidth: '100%',
        maxHeight: '80vh',
    },
    row: {
        maxHeight: '10px',
    },
});

const useStylesDesktop = makeStyles({
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
    if (val < 60) {
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

const BigTooltip = withStyles((theme) => ({
    tooltip: {
        fontSize: 14,
    },
}))(Tooltip);

export default function ResultTable(props) {
    const desktopClasses = useStylesDesktop();
    const mobileClasses = useStylesMobile();
    const sortFunctions = props.sort;
    const fields = ['p2', 'p1'];
    const [selectedField, setSelectedField] = React.useState(0);
    const sortFunction = sortFunctions[selectedField];
    const sortedRows = sortFunction(props.rows);
    const classes = props.isMobile
        ? mobileClasses
        : desktopClasses;

    const selectFieldToSort = (field) => () => {
        setSelectedField(field);
    }

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table size="small" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Card</StyledTableCell>
                        <BigTooltip title="Assuming you hit all your landdrops" placement="top" arrow>
                            <StyledTableCell align="center" onClick={selectFieldToSort(0)}>P1</StyledTableCell>
                        </BigTooltip>
                        <BigTooltip title="True probability" placement="top" arrow>
                            <StyledTableCell align="center" onClick={selectFieldToSort(1)}>P2</StyledTableCell>
                        </BigTooltip>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.data}>
                    {sortedRows.map((row) => (
                        <StyledTableRow className={classes.row} key={row.key} style={getBackgroundColor(row[fields[selectedField]])}>
                            <StyledTableCell className={classes.row} component="th" scope="row" align="left">
                                {row.key}
                            </StyledTableCell>
                            <StyledTableCell align="center">{`${row.p1.toFixed(2)}%`}</StyledTableCell>
                            <StyledTableCell align="center">{`${row.p2.toFixed(2)}%`}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
