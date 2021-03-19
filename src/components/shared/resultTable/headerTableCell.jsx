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

const HeaderTableCell = ({ id, label, onClick, selected, tooltips }) => {
    return (
        <TableCell align="center" onClick={onClick(id)} style={getHeaderBackgroundColor(selected === id)}>
            <BigTooltip placement="top" title={tooltips} arrow>
                <div align="center">
                    <span>{label}</span>
                    <TableSortLabel active={selected === id} />
                </div>
            </BigTooltip>
        </TableCell>
    );
};

export default HeaderTableCell;
