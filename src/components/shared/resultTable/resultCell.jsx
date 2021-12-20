import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { v4 } from 'uuid';
import ManaSymbol from '../manaSymbol/manaSymbol';

const ResultCell = ({ row, field }) => {
    let content = row[field.key];

    if (field.type === 'number') {
        // do nothing
    }
    if (field.type === 'percentage') {
        content = `${content.toFixed(2)}%`;
    }
    if (field.type === 'mana') {
        const manaSymbols = content.match(/({\w(\/\w)?})/g);
        content = (
            <div>
                {manaSymbols.map((mana) => (
                    <ManaSymbol key={v4()} color={mana} />
                ))}
            </div>
        );
    }

    return <TableCell align="center">{content}</TableCell>;
};

export default ResultCell;
