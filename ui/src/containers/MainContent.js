import React, {useState} from 'react';
import IntegratorWorkshop from "../pages/integrator-workshop/IntegratorWorkshop";
import {Box, Dialog, makeStyles} from "@material-ui/core";
import ListOfProducts from "../components/ListOfProducts/ListOfProducts";
import ListOfProductsForDeveloper from "../components/ListOfProductsForDeveloper/ListOfProducts";
import {useLocation} from 'react-router-dom';
import DialogContent from "@material-ui/core/DialogContent";
import {PaymentLoader} from "../components/PaymentLoader/PaymentLoader";

const useStyles = makeStyles(theme => ({
    content: {
        width: '60vw',
        height: '100vh',
        overflowY: 'scroll',
        position: 'fixed',
        left: '20vw',
        borderTop: '1px solid rgba(0,0,0,0.5)'
    }
}))

const mapRoleToMainContent = (role, rest) => {
    switch (role) {
        case 'integrator':
            return <IntegratorWorkshop callback={rest} />
        case 'customer':
            return  <ListOfProducts/>
        case 'developer':
            return <ListOfProductsForDeveloper/>
        default:
            return null
    }
}

const MainContent = ({callback}) => {
    const classes = useStyles();
    const location = useLocation();
    const success = new URLSearchParams(location.search).get('checkPayment');
    const [open, setOpen] = useState(!!success);


    return (
        <Box className={classes.content}>
            {
                mapRoleToMainContent(localStorage.getItem('role'), callback)
            }
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <PaymentLoader status={+success} />
                </DialogContent>
            </Dialog>
        </Box>
    )
};

export default MainContent;
