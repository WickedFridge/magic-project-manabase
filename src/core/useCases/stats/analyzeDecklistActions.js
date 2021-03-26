import { setLoading } from '../input/setInputActions';
import { setErrorMessage, setOpen, setQuerySuccess } from '../popup/setPopupActions';
import { setLands, setSpells } from './setStatsActions';

const analyzeDecklistAction = (statsFetcher, data) => () => async (dispatch, getState, { backendUrl }) => {
    dispatch(setLoading(true));

    console.info(data);
    try {
        const response = await statsFetcher(backendUrl, data);
        dispatch(setLoading(false));
        dispatch(setOpen(true));
        dispatch(setQuerySuccess(true));
        dispatch(setSpells(response.spells));
        dispatch(setLands(response.lands));
    } catch (e) {
        dispatch(setLoading(false));
        dispatch(setOpen(true));
        dispatch(setQuerySuccess(false));
        dispatch(setErrorMessage(e.error));
    }
};

export default analyzeDecklistAction;
