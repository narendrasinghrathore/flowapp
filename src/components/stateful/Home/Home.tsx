import React, { useState, useMemo } from 'react';

import { Grid, Box, Button, TextField } from '@material-ui/core';
import './Home.scss';
import { Workflow, AppState } from '../../../models/Workflow';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getWorkflowList } from '../../../store/selectors/flow.selector';
import { actionUpdateWorkflow } from '../../../store/actions/auth.action';
import LazyLoadingComponent from '../../../shared/components/LazyLoadingComponent';

const WorkflowItem = React.lazy(() => import('../../stateless/WorkflowItem/WorkflowItem'));
const SnackNotification = React.lazy(() => import('../../stateless/SnackNotification/SnackNotification'));


/**
 * ## Description: Home Component
 * i.e. Route "/"
 */
const Home = React.memo(() => {

    const [open, setOpen] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>();

    const [filter, setFilter] = useState('');

    const showMessage = () => {
        setOpen(true);

    };

    const onMessageHide = () => {
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

    const list: Workflow[] = useMemo(() => {
        return items.filter(item =>
            item.title.toLowerCase().trim().indexOf(filter.trim().toLowerCase()) !== -1);
    }, [filter, items]);

    return <>
        <Box display="flex">
            <Box p={1} flexGrow={1}>
                <TextField variant="outlined" label="Search Workflow"
                    value={filter} onChange={(e) => setFilter(e.target.value)} fullWidth />
            </Box>
            <Box p={1} >
                <Button onClick={navigateToFlow} startIcon={<AddIcon />}>
                    Add New WorkFlow {filter}
                </Button>
            </Box>
        </Box>
        <Grid container className="card-container">
            {/* Background container */}
            <Grid className="title-background" item xs={12}>
            </Grid>
            {
                list.map((item, index) => {
                    return <LazyLoadingComponent items={[{ width: 300 , height:200}]} key={item.id}>
                        <WorkflowItem item={item} index={index} completeWorkFlow={completeWorkFlow} />
                    </LazyLoadingComponent>
                })

            }

        </Grid>
        <LazyLoadingComponent>
            <SnackNotification open={open} hide={() => onMessageHide()} selectedWorkflow={selectedWorkflow} />
        </LazyLoadingComponent>

    </>;

});



export default Home;