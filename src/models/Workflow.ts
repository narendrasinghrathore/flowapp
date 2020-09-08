export interface AppState {
    flow: FlowState
}

/**
 * ## Flow state
 */
export interface FlowState {
    loading: boolean;
    loggedIn: boolean;
    list: Workflow[];
}

/**
 * ## Workflow interface
 */
export interface Workflow {
    [key: string]: string | number | IWorkflowNode[];
    /**
     * ### Workflow unique ID
     * @type {string}
     */
    id: string;
    /**
     * ### Workflow title
     * @type {string}
     */
    title: string;
    /**
     * ### Description
     * status can only have two states
     * 1. 0 for completed
     * 2. 1 for pending
     * @type {number}
     */
    status: 0 | 1;
    /**
     * ### Nodes array
     */
    nodes: IWorkflowNode[];
}
/**
 * ## Sub node of a Workflow interface
 * 
 */
export interface IWorkflowNode {
    [key: string]: string | number;
    /**
     * ID
     */
    id: string
    /**
     * Title
     */
    title: string;
    /**
     * Content
     */
    content: string;
    /**
     * Status of Node
     * 1. 0 is for complete
     * 2. 1 is pending
     * 3. 2 is progress
     */
    status: WorkflowNodeStatus;

}

export enum WorkflowNodeStatus {
    complete = 0,
    progress = 1,
    pending = 2
} 