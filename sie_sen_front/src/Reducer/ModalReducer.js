import { fromJS, List, Map } from 'immutable';
import {
    CLOSE_SUCCESS,
    OPEN_SUCCESS,
} from '../Actions/ActionsConstante';

const initialState = {
    showAddSite : false,
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}){
    switch (action.type) {
        case OPEN_SUCCESS:
            return state.set('showAddSite', true);
        case CLOSE_SUCCESS:
            return state.set('showAddSite', false);
        
    }
}