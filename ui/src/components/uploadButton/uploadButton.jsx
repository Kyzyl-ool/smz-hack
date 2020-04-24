import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
    button: {
        cursor: 'pointer'
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
}));

export default function UploadButton () {
    const classes = useStyles();

    return (
        <Button variant="contained" color="default" className={classes.button}>
            Загрузить
            <CloudUploadIcon className={classes.rightIcon} />
        </Button>
    )
}