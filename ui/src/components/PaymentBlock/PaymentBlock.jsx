import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import HorizontalLinearStepper from "../stepper/Stepper";


export const PaymentBlock = (props) => {
    return <Box p={2}>
       <HorizontalLinearStepper {...props} />
    </Box>
};
