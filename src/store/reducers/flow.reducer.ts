
import uid from 'uid';
import { Workflow, FlowState } from '../../models/Workflow';
import { APP_ADD_WORKFLOW, APP_UPDATE_WORKFLOW, APP_DELETE_WORKFLOW, APP_LOGIN_INIT, APP_LOGIN_SUCCESS, APP_LOGOUT } from '../actions/auth.action';

/**
 * Initial State
 */
const initialState: FlowState = {
    loading: false,
    loggedIn: false,
    list: [{
        id: uid(),
        nodes: [{
            content: `Firebase gives you functionality like analytics, 
            databases, messaging and crash reporting so you can move quickly
             and focus on your users.`,
            id: uid(),
            status: 0,
            title: 'Build apps fast, without managing infrastructure'
        },
        {
            content: `Firebase is built on Google infrastructure and 
            scales automatically, for even the largest apps..`,
            id: uid(),
            status: 1,
            title: 'Backed by Google, trusted by top apps'
        },
        {
            content: `Give users a simple, secure way to sign into your app, then monitor the onboarding process and find ways to improve it`,
            id: uid(),
            status: 2,
            title: 'Create a great onboarding flow'
        },
        {
            content: `Implement a user-friendly chat feature, so that your users can chat with each other in realtime without leaving your app..`,
            id: uid(),
            status: 2,
            title: 'Add chat to your app'
        }],
        status: 1,
        title: 'Firebase Actions'
    },
    {
        id: uid(),
        nodes: [
            {
                content: `Firebase products work great individually 
                but share data and insights, so they work even better together.`,
                id: uid(),
                status: 2,
                title: 'One platform, with products that work better together'
            },
            {
                content: `Before releasing a new feature, test it on a subset of your user base to see how it works and how they respond.`,
                id: uid(),
                status: 2,
                title: 'Progressively roll out new features'
            },],
        status: 1,
        title: 'Netifly Actions'
    },
    {
        id: uid(),
        nodes: [

            {
                content: `Firebase products work great individually 
            but share data and insights, so they work even better together.`,
                id: uid(),
                status: 2,
                title: 'One platform, with products that work better together'
            },
            {
                content: `Before releasing a new feature, test it on a subset of your user base to see how it works and how they respond.`,
                id: uid(),
                status: 2,
                title: 'Progressively roll out new features'
            },
        ],
        status: 1,
        title: 'Jenkin Actions'
    }]
};

const flowReducer = (state: FlowState = initialState, action: { type: string, payload: Workflow }): FlowState => {
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
            const list: Workflow[] = JSON.parse(JSON.stringify(state.list));
            const index = list.findIndex(item => item.id === data.id);
            if (index > -1) list[index] = data;
            return { ...state, list };
        }

        case APP_DELETE_WORKFLOW: {
            const data: Workflow = action.payload;
            const list: Workflow[] = JSON.parse(JSON.stringify(state.list));
            const index = list.findIndex(item => item.id === data.id);
            if (index > -1) list.splice(index, 1);
            return { ...state, list };
        }

        default:
            return { ...state };
    }


};

export { flowReducer };