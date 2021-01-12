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
import { red, blueGrey, grey } from "@material-ui/core/colors";
import {TableSortLabel} from "@material-ui/core";
import {useCurrentHeight} from "../utils/width";

const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
}))(TableCell);

const useStylesMobile = makeStyles({
    table: {
        maxWidth: '100%',
        maxHeight: '80vh',
    },
    row: {
        maxHeight: '10px',
    },
});

const useStylesDesktop = (height) => makeStyles({
    table: {
        maxWidth: '100%',
        height: 0.85 * height -230,
        backgroundColor: '#1b222b',
    },
})();

const getRowBackgroundColor = (value) => {
    let backgroundColor = blueGrey[900];
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

const getHeaderBackgroundColor = (selected) => {
    // console.log(selected);
    return selected ?
        { backgroundColor: grey[900] } :
        { backgroundColor: '#000' };
};

const BigTooltip = withStyles((theme) => ({
    tooltip: {
        fontSize: 14,
    },
}))(Tooltip);

const HeaderTableCell = (props) => {
    return <TableCell
        align="center"
        style={getHeaderBackgroundColor(props.selected === props.id)}
        onClick={props.onClick(props.id)}
    >
        <BigTooltip title={props.tooltips} placement="top" arrow>
            <div align="center">
                <span>{props.label}</span>
                <TableSortLabel active={props.selected === props.id}/>
            </div>
        </BigTooltip>
    </TableCell>
}

export default function ResultTable({ isMobile, rows, sortFunctions, fields, selected, tooltips, title }) {
    let height = useCurrentHeight();
    const desktopClasses = useStylesDesktop(height);
    const mobileClasses = useStylesMobile();
    const [selectedField, setSelectedField] = React.useState(selected);
    const sortFunction = sortFunctions[selectedField];
    const sortedRows = sortFunction(rows);
    const classes = isMobile
        ? mobileClasses
        : desktopClasses;

    const selectFieldToSort = (field) => () => {
        setSelectedField(field);
    }

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table stickyHeader size="small" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">{title}</StyledTableCell>
                        {fields.map((f, i) => <HeaderTableCell
                            id={i}
                            key={i}
                            label={f.toUpperCase()}
                            onClick={selectFieldToSort}
                            selected={selectedField}
                            tooltips={tooltips[i]}
                        />)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row, i) => (
                        <TableRow key={i} className={classes.row} style={getRowBackgroundColor(row[fields[selectedField]])}>
                            <TableCell className={classes.row} component="th" scope="row" align="left">
                                {capitalize(row.key)}
                            </TableCell>
                            {fields.map((f, i) => <TableCell key={i} align="center">{`${row[f].toFixed(2)}%`}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
