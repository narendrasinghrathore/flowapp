import { AppState, Workflow, FlowState } from "../../models/Workflow";

const getFlowState = (state: AppState): FlowState => state.flow;

export const getAppLoggedIn = (state: AppState): boolean => getFlowState(state).loggedIn;

export const getAppLoading = (state: AppState): boolean => getFlowState(state).loading;

export const getWorkflowList = (state: AppState): Workflow[] => getFlowState(state).list;

export const getFlowLoadingState = (state: AppState): boolean => getFlowState(state).loading;

export const getSelectedWorkFlow = (state: AppState, id: string): Workflow | undefined => id ? getFlowState(state).list.find(item => item.id === id) : undefined;