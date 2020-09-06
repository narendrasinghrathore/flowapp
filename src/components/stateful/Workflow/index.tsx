import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState, WorkflowNode, Workflow } from '../../../models/Workflow';
import { getSelectedWorkFlow } from '../../../store/selectors/flow.selector';
import WorkFlowNode from '../../stateless/WorkflowNode';
import uid from 'uid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';



const WorkFlowComponent = React.memo(() => {


    const { id }: { id: string } = useParams();

    let workflow: Workflow = useSelector((state: AppState) => getSelectedWorkFlow(state, id)) ||
        { id: uid(), title: '', status: 1, nodes: [{ title: '', status: 2, content: '', id: uid() }] };


    const updateNode = (item: WorkflowNode, index: number) => {
        const nodes = JSON.parse(JSON.stringify(workflow.nodes)) as WorkflowNode[];
        nodes[index] = item;
        workflow = { ...workflow, nodes };

        console.log(workflow);

    }


    return <>

        <Typography variant="h3" >Workflow {workflow?.title}</Typography>
        {
            <Box display="flex" justifyItems="center" m={1} p={3} bgcolor="background.paper" >

                {workflow.nodes.map((node: WorkflowNode, index: number) => {
                    return <Box p={1} key={node.id}>
                        <WorkFlowNode update={(item) => updateNode(item, index)} item={node} />
                    </Box>
                })}

            </Box>
        }
    </>;
});

export default WorkFlowComponent;