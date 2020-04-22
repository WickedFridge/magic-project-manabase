import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import DecklistInput from "../decklistInput";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import {CircularProgress} from "@material-ui/core";
import ResultTable from "../resultTable";
import MobileSubmitActions from "./mobileSubmitActions";
import HelpText from "../helpText";
import MobileTabs from "./mobileTabs";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
    },
    menu: {
        background: '#323a46',
    },
    indicator: {
        background: 'darkorange',
    },
    selected: {
        color: 'white',
    },
    results: {
        width: '90%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: green[700],
    },
    circular: {
        color: green[700],
    },
}));

export default function MobileBody (props) {
    const classes = useStyles();
    const [index, setIndex] = React.useState(1);

    const handleClickSubmit = callback => () => {
        setIndex(1);
        callback();
    };

    return (
        <div className={classes.root}>
            <MobileTabs
                index={index}
                setIndex={setIndex}
                help={
                    <Box
                        className={classes.background}
                        textAlign="left"
                    >
                        <HelpText/>
                    </Box>
                }
                main={
                    <div>
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
                }
                results={
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
                }
            />
        </div>
    )
}
