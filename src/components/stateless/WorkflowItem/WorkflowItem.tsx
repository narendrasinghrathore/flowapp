import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Grow from '@material-ui/core/Grow';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Workflow } from '../../../models/Workflow';

const useStyles = makeStyles({
    title: {
        fontSize: 14,
    },
});

const WorkFlowIcon = React.memo((props: { status: 0 | 1, update: () => void }) => {
    return <IconButton name="status"
        style={{ color: props.status === 0 ? 'green' : 'grey' }}
        onClick={() => props.update()} aria-label="Status">
        {props.status === 0 ?
            <CheckCircleIcon fontSize="large" />
            : <CheckBoxOutlineBlankIcon fontSize="large" />}
    </IconButton>;
});



/**
 * ##Description
 * Use to display list of workflow item(s)
 * on home page.
 */
const WorkflowItem = React.memo(({ item, completeWorkFlow, index }:
    { item: Workflow, completeWorkFlow: (id: string) => void, index: number }) => {
    const classes = useStyles();

    return <Grid item md={3} key={item.id} className="cards-wrapper" >
        <Grow in={item.id ? true : false}>
            <Card className={`card`}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {`#${index + 1}`}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <Link to={`/flow/${item.id}`}>
                            {item.title}
                        </Link>
                    </Typography>

                </CardContent>
                <CardActions>
                    <Chip label={item.status === 0 ? 'COMPLETED' : 'PENDING'} />
                    <WorkFlowIcon update={() => completeWorkFlow(item.id)} {...item} />
                </CardActions>
            </Card>
        </Grow>
    </Grid>

});

export default WorkflowItem;