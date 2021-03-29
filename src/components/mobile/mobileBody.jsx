import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import { CircularProgress } from '@material-ui/core';
import DecklistInput from '../shared/decklistInput';
import ResultTable from '../shared/resultTable/index';
import HelpText from '../shared/helpText';
import MobileSubmitActions from './mobileSubmitActions';
import MobileTabs from './mobileTabs';
import { useSelector } from 'react-redux';
import { landsSelector, spellsSelector } from '../../core/useCases/stats/selector';
import { loadingSelector } from '../../core/useCases/input/selector';

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
        padding: theme.spacing(2),
        textAlign: 'center',
        color: green[700],
    },
    circular: {
        color: green[700],
    },
}));

const HelpTab = ({ classes }) => (
    <Box className={classes.background} textAlign="left">
        <HelpText />
    </Box>
);

const LandResults = ({ classes, lands, landsResultFields, loading }) => (
    <Box alignItems="center" className={classes.results} display="flex">
        <Grid alignItems="center" direction="column" justify="center" container>
            {loading ? (
                <Fade
                    in={loading}
                    style={{
                        transitionDelay: '500ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress className={classes.circular} size={100} thickness={2} />
                </Fade>
            ) : (
                <Fade
                    in={!loading}
                    style={{
                        transitionDelay: '500ms',
                    }}
                    unmountOnExit
                >
                    <ResultTable
                        fields={landsResultFields}
                        rows={lands}
                        selected={0}
                        title="Lands"
                        tooltips={['Land Quality']}
                    />
                </Fade>
            )}
        </Grid>
    </Box>
);

const SpellResults = ({ classes, loading, spellResultfields, spells }) => (
    <Box alignItems="center" className={classes.results} display="flex">
        <Grid alignItems="center" direction="column" justify="center" container>
            {loading ? (
                <Fade
                    in={loading}
                    style={{
                        transitionDelay: '500ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress className={classes.circular} size={100} thickness={2} />
                </Fade>
            ) : (
                <Fade
                    in={!loading}
                    style={{
                        transitionDelay: '500ms',
                    }}
                    unmountOnExit
                >
                    <ResultTable
                        fields={spellResultfields}
                        rows={spells}
                        selected={1}
                        title="Spells"
                        tooltips={['Assuming you hit all your landdrops', 'True probability']}
                    />
                </Fade>
            )}
        </Grid>
    </Box>
);

const MainTab = ({ onClick }) => (
    <div>
        <DecklistInput />
        <MobileSubmitActions onClick={onClick} />
    </div>
);

const MobileBody = () => {
    const classes = useStyles();
    const spells = useSelector(spellsSelector);
    const lands = useSelector(landsSelector);
    const loading = useSelector(loadingSelector);
    const [index, setIndex] = React.useState(1);
    const spellResultfields = [
        { name: 'Cost', type: 'text', key: 'manaCost' },
        { name: 'P1', type: 'number', key: 'p1' },
        { name: 'P2', type: 'number', key: 'p2' },
    ];
    const landsResultFields = [{ name: 'Quality', type: 'number', key: 'p1' }];

    const onClick = () => {
        setIndex(2);
    };

    return (
        <div className={classes.root}>
            <MobileTabs
                help={<HelpTab classes={classes} />}
                index={index}
                landResults={
                    <LandResults
                        classes={classes}
                        lands={lands}
                        landsResultFields={landsResultFields}
                        loading={loading}
                    />
                }
                main={<MainTab onClick={onClick} />}
                setIndex={setIndex}
                spellResults={
                    <SpellResults
                        classes={classes}
                        loading={loading}
                        spellResultfields={spellResultfields}
                        spells={spells}
                    />
                }
            />
        </div>
    );
};

export default MobileBody;
