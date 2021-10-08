import React from 'react';
import ResultTable from '../../shared/resultTable';
import styles from './desktopResults.module.scss';

const DesktopResults = ({ spells, lands }) => {
    const spellResultfields = [
        { name: 'Mana Cost', type: 'text', key: 'manaCost' },
        { name: 'P1', type: 'number', key: 'p1' },
        { name: 'P2', type: 'number', key: 'p2' },
    ];
    const landsResultFields = [{ name: 'Quality', type: 'number', key: 'p1' }];

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
            </div>
        </div>
    );
};

export default DesktopResults;
