import { useSelector } from 'react-redux';
import React from 'react';
import DesktopResults from '../../results/desktopResults';
import SubmitSection from '../../submit/submitSection';
import DecklistInput from '../../../shared/decklistInput';
import { landsSelector, sourcesSelector, spellsSelector } from '../../../../core/useCases/stats/selector';
import { loadingSelector } from '../../../../core/useCases/input/selector';
import LoadingScreen from '../../../shared/loadingScreen/LoadingScreen';
import CustomPaper from '../../../shared/customPaper/CustomPaper';
import styles from './mainTab.module.scss';

const MainTab = () => {
    const loading = useSelector(loadingSelector);
    const spells = useSelector(spellsSelector);
    const lands = useSelector(landsSelector);
    const sources = useSelector(sourcesSelector);

    return (
        <CustomPaper>
            <div className={styles.mainTab}>
                <div className={styles.inputPanel}>
                    <DecklistInput />
                    <SubmitSection />
                </div>
                <div className={styles.resultsPanel}>
                    <LoadingScreen loading={loading}>
                        <DesktopResults lands={lands} sources={sources} spells={spells} />
                    </LoadingScreen>
                </div>
            </div>
        </CustomPaper>
    );
};

export default MainTab;
