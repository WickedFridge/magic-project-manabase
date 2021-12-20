import React from 'react';
import ResultTable from '../../shared/resultTable';
import styles from './desktopResults.module.scss';

const DesktopResults = ({ spells, lands, sources }) => {
    const spellResultfields = [
        { name: 'Mana Cost', type: 'mana', key: 'manaCost' },
        { name: 'P1', type: 'percentage', key: 'p1' },
        { name: 'P2', type: 'percentage', key: 'p2' },
    ];
    const landsResultFields = [{ name: 'Quality', type: 'percentage', key: 'p1' }];
    const sourcesResultFields = [{ name: 'Count', type: 'number', key: 'count', rowType: 'mana' }];
    const filteredSources = sources.filter(({ count }) => count > 0);

    return (
        <div className={styles.resultsContainer}>
            <div className={styles.leftPanel}>
                <ResultTable
                    fields={spellResultfields}
                    rows={spells}
                    selected={1}
                    title="Spells"
                    tooltips={['Converted Mana cost', 'Assuming you hit all your landdrops', 'True probability']}
                />
            </div>
            <div className={styles.rightPanelContainer}>
                <div className={styles.rightPanel}>
                    <ResultTable
                        fields={landsResultFields}
                        rows={lands}
                        selected={0}
                        title="Lands"
                        tooltips={['Land Quality']}
                    />
                </div>
                <div className={styles.rightPanelSources}>
                    <ResultTable
                        fields={sourcesResultFields}
                        rows={filteredSources}
                        selected={0}
                        title="Sources"
                        tooltips={['Number of sources']}
                    />
                </div>
            </div>
        </div>
    );
};

export default DesktopResults;
