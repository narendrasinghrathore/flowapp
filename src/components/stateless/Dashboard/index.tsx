import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import HomeIcon from '@material-ui/icons/Home';
import createStyles from '@material-ui/core/styles/createStyles';
import { Route, useHistory, Switch } from 'react-router-dom';


import LazyLoadingComponent from '../../../shared/components/LazyLoadingComponent';


const WorkFlowComponent = React.lazy(() => import('../../stateful/Workflow'));
const Home = React.lazy(() => import('../../stateful/Home/Home'));

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const Dashboard = React.memo(() => {

    const classes = useStyles();

    const history = useHistory();

    const navigateHome = () => {
        history.push('/');
    }

    return <>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} onClick={navigateHome} color="inherit" aria-label="menu">
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    WorkFlows
          </Typography>
            </Toolbar>
        </AppBar>

        <Switch>
            <Route path="/flow/:id?">
                <LazyLoadingComponent>
                    <WorkFlowComponent />
                </LazyLoadingComponent>
            </Route>
            <Route path="/" exact>
                <LazyLoadingComponent>
                    <Home />
                </LazyLoadingComponent>
            </Route>

        </Switch>


    </>;

});


export default Dashboard;