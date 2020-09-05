import React from 'react';
import { Grid, Paper, Box } from '@material-ui/core';
import './Home.scss';
import { Workflow } from '../../../models/Workflow';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { Link } from 'react-router-dom';

const WorkFlowIcon = React.memo((props: { status: 0 | 1, update: () => void }) => {
    return props.status === 0 ?
        <CheckBoxIcon onClick={() => props.update()} />
        : <CheckBoxOutlineBlankIcon onClick={() => props.update()} />
});

const Home = React.memo(() => {

    const items: Workflow[] = [];

    const completeWorkFlow = (id: string) => {
        console.log(id);
    }

    return <>
        <Grid container spacing={2} justify="center" className="card-container">
            <Grid item xs={12}>
                <h1>Home Component</h1>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex">
                    <Box p={1} bgcolor="grey.300">
                        Item         </Box>
                    <Box p={1} flexGrow={1} textAlign="right" bgcolor="grey.300">
                        Item 3        </Box>
                </Box>
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
    </>;

});



export default Home;