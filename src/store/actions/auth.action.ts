const APP = '[APP] Authentication';

export const APP_LOGIN_INIT = `${APP} : Login INIT`;

export const APP_LOGIN_SUCCESS = `${APP} : Login Success`;

export const APP_LOGOUT = `${APP} : Logout`;

export const actionAuthInit = (email: string): { type: string, payload: { email: string } } => ({
    type: APP_LOGIN_INIT,
    payload: { email }
});

export const actionAuthSuccess = (): { type: string } => ({
    type: APP_LOGIN_SUCCESS
});

export const actionAuthLogout = (): { type: string } => ({
    type: APP_LOGOUT
});