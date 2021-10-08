import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { red, blueGrey } from '@material-ui/core/colors';
import { useCurrentHeight, useCurrentWitdh } from '../../../utils/width';
import HeaderTableCell from './headerTableCell';
import ResultCell from './resultCell';

const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

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

const useStylesDesktop = (height) =>
    makeStyles({
        table: {
            maxWidth: '100%',
            maxHeight: 0.85 * height - 130,
            backgroundColor: '#1b222b',
            overflow: 'auto',
        },
    })();

const getRowBackgroundColor = (value) => {
    let backgroundColor = blueGrey[900];
    const val = parseInt(value, 10);
    if (val < 60) {
        return { backgroundColor: red[800] };
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
        backgroundColor,
    };
};

const getSortFunctions = (fields) => {
    return fields.map((field) => (data) => data.sort((s1, s2) => s1[field.key] - s2[field.key]));
};

const ResultTable = ({ rows, fields, selected, tooltips, title }) => {
    const [height] = useCurrentHeight();
    const [, isMobile] = useCurrentWitdh();
    const desktopClasses = useStylesDesktop(height);
    const mobileClasses = useStylesMobile();
    const sortFunctions = getSortFunctions(fields);
    const [selectedField, setSelectedField] = React.useState(selected);
    const sortFunction = sortFunctions[selectedField];
    const sortedRows = sortFunction(rows);
    const classes = isMobile ? mobileClasses : desktopClasses;

    const selectFieldToSort = (field) => () => {
        setSelectedField(field);
    };

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="customized table" size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">{title}</StyledTableCell>
                        {fields.map((f, i) => (
                            <HeaderTableCell
                                key={i}
                                id={i}
                                label={capitalize(f.name)}
                                onClick={selectFieldToSort}
                                selected={selectedField}
                                tooltips={tooltips[i]}
                            />
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row, i) => (
                        <TableRow
                            key={i}
                            className={classes.row}
                            style={getRowBackgroundColor(row[fields[selectedField].key])}
                        >
                            <TableCell align="left" className={classes.row} component="th" scope="row">
                                {capitalize(row.key)}
                            </TableCell>
                            {fields.map((field, i) => (
                                <ResultCell key={i} field={field} row={row} />
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ResultTable;
