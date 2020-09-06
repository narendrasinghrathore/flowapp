import React, { useState, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, WorkflowNode, Workflow } from '../../../models/Workflow';
import { getSelectedWorkFlow } from '../../../store/selectors/flow.selector';
import WorkFlowNode from '../../stateless/WorkflowNode';
import uid from 'uid';
import Box from '@material-ui/core/Box';
import { Paper, Grid, TextField, Typography } from '@material-ui/core';

import { useForm } from "react-hook-form";


import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ShuffleIcon from '@material-ui/icons/Shuffle';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/icons/Save';
import { green, red, blue, deepPurple } from '@material-ui/core/colors';
import { actionAddWorkflow, actionUpdateWorkflow } from '../../../store/actions/auth.action';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        root: {
            flexGrow: 1,
        },
        paper: {
            margin: '10px auto',
            width: '100vw',
            padding: theme.spacing(2),
            boxSizing: 'border-box',

            color: theme.palette.text.secondary,
        },
        button: {
            margin: theme.spacing(1),
        },
        nodeItems: {
            overflowX: "auto"

        },
        add: {
            color: green[700]
        },
        delete: {
            color: red[700]
        },
        save: {
            color: blue[700]
        },
        shuffle: {
            color: deepPurple[700]
        },
        title: {
            fontSize: '2em'
        },
        warning: {
            textAlign: 'center'
        }
    }),
);


const WorkFlowComponent = React.memo(() => {

    const history = useHistory();

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const classes = useStyles();
    const { id }: { id: string } = useParams();

    const workflowInstance: Workflow = { id: uid(), title: '', status: 1, nodes: [{ title: '', status: 2, content: '', id: uid() }] }

    const [workflow, setWorkflow] = useState<Workflow>(useSelector((state: AppState) => getSelectedWorkFlow(state, id)) ||
        workflowInstance);


    // A workflow should have nodes
    const workflowNoNodes = workflow.nodes.length === 0 ? true : false


    const updateNode = (item: WorkflowNode, index: number) => {
        const nodes = JSON.parse(JSON.stringify(workflow.nodes)) as WorkflowNode[];
        nodes[index] = item;
        setWorkflow({ ...workflow, nodes });
    }

    const addNewNode = () => {
        const nodes = JSON.parse(JSON.stringify(workflow.nodes)) as WorkflowNode[];
        nodes.push({ title: '', status: 2, content: '', id: uid() });
        setWorkflow({ ...workflow, nodes });
    }

    const removeNode = () => {
        const nodes = JSON.parse(JSON.stringify(workflow.nodes)) as WorkflowNode[];
        nodes.pop();
        setWorkflow({ ...workflow, nodes });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>) => {
        const target = (event.target || event.currentTarget) as HTMLInputElement;
        const { name, value } = target;
        setWorkflow({ ...workflow, [name]: value });

    }

    const saveWorkFlow = () => {
        if (workflowNoNodes) return;
        const status = canShuffle ? 0 : 1;
        const newWorkflow: Workflow = { ...workflow, status };
        if (id && id === 'create') {
            dispatch(actionAddWorkflow(newWorkflow));
        } else {
            dispatch(actionUpdateWorkflow(newWorkflow));
        }
        history.push('/');

    }

    /**
     * Return true if all nodes are in completed state i.e. 0
     */
    const canShuffle = useMemo(() => {
        if (!workflow.nodes.length) return false;
        return workflow.nodes.reduce((total, item) => {
            return total + item.status;
        }, 0) === 0 ? true : false;

    }, [workflow]);


    return <>
        <form onSubmit={handleSubmit(saveWorkFlow)}>
            <Box display="flex" justifyItems="center" m={1} p={3} bgcolor="background.paper" >
                <Paper className={classes.paper} elevation={0} >
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={9}>
                            <TextField variant="outlined" name="title" inputRef={register({ required: true })} onInput={e => handleChange(e)} className={classes.title} fullWidth defaultValue={workflow?.title} label="Workflow Title" />
                        </Grid>
                        <Grid item xs={3}>
                            {
                                canShuffle &&
                                <IconButton aria-label="shuffle" className={`${classes.margin} ${classes.shuffle}`}>
                                    <ShuffleIcon fontSize="large" />
                                </IconButton>
                            }
                            <IconButton aria-label="delete" onClick={removeNode} className={`${classes.margin} ${classes.delete}`}>
                                <DeleteIcon fontSize="large" />
                            </IconButton>
                            <IconButton aria-label="add" onClick={addNewNode} className={`${classes.margin} ${classes.add}`}>
                                <AddBoxIcon fontSize="large" />
                            </IconButton>
                            <IconButton aria-label="save" type="submit" className={`${classes.margin} ${classes.save}`}>
                                <SaveIcon color="primary" fontSize="large" />
                            </IconButton>
                        </Grid>
                    </Grid>

                </Paper>
            </Box>
            {
                workflowNoNodes && <Typography className={classes.warning} variant="h6" gutterBottom>
                    A workflow should have at least single node, please add one.
              </Typography>
            }
            <Box display="flex" className={classes.nodeItems} justifyItems="center" m={3} p={0} bgcolor="background.paper" >

                {workflow.nodes.map((node: WorkflowNode, index: number) => {
                    return <Box p={1} key={node.id}>
                        <WorkFlowNode register={register} update={(item) => updateNode(item, index)} item={node} />
                    </Box>
                })}

            </Box>
        </form>
    </>;
});

export default WorkFlowComponent;