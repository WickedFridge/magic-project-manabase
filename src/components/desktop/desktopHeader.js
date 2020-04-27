import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    h1: {
        margin: '0.5em',
    },
    h4: {
        margin: '0.5em',
    },
}));
export default function DesktopHeader() {
    const classes = useStyles();

    return (
        <header className="App-header">
            <h1 className={classes.h1}>Project Manabase</h1>
            <h4 className={classes.h4} ><a href="https://twitter.com/wickedfridge">By Charles Wickham</a></h4>
        </header>
    )
}
