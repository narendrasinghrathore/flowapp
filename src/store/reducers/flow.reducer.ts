
import uid from 'uid';
import { Workflow, AppState } from '../../models/Workflow';
import { APP_ADD_WORKFLOW, APP_UPDATE_WORKFLOW, APP_DELETE_WORKFLOW, APP_LOGIN_INIT, APP_LOGIN_SUCCESS, APP_LOGOUT } from '../actions/auth.action';

/**
 * Initial State
 */
const initialState: AppState = {
    loading: false,
    loggedIn: false,
    list: [{
        id: uid(),
        nodes: [],
        status: 1,
        title: 'Firebase Actions'
    },
    {
        id: uid(),
        nodes: [],
        status: 1,
        title: 'Netifly Actions'
    },
    {
        id: uid(),
        nodes: [],
        status: 0,
        title: 'Jenkin Actions'
    }]
};

const flowReducer = (state: AppState = initialState, action: { type: string, payload: Workflow }): AppState => {
    switch (action.type) {

        case APP_LOGIN_INIT: {

            return { ...state, loading: true };
        }

        case APP_LOGIN_SUCCESS: {

            return { ...state, loading: false, loggedIn: true }
        }

        case APP_LOGOUT: {

            return { ...state, loggedIn: false, }

        }

        case APP_ADD_WORKFLOW: {
            const data: Workflow = action.payload;
            const list: Workflow[] = JSON.parse(JSON.stringify(state.list));
            list.push(data);
            return { ...state, list };
        }

        case APP_UPDATE_WORKFLOW: {
            const data: Workflow = action.payload;
            const list: Workflow[] = JSON.parse(JSON.stringify(state));
            const index = list.findIndex(item => item.id === data.id);
            if (index > -1) list[index] = data;
            return { ...state, list };
        }

        case APP_DELETE_WORKFLOW: {
            const data: Workflow = action.payload;
            const list: Workflow[] = JSON.parse(JSON.stringify(state));
            const index = list.findIndex(item => item.id === data.id);
            if (index > -1) list.splice(index, 1);
            return { ...state, list };
        }

        default:
            return { ...state };
    }


};

export { flowReducer };