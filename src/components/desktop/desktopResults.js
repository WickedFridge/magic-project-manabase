import Grid from "@material-ui/core/Grid";
import ResultTable from "../resultTable";
import React from "react";

export default function DesktopResults({ spells, lands, sort}) {

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={8}>
                <ResultTable
                    title="Spells"
                    isMobile={false}
                    rows={spells}
                    sortFunctions={sort}
                    fields={['p1', 'p2']}
                    tooltips={[
                        'Assuming you hit all your landdrops',
                        'True probability',
                    ]}
                    selected={1}
                />
            </Grid>
            <Grid item xs={4}>
                <ResultTable
                    title="Lands"
                    isMobile={false}
                    rows={lands}
                    sortFunctions={sort}
                    fields={['p1']}
                    tooltips={[
                        'Land Quality',
                    ]}
                    selected={0}
                />
            </Grid>
        </Grid>
    )
}
