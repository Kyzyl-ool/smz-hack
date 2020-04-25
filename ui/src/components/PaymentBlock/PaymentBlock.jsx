import React from 'react';
import Box from "@material-ui/core/Box";
import HorizontalLinearStepper from "../stepper/Stepper";


export const PaymentBlock = (props) => {
    return <Box p={2}>
       <HorizontalLinearStepper {...props} />
    </Box>
};
