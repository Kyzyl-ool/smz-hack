import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import Customer from "./roles/Customer";
import Integrator from "./roles/Integrator";

const useStyles = makeStyles(theme => ({
    drawer: {
        width: '20vw',
        border: '1px solid rgba(0,0,0,0.5)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        right: 0,
        overflowY: 'scroll',
        paddingBottom: '100px'
    },
}))

const mapRoleToContent = (role, content) => {
    switch (role) {
        case 'customer':
            return <Customer/>
        case 'integrator':
            return <Integrator content={content}/>;
        case 'developer':
            return null;
        case 'admin':
            return null;
    }
}

function RightDrawer({content}) {
    const classes = useStyles()

    return (
        <Box className={classes.drawer} p={2}>
            {mapRoleToContent(localStorage.getItem('role'), content)}
        </Box>
    );
}

export default RightDrawer;
