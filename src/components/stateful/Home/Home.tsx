import React, { useState } from 'react';
import { Grid, Paper, Box, Button } from '@material-ui/core';
import './Home.scss';
import { Workflow, AppState } from '../../../models/Workflow';
import AddIcon from '@material-ui/icons/Add';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListIcon from '@material-ui/icons/List';

import { getWorkflowList } from '../../../store/selectors/flow.selector';
import { actionUpdateWorkflow } from '../../../store/actions/auth.action';

const WorkFlowIcon = React.memo((props: { status: 0 | 1, update: () => void }) => {
    return props.status === 0 ?
        <CheckBoxIcon onClick={() => props.update()} />
        : <CheckBoxOutlineBlankIcon onClick={() => props.update()} />
});

const Home = React.memo(() => {

    const [open, setOpen] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>();
    const showMessage = () => {
        setOpen(true);

    };

    const onMessageHide = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setSelectedWorkflow(undefined);
    };

    const dispatch = useDispatch();

    const history = useHistory();

    const items: Workflow[] = useSelector((state: AppState) => getWorkflowList(state));

    const checkAllNodeCompleteState = (item: Workflow): boolean => {
        if (!item.nodes.length) return false;
        return item.nodes.reduce((total, item) => {
            return total + item.status;
        }, 0) === 0 ? true : false;
    }

    const completeWorkFlow = (id: string) => {
        const item = items.find(item => item.id === id);
        if (!item) return;

        // Mark workflow to pending only if it's already in completed state i.e. All nodes are in completed state
        if (item.status === 0) {
            dispatch(actionUpdateWorkflow({ ...item, status: 1 }));
            return;
        }
        const canMarkCompleteState = checkAllNodeCompleteState(item);
        if (canMarkCompleteState) {
            dispatch(actionUpdateWorkflow({ ...item, status: 0 }));
        } else {
            showMessage();
            setSelectedWorkflow(item);
        }

    }

    const navigateToFlow = () => {
        history.push('/flow/create');
    }

    return <>
        <Box display="flex">
            <Box p={1}>
            </Box>
            <Box p={1} flexGrow={1} textAlign="right">
                <Button onClick={navigateToFlow} startIcon={<AddIcon />}>
                    Add New WorkFlow
                </Button>
            </Box>
        </Box>
        <Grid container justify="center" className="card-container">
            <Grid justify="center"
                style={{ textAlign: 'center', margin: 10, boxSizing: 'border-box', verticalAlign:"" }} spacing={4} item xs={12}>
                <h1>
                    <ListIcon fontSize="large" />
                    Workflow(s)</h1>
            </Grid>
            {items.map(item => {
                return <Grid item xs={3} key={item.id} className="cards-wrapper" >
                    <Paper elevation={1} className="card">
                        <h4 className="heading">
                            <Link to={`/flow/${item.id}`}>
                                {item.title}
                            </Link>
                        </h4>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {item.status === 0 ? 'COMPLETED' : 'PENDING'}
                            </Grid>
                            <Grid item xs={6}>
                                <WorkFlowIcon update={() => completeWorkFlow(item.id)} {...item} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            })
            }

        </Grid>
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            message="Please make sure all nodes are in complete state for given workflow."
            action={
                <React.Fragment>
                    <Button color="primary" size="small" onClick={onMessageHide}>
                        {selectedWorkflow && <Link style={{ color: 'white' }} to={`/flow/${selectedWorkflow.id}`}>
                            {selectedWorkflow.title}
                        </Link>}
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onMessageHide}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    </>;

});



export default Home;