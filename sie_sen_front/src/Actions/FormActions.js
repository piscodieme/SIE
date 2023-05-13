import * as types from './ActionsConstante';

export function OpenForm (){
    return dispatch =>{
        dispatch(openAction());
    }
}

export function CloseForm (){
    return dispatch =>{
        dispatch(closeAction());
    }
}

export const closeAction = {
    type: types.CLOSE_SUCCESS,
};

export const openAction = {
    type: types.OPEN_SUCCESS,
}