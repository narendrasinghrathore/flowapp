import React, { useState, useEffect } from 'react';
import { WorkflowNode } from "../../../models/Workflow";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { green, grey, blue } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 280,
      height: 410
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    titleText: {
      padding: 0,
      boxSizing: 'border-box'
    },
    text: {
      padding: 5,
      width: '100%',
      boxSizing: 'border-box'
    },
    status: {
      color: (props: any) => props.statusColor()

    },
    bottomActions: {
      justifyContent: 'flex-end'
    }
  }),
);

const WorkFlowNode = React.memo((props: { item: WorkflowNode, update: (item: WorkflowNode) => void, register: Function }) => {

  const [item, setItem] = useState<WorkflowNode>(props.item);

  /**
   * Return color based on status
   */
  const color = {
    statusColor: () => {
      switch (item.status) {
        case 0: return green[700];
        case 1: return blue[700];
        case 2: return grey[700];
        default: return grey[700];

      }
    }
  }

  const classes = useStyles(color);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>) => {
    const target = (event.target || event.currentTarget) as HTMLInputElement;
    const { name, value } = target;
    if (!name && !value) return;
    // i.e. {ID}-title
    const title = name.split("-")[1];
    setItem({ ...item, [title]: value });
  }

  const handleStatusChange = (event: any) => {
    const status: number = item.status > 0 ? --item.status : 2;
    setItem({ ...item, status });
  }

  useEffect(() => {
    props.update(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <TextField
            label="Title"
            fullWidth
            multiline
            className={classes.titleText}
            rows={2}
            defaultValue={item?.title}
            variant="outlined"
            name={`${item.id}-title`}
            onInput={e => handleInputChange(e)}
            inputRef={props.register({ required: true })}
          />
        }
      />
      <TextField
        label="Content"
        multiline
        className={classes.text}
        rows={10}
        defaultValue={item?.content}
        variant="outlined"
        name={`${item.id}-content`}
        onInput={e => handleInputChange(e)}
        inputRef={props.register({ required: true })}
      />
      <CardActions disableSpacing className={classes.bottomActions}>
        <IconButton name="status" onClick={(e) => handleStatusChange(e)} className={classes.status} aria-label="Status">
          <CheckCircleIcon fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
});
export default WorkFlowNode;