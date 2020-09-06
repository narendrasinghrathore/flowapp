import { Workflow } from "../../models/Workflow";

const APP = '[APP] Authentication';

const APP_LOGIN_INIT = `${APP} : Login INIT`;

const APP_LOGIN_SUCCESS = `${APP} : Login Success`;

const APP_LOGOUT = `${APP} : Logout`;

const APP_ADD_WORKFLOW = `${APP} : Add Workflow`;

const APP_UPDATE_WORKFLOW = `${APP} : Add Update Workflow`;

const APP_DELETE_WORKFLOW = `${APP} : Add Delete Workflow`;


const actionAuthInit = (email: string): { type: string, payload: { email: string } } => ({
    type: APP_LOGIN_INIT,
    payload: { email }
});

const actionAuthSuccess = (): { type: string } => ({
    type: APP_LOGIN_SUCCESS
});

const actionAuthLogout = (): { type: string } => ({
    type: APP_LOGOUT
});


const actionAddWorkflow = (payload: Workflow): { type: string, payload: Workflow } => ({
    type: APP_ADD_WORKFLOW,
    payload
});



const actionUpdateWorkflow = (payload: Workflow): { type: string, payload: Workflow } => ({
    type: APP_UPDATE_WORKFLOW,
    payload
});


const actionDeleteWorkflow = (payload: Workflow): { type: string, payload: Workflow } => ({
    type: APP_DELETE_WORKFLOW,
    payload
});


export {
    APP_LOGIN_INIT,
    APP_LOGIN_SUCCESS,
    APP_LOGOUT,
    APP_ADD_WORKFLOW,
    APP_UPDATE_WORKFLOW,
    APP_DELETE_WORKFLOW,
    actionAuthInit,
    actionAuthSuccess,
    actionAuthLogout,
    actionAddWorkflow,
    actionUpdateWorkflow,
    actionDeleteWorkflow
}
