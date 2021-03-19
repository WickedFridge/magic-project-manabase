import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ManaWhite from '../../../images/mana/colored/white.svg';
import ManaBlue from '../../../images/mana/colored/blue.svg';
import ManaBlack from '../../../images/mana/colored/black.svg';
import ManaRed from '../../../images/mana/colored/red.svg';
import ManaGreen from '../../../images/mana/colored/green.svg';
import ManaBG from '../../../images/mana/colored/hybrid/bg.svg';
import ManaBR from '../../../images/mana/colored/hybrid/br.svg';
import ManaGU from '../../../images/mana/colored/hybrid/gu.svg';
import ManaGW from '../../../images/mana/colored/hybrid/gw.svg';
import ManaRG from '../../../images/mana/colored/hybrid/rg.svg';
import ManaRW from '../../../images/mana/colored/hybrid/rw.svg';
import ManaUB from '../../../images/mana/colored/hybrid/ub.svg';
import ManaUR from '../../../images/mana/colored/hybrid/ur.svg';
import ManaWB from '../../../images/mana/colored/hybrid/wb.svg';
import ManaWU from '../../../images/mana/colored/hybrid/wu.svg';
import ManaSnow from '../../../images/mana/colored/snow.svg';
import ManaX from '../../../images/mana/generic/x.svg';
import ManaZero from '../../../images/mana/generic/0.svg';
import ManaOne from '../../../images/mana/generic/1.svg';
import ManaTwo from '../../../images/mana/generic/2.svg';
import ManaThree from '../../../images/mana/generic/3.svg';
import ManaFour from '../../../images/mana/generic/4.svg';
import ManaFive from '../../../images/mana/generic/5.svg';
import ManaSix from '../../../images/mana/generic/6.svg';
import ManaSeven from '../../../images/mana/generic/7.svg';
import ManaEight from '../../../images/mana/generic/8.svg';
import ManaNine from '../../../images/mana/generic/9.svg';
import ManaTen from '../../../images/mana/generic/10.svg';
import ManaEleven from '../../../images/mana/generic/11.svg';
import ManaTwelve from '../../../images/mana/generic/12.svg';
import ManaThirteen from '../../../images/mana/generic/13.svg';
import ManaFifteen from '../../../images/mana/generic/15.svg';

const classes = makeStyles({
    manaSymbol: {
        height: '18px',
        margin: '0px 1px',
    },
});

const images = {
    '{W}': ManaWhite,
    '{U}': ManaBlue,
    '{B}': ManaBlack,
    '{R}': ManaRed,
    '{G}': ManaGreen,
    '{B/G}': ManaBG,
    '{B/R}': ManaBR,
    '{G/U}': ManaGU,
    '{G/W}': ManaGW,
    '{R/G}': ManaRG,
    '{R/W}': ManaRW,
    '{U/B}': ManaUB,
    '{U/R}': ManaUR,
    '{W/B}': ManaWB,
    '{W/U}': ManaWU,
    '{S}': ManaSnow,
    '{X}': ManaX,
    '{0}': ManaZero,
    '{1}': ManaOne,
    '{2}': ManaTwo,
    '{3}': ManaThree,
    '{4}': ManaFour,
    '{5}': ManaFive,
    '{6}': ManaSix,
    '{7}': ManaSeven,
    '{8}': ManaEight,
    '{9}': ManaNine,
    '{10}': ManaTen,
    '{11}': ManaEleven,
    '{12}': ManaTwelve,
    '{13}': ManaThirteen,
    '{15}': ManaFifteen,
};

const ManaSymbol = ({ color }) => {
    const styles = classes();
    const image = images[color] || images['{X}'];

    return <img alt={color} className={styles.manaSymbol} src={image} />;
};

const ResultCell = ({ row, field }) => {
    let content = row[field.key];

    if (field.type === 'number') {
        content = `${content.toFixed(2)}%`;
    }
    if (field.type === 'text') {
        const manaSymbols = content.match(/({\w(\/\w)?})/g);
        content = (
            <div>
                {manaSymbols.map((mana) => (
                    <ManaSymbol color={mana} />
                ))}
            </div>
        );
    }

    return <TableCell align="center">{content}</TableCell>;
};

export default ResultCell;
