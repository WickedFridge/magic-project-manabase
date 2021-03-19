import Grid from '@material-ui/core/Grid';
import React from 'react';
import ResultTable from '../shared/resultTable/index';

const DesktopResults = ({ spells, lands }) => {
    const spellResultfields = [
        { name: 'Mana Cost', type: 'text', key: 'manaCost' },
        { name: 'P1', type: 'number', key: 'p1' },
        { name: 'P2', type: 'number', key: 'p2' },
    ];
    const landsResultFields = [{ name: 'Quality', type: 'number', key: 'p1' }];

    return (
        <Grid alignItems="center" justify="center" spacing={2} container>
            <Grid xs={8} item>
                <ResultTable
                    fields={spellResultfields}
                    isMobile={false}
                    rows={spells}
                    selected={1}
                    title="Spells"
                    tooltips={['Converted Mana cost', 'Assuming you hit all your landdrops', 'True probability']}
                />
            </Grid>
            <Grid xs={4} item>
                <ResultTable
                    fields={landsResultFields}
                    isMobile={false}
                    rows={lands}
                    selected={0}
                    title="Lands"
                    tooltips={['Land Quality']}
                />
            </Grid>
        </Grid>
    );
};

export default DesktopResults;
