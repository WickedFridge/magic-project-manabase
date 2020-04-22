import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    h1: {
        margin: '5px',
    },
    h4: {
        margin: '5px',
    },
}));
export default function MobileHeader() {
    const classes = useStyles();

    return (
        <header className="App-header">
            <h1 className={classes.h1}>Project Manabase</h1>
            <h4 className={classes.h4} ><a href="https://twitter.com/wickedfridge">By Charles Wickham</a></h4>
        </header>
    )
}
