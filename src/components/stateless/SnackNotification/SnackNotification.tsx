import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import { Workflow } from "../../../models/Workflow";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
/**
 * ## Description
 * To show notification when you mark a workflow as complete state that
 * that contain node(s) in pending state 
 */
const SnackNotification = React.memo(
    ({
        open,
        hide,
        selectedWorkflow,
    }: {
        open: boolean;
        hide: () => void;
        selectedWorkflow: Workflow | undefined;
    }) => {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={open}
                autoHideDuration={6000}
                message="Please make sure all nodes are in complete state for given workflow."
                action={
                    <React.Fragment>
                        <Button color="primary" size="small" onClick={() => hide()}>
                            {selectedWorkflow && (
                                <Link
                                    style={{ color: "white" }}
                                    to={`/flow/${selectedWorkflow.id}`}
                                >
                                    {selectedWorkflow.title}
                                </Link>
                            )}
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => hide()}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        );
    }
);

export default SnackNotification;
