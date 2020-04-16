import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import DecklistInput from "../decklistInput";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import {CircularProgress} from "@material-ui/core";
import ResultTable from "../resultTable";
import Paper from "@material-ui/core/Paper";
import MobileSubmitActions from "./mobileSubmitActions";
import SubmitButton from "../desktop/submitButton";
import XSlider from "../xSlider";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
    },
    slide1: {
        padding: 15,
        minHeight: 100,
    },
    slide2: {
        // padding: 15,
        // minHeight: 100,
    },
    results: {
        width: '90%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: green[700],
    },
    circular: {
        color: green[700],
    }
}));

export default function MobileBody (props) {
    const classes = useStyles();
    const [index, setIndex] = React.useState(0);

    const handleChangeIndex = index => {
        setIndex(index)
    };

    const handleClickSubmit = callback => () => {
        setIndex(1);
        callback();
    };

    return (
        <div className={classes.root}>
            <SwipeableViews
                index={index}
                onChangeIndex={handleChangeIndex}
            >
                <div className={classes.slide1}>
                    <DecklistInput
                        isMobile
                        value={props.decklist}
                        onChange={props.handleDecklistChange}
                    />
                    <MobileSubmitActions
                        onClick={handleClickSubmit(props.handleClickSubmit)}
                        disabled={props.loading}
                        xValue={props.xValue}
                        handleChangeXValue={props.handleChangeXValue}
                    />
                </div>
                <div className={classes.slide2}>
                    <Box
                        className={classes.results}
                        display="flex"
                        alignItems="center"
                    >
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            { props.loading ?
                                <Fade
                                    in={props.loading}
                                    style={{
                                        transitionDelay: '500ms',
                                    }}
                                    unmountOnExit
                                >
                                    <CircularProgress
                                        className={classes.circular}
                                        size={100}
                                        thickness={2}
                                    />
                                </Fade> :
                                <Fade
                                    in={!props.loading}
                                    unmountOnExit
                                    style={{
                                        transitionDelay: '500ms',
                                    }}
                                >
                                    <ResultTable
                                        isMobile={true}
                                        rows={props.rows}
                                    />
                                </Fade>
                            }
                        </Grid>
                    </Box>
                </div>
            </SwipeableViews>
        </div>
    )
}
