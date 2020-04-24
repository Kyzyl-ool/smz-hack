import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FileUpload from "../uploadFile/fileUpload";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
        height: "54px"
    },
    button: {
        marginBottom: "12px"
    },
    title: {
        marginBottom: "12px",
        flex: 1
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const classes = useStyles();

    return (
        <div>
            <Dialog fullScreen open={props.open} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton className={classes.button} edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Загрузка демо
                        </Typography>
                        <Button className={classes.button} autoFocus color="inherit" onClick={props.handleClose}>
                            Загрузить
                        </Button>
                    </Toolbar>
                </AppBar>
                <FileUpload/>
            </Dialog>
        </div>
    );
}
