/**
 * ## Workflow interface
 */
export interface Workflow {
    [key: string]: string | number | Nodes[];
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
    nodes: Nodes[];
}
/**
 * ## Sub node of a Workflow interface
 * 
 */
export interface Nodes {
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
    status: 0 | 1 | 2;

}