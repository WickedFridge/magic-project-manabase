import TableCell from '@material-ui/core/TableCell';
import { TableSortLabel } from '@material-ui/core';
import React from 'react';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const getHeaderBackgroundColor = (selected) => {
    return selected ? { backgroundColor: grey[900] } : { backgroundColor: '#000' };
};

const BigTooltip = withStyles(() => ({
    tooltip: {
        fontSize: 14,
    },
}))(Tooltip);

const HeaderTableCell = (props) => {
    return (
        <TableCell
            align="center"
            style={getHeaderBackgroundColor(props.selected === props.id)}
            onClick={props.onClick(props.id)}
        >
            <BigTooltip title={props.tooltips} placement="top" arrow>
                <div align="center">
                    <span>{props.label}</span>
                    <TableSortLabel active={props.selected === props.id} />
                </div>
            </BigTooltip>
        </TableCell>
    );
};

export default HeaderTableCell;
